 
import { ApplicationShell, FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ILogger, MaybePromise } from '@theia/core/lib/common';
//import { nls } from '@theia/core/lib/common/nls';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { inject, injectable, interfaces } from '@theia/core/shared/inversify';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import {EditorManager } from '@theia/editor/lib/browser';
import { FolderService } from './folder-service';
import { EditorValService } from './editor-val-service';
import { HookWorkspaceService } from './hook-workspace-service';
import { FolderServiceLib, FolderServices } from '../../land';
import { FoldersDialog } from './folders-dialog';
import { FolderToolbarService } from '../../ui/browser/folder-toolbar-service';
import { LateInjector } from '@theia/toolbar/lib/browser/toolbar-interfaces';
import { FolderHomePageFactory } from '../../ui/browser/folder-home-page';
import { ShellLayoutRestorer } from '@theia/core/lib/browser/shell/shell-layout-restorer';

@injectable()
export class MyLayoutHandlder extends ShellLayoutRestorer {
    // not restore 
    async restoreLayout(app: FrontendApplication): Promise<boolean> {
        this.logger.info('>>> Restoring the layout state...');
        if (1 > 0) {
            return false;
        }
        const serializedLayoutData = await this.storageService.getData<string>(this.storageKey);
        if (serializedLayoutData === undefined) {
            this.logger.info('<<< Nothing to restore.');
            return false;
        }
        const layoutData = await this.inflate(serializedLayoutData);
        await app.shell.setLayoutData(layoutData);
        this.logger.info('<<< The layout has been successfully restored.');
        return true;
    }
}
// proguard
function updateBrowserNavigatePath(path: string, title: string): void {
    
    const nextURL =  window.location.origin + FolderServices.Web.Feature.rootRoute(path) ;
    const nextTitle = title;
    const nextState = { additionalInformation: `${nextTitle}` };

    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);

    // This will replace the current entry in the browser's history, without reloading
    window.history.replaceState(nextState, nextTitle, nextURL);

}
 
@injectable()
export class FolderServiceAppContribution implements FrontendApplicationContribution {
    @inject(LateInjector) protected lateInjector: <T>(id: interfaces.ServiceIdentifier<T>) => T;

    @inject(FolderHomePageFactory) private readonly folderHomePageFactory: FolderHomePageFactory;

    @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService;

    @inject(HookWorkspaceService) protected readonly hookWorkspaceService: HookWorkspaceService;

    @inject(EditorManager) protected editorManager: EditorManager;

    @inject(ILogger)
    protected readonly logger: ILogger;

    @inject(FolderService) private readonly folderService: FolderService;

    @inject(EditorValService) private readonly editorValService: EditorValService;
 
    @inject(ApplicationShell) protected readonly _shell: ApplicationShell;
    
    @inject(FolderToolbarService)
    protected  folderToolbarService: FolderToolbarService;
 
    constructor( 
        @inject(FoldersDialog) protected readonly foldersDialog: FoldersDialog,
       
    ) { }

    protected async openForders(): Promise<void> {
        this.foldersDialog.open();
    }
     
    onStart(app: FrontendApplication): MaybePromise<void> {
        this.logger.debug('FolderServiceContribution 🚀'); 
        this.workspaceService.onWorkspaceChanged(async (x) => {
            this.logger.debug('🔃 onWorkspaceChanged', x );
            const activeFolder = x[0];
            if (!await this.folderService.validatePremission()) {
                // TODO rollback
                return ;
            }
            this.rebuildBrowserPath(activeFolder);
            this.folderService.onLoadWorkspace(x);
 
            this.editorValService.do();
            
        });
        
        this.initService(app);
    }
    async initializeLayout(app: FrontendApplication):  Promise<void>{
        this.logger.info('🧐 initializeLayout? ', this);

        if (1 > 10) {
            await this.showFolderHomePage();
        }
    }

    async showFolderHomePage(): Promise<void>{
        const folderHomePage = this.folderHomePageFactory('folder-home-page');
        await this._shell.addWidget(folderHomePage, {
            area: 'main'
        });
        folderHomePage.update();
    }
    /**
     * An event is emitted when a layout is initialized, but before the shell is attached.
     */
    onDidInitializeLayout?(app: FrontendApplication): MaybePromise<void>{
        this.logger.info('🧐 onDidInitializeLayout? ',this);
    }
    /*
        do not display accurate full path
    */
    rebuildBrowserPath(activeFolder: FileStat): void {
        if (FolderServiceLib.DEFAULT.trace) {
            return ;
        }
        const dir = activeFolder.resource.path.name;
        updateBrowserNavigatePath(dir, dir);
    }

    initService(app: FrontendApplication): void {
        this.logger.info('🧐 initService, app? ', app);
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
 
