import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
 
// import { CommonMenus, open } from '@theia/core/lib/browser';
import { CommonMenus } from '@theia/core/lib/browser';

import { interfaces } from 'inversify';

export const EchoCommand: Command = {
    id: 'echo.command',
    label: 'Say Hello'
};

@injectable()
export class VestCommandContribution implements CommandContribution {
    
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(EchoCommand, {
            execute: () =>{
                this.messageService.info('Hello World!')
            
            }
        });
    }
}

/*

    Hide some features that do not use in this case~

*/
function hideOpenWorkSpaceFeatures(menus: MenuModelRegistry){
    //menus.unregisterMenuAction(CommonMenus.HELP[CommonMenus.HELP.length - 1],  MAIN_MENU_BAR)
     
    menus.unregisterMenuAction(CommonMenus.FILE_OPEN[CommonMenus.FILE_OPEN.length - 1])
    menus.unregisterMenuAction(CommonMenus.FILE_SAVE[CommonMenus.FILE_SAVE.length - 1]) 
  
   menus.unregisterMenuAction("workspace:saveAs")
   menus.unregisterMenuAction("workspace:addFolder")
   menus.unregisterMenuAction("workspace:close");

   
   menus.unregisterMenuNode("7_terminal");

   menus.unregisterMenuAction("preferences:scope.menu");
   menus.unregisterMenuAction("preferences:editor.contextMenu");
   menus.unregisterMenuAction("preferences");
 
}
/*
export namespace PreferenceMenus {
    export const PREFERENCE_EDITOR_CONTEXT_MENU: MenuPath = ['preferences:editor.contextMenu'];
    export const PREFERENCE_EDITOR_COPY_ACTIONS: MenuPath = [...PREFERENCE_EDITOR_CONTEXT_MENU, 'preferences:editor.contextMenu.copy'];
    export const FOLDER_SCOPE_MENU_PATH = ['preferences:scope.menu'];
}


*/

@injectable()
export class VestMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        
        hideOpenWorkSpaceFeatures(menus);
    } 

    _registerMenus(menus: MenuModelRegistry): void {
        const subMenuPath = [...MAIN_MENU_BAR, 'sample-menu'];
        menus.registerSubmenu(subMenuPath, 'Sample Menu', {
            order: '2' // that should put the menu right next to the File menu
        });
        menus.registerMenuAction(subMenuPath, {
            commandId: EchoCommand.id,
            label: EchoCommand.label,
            order: '0'
        });
 
    } 
}

 

export const  applyFeatures = (bind: interfaces.Bind) => { 
    bind(CommandContribution).to(VestCommandContribution);
    bind(MenuContribution).to(VestMenuContribution);
};

