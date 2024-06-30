import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
 
// import { CommonMenus, open } from '@theia/core/lib/browser';
 
import { FoldersDialog } from '../../folder/browser/folders-dialog';
import { FolderCommands } from './folder-command';

import { ToolbarController } from '@theia/toolbar/lib/browser/toolbar-controller';  
import { ToolbarAlignment } from '@theia/toolbar/lib/browser/toolbar-interfaces';
//import { FolderToolbarService } from './folder-toolbar-service';
 
@injectable()
export class FolderUICommandContribution implements CommandContribution {
    
    @inject(FoldersDialog) protected readonly foldersDialog: FoldersDialog;
    
    @inject(ToolbarController) protected readonly toolbarController: ToolbarController;
    
   // @inject(FolderToolbarService) protected readonly toolbarService: FolderToolbarService;
    
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(FolderCommands.OPEN_FOLDER, {
            execute: () =>{
                this.messageService.info('FolderListCommand!'); 
                this.foldersDialog.openWith();
             
               // this.toolbarService.setupToolbar();
            }
        }); 
       
        if (1>10){
            this.setupToolbar();
        }
    }

    private async setupToolbar():  Promise<void>{
        const cmd: Command = FolderCommands.OPEN_FOLDER; 
        
        await  this.toolbarController.addItem(cmd,ToolbarAlignment.CENTER);
    }
}
 
 
@injectable()
export class FolderUIMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        const subMenuPath = [...MAIN_MENU_BAR, 'folder-menu'];
        menus.registerSubmenu(subMenuPath, 'Folder', {
            order: '1' // that should put the menu right next to the File menu
        });
        menus.registerMenuAction(subMenuPath, {
            commandId: FolderCommands.OPEN_FOLDER.id,
            label: FolderCommands.OPEN_FOLDER.label,
            order: '0'
        }); 
    } 
}