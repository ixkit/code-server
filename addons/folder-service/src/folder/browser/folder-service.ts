
import URI from '@theia/core/lib/common/uri';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { hashValue } from '@theia/core/lib/common/uuid';
import { Endpoint } from '@theia/core/lib/browser';
import { RequestService, RequestContext } from '@theia/request';
import { injectable, inject } from '@theia/core/shared/inversify';
import { ILogger} from '@theia/core/lib/common';
import { EditorManager, EditorWidget, EditorOpenerOptions, FindMatchesOptions, FindMatch, TextEditor,TextEditorDocument } from '@theia/editor/lib/browser';
import { Path } from '@theia/core/lib/common';
import { FolderIntent } from '../../land/types';

import { FolderBusBackendService } from './../../folder-bus/common/protocol';
import { IRowItem } from './widget/Base/RowItem';
 


export interface TargetFileOption extends EditorOpenerOptions {
    uri : URI; 
}

function toRouteUrl(route: string): string {
    const point: Endpoint  = new Endpoint();
    return  `${point.httpScheme}//${point.host}${route}`;
}
function prefectMatchPostion(matched: FindMatch): FindMatch {
    const start = matched.range.start;
    start.line = start.line === 0 ? 0 : start.line - 1 ;
    start.character = start.character === 0 ? 0 : start.character - 1;
    const end = matched.range.end;
    end.line = end.line === 0 ? 0 : end.line - 1 ;
    end.character = end.character === 0 ? 0 : end.character - 1;
    
    matched.range.start = start;
    matched.range.end = end;
    return matched;
}
/*
http://127.0.0.1:8080/folder?dir=/WorkSpace/zanvil_page&file=views/res_users.xml&line=1
'__manifest__.py,README.rst,readme.md,welcome.html,index.html'
*/
function folder2RouteUrl(folder: IRowItem): string{
    const dir = folder.path;
    const file = folder.files ? folder.files : '__manifest__.py' ;
    const path = `/folder?dir=${dir}&file=${file}`; 
    return toRouteUrl(path);
}


@injectable()
export class FolderService {
    @inject(FolderBusBackendService) 
    private  folderBusBackendService: FolderBusBackendService;  

    @inject(EditorManager) 
    protected editorManager: EditorManager;

    @inject(ILogger)
    protected readonly logger: ILogger;

    @inject(RequestService)
    protected readonly requestService: RequestService;

    
   
    protected getFolderApiUrl(): string {

        const url = toRouteUrl("/api/folders");
        this.logger.debug('🧐 getFolderApiUrl', url);
        return url;
    }

    async validatePremission(): Promise<boolean> {
      
        return Promise.resolve(true);
     }

     async onLoadWorkspace(fileStats: FileStat[]): Promise<boolean> { 
        this.logger.debug('🧐 onLoadWorkspace,fileStat', this, fileStats);

        const activeFolder = fileStats[0];
        return  this.handleIntent(activeFolder);
       
    }
 
    async redirect(url: string): Promise<boolean> {
        this.logger.debug('👉 redirect',url); 
        window.location.href = url;
        return Promise.resolve(true);
    }
    public async redirectByFolder(folder: IRowItem): Promise<boolean> { 
        this.logger.debug('👉 redirectByFolder',folder); 
       
        const url = folder2RouteUrl(folder);

        return this.redirect(url);
    }
    /*
        open doc folder then trigger render on web page
        eg: http://127.0.0.1:8080/folder?dir=/WorkSpace/zanvil_page&file=views/res_users.xml&line=1
    */
    async handleIntent(activeFolder: FileStat):  Promise<boolean> {
        // TODO now use dir => id, should featch from cookie ?
        const dir = activeFolder.resource.path.toString();
        const folderId = hashValue(dir);
        return this.openTargetFileIfNeeds(folderId).then(r => {
            if (!r) {
                this.openDefaultFocusFile();
            }
            return r;
        }); 
    }

    openDefaultFocusFile(){

    }
   
