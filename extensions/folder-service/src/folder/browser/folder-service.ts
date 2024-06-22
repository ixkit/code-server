
import { Endpoint } from '@theia/core/lib/browser';
import { injectable, inject } from '@theia/core/shared/inversify';
import { ILogger} from '@theia/core/lib/common';
import { EditorManager } from '@theia/editor/lib/browser';
 

@injectable()
export class FolderService {
      

    @inject(EditorManager) protected editorManager: EditorManager;

    @inject(ILogger)
    protected readonly logger: ILogger;

    async checkPremission(): Promise<boolean> {
        return Promise.resolve(true);
     }

    openFile(): boolean { 
        this.logger.debug('🧐 openFile',this);
        return true;
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
