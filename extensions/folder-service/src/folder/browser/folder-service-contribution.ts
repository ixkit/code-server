import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ILogger, MaybePromise } from '@theia/core/lib/common';
//import { nls } from '@theia/core/lib/common/nls';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { inject, injectable } from '@theia/core/shared/inversify';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import {EditorManager } from '@theia/editor/lib/browser';
import { FolderService } from './folder-service';
import { EditorValService } from './editor-val-service';
import { HookWorkspaceService } from './hook-workspace-service';
import { FolderServiceLib } from '../../land';

function updatePath(path: string, title: string): void {
    const nextURL =  window.location.origin + '/💡' + path;
    const nextTitle = title;
    const nextState = { additionalInformation: `${nextTitle}` };

    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);

    // This will replace the current entry in the browser's history, without reloading
    window.history.replaceState(nextState, nextTitle, nextURL);

}

@injectable()
export class FolderServiceContribution implements FrontendApplicationContribution {

    @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService;

    @inject(HookWorkspaceService) protected readonly hookWorkspaceService: HookWorkspaceService;

    @inject(EditorManager) protected editorManager: EditorManager;

    @inject(ILogger)
    protected readonly logger: ILogger;

    @inject(FolderService) private readonly folderService: FolderService;

    @inject(EditorValService) private readonly editorValService: EditorValService;
 

    onStart(app: FrontendApplication): MaybePromise<void> {
        this.logger.info('FolderServiceContribution 🚀');
        
        this.workspaceService.onWorkspaceChanged((x) => {
            this.logger.debug('🔃 onWorkspaceChanged', x );
            const activeFolder = x[0];
            this.rebuildBrowserPath(activeFolder);

            this.logger.debug('🧐 try checkPremission', this );
            this.folderService.checkPremission();
            this.folderService.onLoadWorkspace(x);


            this.editorValService.do();
        });
        
        this.initService(app);
        
    }
    /*
        do not display accurate full path
    */
    rebuildBrowserPath(activeFolder: FileStat){
        if (FolderServiceLib.DEFAULT.trace){
            return ;
        }
        const dir = activeFolder.resource.path.name; 
        updatePath(dir,dir);
    }
    initService(app: FrontendApplication){
        this.logger.info('🧐 initService, app? ',app);
    }

    onStart_keep(app: FrontendApplication): MaybePromise<void> {
        // this.launcherService.isInitialized().then(async initialized => {
        //     if (!initialized) {
        //         const messageContainer = document.createElement('div');
        //         // eslint-disable-next-line max-len
        //         messageContainer.textContent = nls.localizeByDefault("Would you like to install a shell command that launches the application?\nYou will be able to run the Theia IDE from the command line by typing 'theia'.");
        //         messageContainer.setAttribute('style', 'white-space: pre-line');
        //         const details = document.createElement('p');
        //         details.textContent = 'Administrator privileges are required, you will need to enter your password next.';
        //         messageContainer.appendChild(details);
        //         const dialog = new ConfirmDialog({
        //             title: nls.localizeByDefault('Create launcher'),
        //             msg: messageContainer,
        //             ok: Dialog.YES,
        //             cancel: Dialog.NO
        //         });
        //         const install = await dialog.open();
        //         this.launcherService.createLauncher(!!install);
        //         this.logger.info('Initialized application launcher.');
        //     } else {
        //         this.logger.info('Application launcher was already initialized.');
        //     }
        // });
    }
}
