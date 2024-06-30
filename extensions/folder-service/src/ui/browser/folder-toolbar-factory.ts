
import { DeflatedToolbarTree, ToolbarAlignment } from '@theia/toolbar/lib/browser/toolbar-interfaces';
import { FolderCommands } from './folder-command';
//import { nls } from '@theia/core';
// import { injectable } from '@theia/core/shared/inversify';
  import { ToolbarDefaultsFactory} from '@theia/toolbar/lib/browser/abstract-toolbar-contribution';
//export const ToolbarDefaultsFactory = Symbol('ToolbarDefaultsFactory');
 

export const FolderToolbarDefaults: () => DeflatedToolbarTree = () => ({
    items: {
        [ToolbarAlignment.LEFT]:[],
        [ToolbarAlignment.CENTER]: [[
            {
                id:  FolderCommands.OPEN_FOLDER.id,
                command: FolderCommands.OPEN_FOLDER.id,
                icon: FolderCommands.OPEN_FOLDER.iconClass,
            },
        ]],
        [ToolbarAlignment.RIGHT]:[]
    } 
    
}); 
