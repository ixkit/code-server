import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { ToolbarCommandContribution } from '@theia/toolbar/lib/browser/toolbar-command-contribution';

// import { CommonMenus, open } from '@theia/core/lib/browser';
 
import { FoldersDialog } from '../../folder/browser/folders-dialog';
  
export const FolderListCommand: Command = {
    id: 'folder.list.command',
    label: 'Open'
};

@injectable()
export class FolderUICommandContribution implements CommandContribution {
    
    @inject(FoldersDialog) protected readonly foldersDialog: FoldersDialog;
    
    @inject(ToolbarCommandContribution) protected readonly toolbar: ToolbarCommandContribution;

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(FolderListCommand, {
            execute: () =>{
                this.messageService.info('FolderListCommand!'); 
              this.foldersDialog.openWith();
            }
        });

        
        
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
            commandId: FolderListCommand.id,
            label: FolderListCommand.label,
            order: '0'
        }); 
    } 
}