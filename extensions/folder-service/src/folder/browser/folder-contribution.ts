import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ILogger, MaybePromise } from '@theia/core/lib/common';
//import { nls } from '@theia/core/lib/common/nls';
import { inject, injectable } from '@theia/core/shared/inversify';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import {EditorManager } from '@theia/editor/lib/browser';
import { FolderService } from './folder-service';
import { EditorValService } from './editor-val-service';

function updatePath(){
    const nextURL = 'http://127.0.0.1:3000/page_b';
    const nextTitle = 'My new page title';
    const nextState = { additionalInformation: 'Updated the URL with JS' };

    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);

    // This will replace the current entry in the browser's history, without reloading
    window.history.replaceState(nextState, nextTitle, nextURL);

}
@injectable()
export class FolderCommandContribution implements FrontendApplicationContribution {

    @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService;

    @inject(EditorManager) protected editorManager: EditorManager;

    @inject(ILogger)
    protected readonly logger: ILogger;

    @inject(FolderService) private readonly folderService: FolderService;

    @inject(EditorValService) private readonly editorValService: EditorValService;


    onStart(app: FrontendApplication): MaybePromise<void> {
       // this.folderService.logger = this.logger;
        this.workspaceService.onWorkspaceChanged((x) => {
            this.logger.debug('🔃 onWorkspaceChanged', x );
            if (1>10){
                updatePath();
              //  this.editorValService.do();
            }
            //this.folderService.openFile(this.editorManager);
         
        });
        if (1>0){
            this.logger.debug('🧐 try checkPremission', this );
            this.folderService.checkPremission();
            this.folderService.onLoadWorkspace();

            this.editorValService.do();
        }
        this.logger.info('FolderCommandContribution 🚀');

        this.initService(app);
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
