import URI from '@theia/core/lib/common/uri';
import { Endpoint } from '@theia/core/lib/browser';
import { injectable, inject } from '@theia/core/shared/inversify';
import { ILogger} from '@theia/core/lib/common';
import { EditorManager,EditorOpenerOptions } from '@theia/editor/lib/browser';
 
export interface TargetFileOption extends EditorOpenerOptions {
    uri : URI; 
}
@injectable()
export class FolderService {
      

    @inject(EditorManager) protected editorManager: EditorManager;

    @inject(ILogger)
    protected readonly logger: ILogger;

    async checkPremission(): Promise<boolean> {
        return Promise.resolve(true);
     }

    onLoadWorkspace(): boolean { 
        this.logger.debug('🧐 openFile',this);
        this.openTargetFileIfNeeds();
        return true;
    }

    openTargetFileIfNeeds(): boolean { 
        const targetFile = this.getLocateTargetFile();
        this.editorManager.open(targetFile.uri,targetFile);
        return true;
    } 
    handleIntent(){
        
    }
    //"Users/icoco/WorkSpace/zanvil_page/__manifest__.py"
    getLocateTargetFile():TargetFileOption{
        const uri = URI.fromFilePath("Users/icoco/WorkSpace/zanvil_page/data/defaults.xml");
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
