import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
 
// import { CommonMenus, open } from '@theia/core/lib/browser';
import { CommonMenus } from '@theia/core/lib/browser';

import { FoldersDialog } from 'code-server-folder-service-ext/lib/folder/browser/folders-dialog';
//import { AboutDialog } from '@theia/core/browser';
import { AboutDialog } from '@theia/core/lib/browser/about-dialog';

export const EchoCommand: Command = {
    id: 'echo.command',
    label: 'Say Hello'
};

@injectable()
export class EchoCommandContribution implements CommandContribution {
    
    @inject(FoldersDialog) protected readonly foldersDialog: FoldersDialog;
    @inject(AboutDialog) protected readonly aboutDialog: AboutDialog;

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(EchoCommand, {
            execute: () =>{
                this.messageService.info('Hello World!')
              //  this.foldersDialog.open();
             // this.aboutDialog.open();
              this.foldersDialog.open();
            }
        });
    }
}

function hideOpenSpaceFeatures(menus: MenuModelRegistry){
    //menus.unregisterMenuAction(CommonMenus.HELP[CommonMenus.HELP.length - 1],  MAIN_MENU_BAR)
     
    menus.unregisterMenuAction(CommonMenus.FILE_OPEN[CommonMenus.FILE_OPEN.length - 1])
    menus.unregisterMenuAction(CommonMenus.FILE_SAVE[CommonMenus.FILE_SAVE.length - 1]) 
  
   menus.unregisterMenuAction("workspace:saveAs")
   menus.unregisterMenuAction("workspace:addFolder")
   menus.unregisterMenuAction("workspace:close") 
 
}
// @injectable()
// export class EchoMenuContribution implements MenuContribution {

//     registerMenus(menus: MenuModelRegistry): void {
//         menus.registerMenuAction(CommonMenus.EDIT_FIND, {
//             commandId: EchoCommand.id,
//             label: EchoCommand.label
//         });
//     }
// }

@injectable()
export class EchoMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        const subMenuPath = [...MAIN_MENU_BAR, 'sample-menu'];
        menus.registerSubmenu(subMenuPath, 'Sample Menu', {
            order: '2' // that should put the menu right next to the File menu
        });
        menus.registerMenuAction(subMenuPath, {
            commandId: EchoCommand.id,
            label: EchoCommand.label,
            order: '0'
        });

        //@step
        hideOpenSpaceFeatures(menus);
    } 
}