    async fetchRquestIntent(intentId: string):  Promise<FolderIntent|null> {

        return this.folderBusBackendService.getIntent(intentId).then(intentStr => {

            if (null == intentStr) {
                return Promise.resolve(null);
            }
            intentStr = decodeURIComponent(intentStr);
            this.logger.debug('🧐 fetchRquestIntent, folderIntent:', intentStr);
            const obj = JSON.parse(intentStr);
            const result: FolderIntent = {
                dir: obj.dir,
                file: obj.file,
                line: obj.line,
                keywords: obj.keywords
            };
            return Promise.resolve(result);
        });
       
    }
    async openTargetFileIfNeeds(folderId: string): Promise<boolean> { 
       
        const intent = await this.fetchRquestIntent(folderId);
        if (null == intent){ return  Promise.resolve(false);} 
        if (null == intent.file){ return Promise.resolve(false);} 
        this.logger.debug('🧐 openTargetFileIfNeeds, intent?', intent);
        const targetFile = this.toTargetFile(intent);
        await this.editorManager.open(targetFile.uri,targetFile);
        const keywords = intent.keywords;
        if (keywords){
           this.locate2KeywordsLine(keywords);
        }
        return Promise.resolve(true);
    }  
    
    async locate2KeywordsLine(keywords: string): Promise<boolean>{
        const option: FindMatchesOptions = {
            searchString: keywords,
            isRegex: true,
            matchCase: false,
            matchWholeWord: true
        };
        const widget: EditorWidget | undefined = this.editorManager.currentEditor;
        if (!widget) {
            return Promise.resolve(false);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const editor: TextEditor = widget.editor;
        if (!editor) {
            return Promise.resolve(false);
        }  
        const doc: TextEditorDocument =  editor.document;
        if (!doc) {
            return Promise.resolve(false);
        }  
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matchResult: FindMatch[]| undefined = doc.findMatches(option);
         
        if (!matchResult || matchResult.length <= 0){
            return Promise.resolve(false);
        }
                
        this.logger.debug('🧐 locateToKeywords,keywords?,matchResult', keywords, matchResult);

        let firstMatch: FindMatch = matchResult[0];
        firstMatch = prefectMatchPostion(firstMatch);
        const position = firstMatch.range.start;
        editor.cursor = position ;
        editor.selection = firstMatch.range;
        editor.focus();
        editor.revealPosition(position);
        
        return Promise.resolve(true);
    }

    toTargetFile(intent: FolderIntent): TargetFileOption{
        const dir = intent.dir;
        const file = intent.file;
        const line = intent.line ? Number(intent.line) : 1;
        const fullPath = `${dir}${Path.separator}${file}`;
        const uri = URI.fromFilePath(fullPath);
        const preview = true;
        const options:TargetFileOption  = {
            uri:uri,
            selection: {
                start: {
                    line: line,
                  //  character:3
                },
                end: {
                    line: line + 1,
                   // character:3
                },
            },
            mode: preview ? 'reveal' : 'activate',
            preview,
        };
       return options;
    }
    
    getLocateTargetFile():TargetFileOption{
        const uri = URI.fromFilePath("/WorkSpace/zanvil_page/models/res_config_settings.py");
        const preview = true;
        const options:TargetFileOption  = {
            uri:uri,
            selection: {
                start: {
                    line: 4,
                    character:3
                },
                end: {
                    line: 5,
                    character:3
                },
            },
            mode: preview ? 'reveal' : 'activate',
            preview,
        };
       return options
    }
    
    async fetchFolders(): Promise<IRowItem[]> { 
        const response = await this.requestService.request({ url: this.getFolderApiUrl() });
        if (1>0){
            this.logger.debug('🧐 fetchFolders',response);
             const str = RequestContext.asText(response);
             const r: DefaultResponseSchemaContribution.FolderList =  JSON.parse(str);
             if (r && r.data){
                return  Promise.resolve(r.data);
             } 
             Promise.resolve([]); 
        }
        const result = RequestContext.asJson<{ result: DefaultResponseSchemaContribution.FolderList }>(response).result;
        if (result && result.data){
            const r :IRowItem[] = result.data;
            return  Promise.resolve(r);
        }
        return Promise.resolve([]); 
    }
 

}


export namespace DefaultResponseSchemaContribution {
    export interface Result<T> {
        success: boolean;
        data?: T;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        schema?: any;
    }
    export interface FolderList {
        success: boolean;
        data?: IRowItem[];
    }
}
