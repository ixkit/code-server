
import URI from '@theia/core/lib/common/uri';
//import { getCookie } from 'typescript-cookie';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { hashValue } from '@theia/core/lib/common/uuid';
import { Endpoint } from '@theia/core/lib/browser';
import { injectable, inject } from '@theia/core/shared/inversify';
import { ILogger} from '@theia/core/lib/common';
import { EditorManager,EditorOpenerOptions } from '@theia/editor/lib/browser';
import { Path } from '@theia/core/lib/common';
import { FolderIntent } from '../../land/types';

import { FolderBusBackendService } from './../../folder-bus/common/protocol';



export interface TargetFileOption extends EditorOpenerOptions {
    uri : URI; 
}


@injectable()
export class FolderService {
    @inject(FolderBusBackendService) 
    private  folderBusBackendService: FolderBusBackendService;  

    @inject(EditorManager) 
    protected editorManager: EditorManager;

    @inject(ILogger)
    protected readonly logger: ILogger;

    
 
    async checkPremission(): Promise<boolean> {
      
        return Promise.resolve(true);
     }

     async onLoadWorkspace(fileStats: FileStat[]): Promise<boolean> { 
        this.logger.debug('🧐 onLoadWorkspace,fileStat', this, fileStats);

        const activeFolder = fileStats[0];
        return  this.handleIntent(activeFolder);
       
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
                line: obj.line
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
        this.editorManager.open(targetFile.uri,targetFile);
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
     
     ///---- below is discard ------------------------------------

    async isInitialized(): Promise<boolean> {
        const response = await fetch(new Request(`${this.endpoint()}/initialized`), {
            body: undefined,
            method: 'GET'
        }).then(r => r.json());
        return !!response?.initialized;
    }

    async createLauncher(create: boolean): Promise<void> {
        fetch(new Request(`${this.endpoint()}`), {
            body: JSON.stringify({ create }),
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
    }

    protected endpoint(): string {
        const url = new Endpoint({ path: '/open' }).getRestUrl().toString();
        return url.endsWith('/') ? url.slice(0, -1) : url;
    }



}
