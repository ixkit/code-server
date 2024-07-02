
import { DeflatedToolbarTree, ToolbarAlignment } from '@theia/toolbar/lib/browser/toolbar-interfaces';
import { FolderCommands } from './folder-command';
import { nls } from '@theia/core';
 
//export const ToolbarDefaultsFactory = Symbol('ToolbarDefaultsFactory');

export const FolderToolbarDefaults: () => DeflatedToolbarTree = () => ({
    items: {
        [ToolbarAlignment.LEFT]: [
            [
                {
                    id: 'textEditor.commands.go.back',
                    command: 'textEditor.commands.go.back',
                    icon: 'codicon codicon-arrow-left',
                },
                {
                    id: 'textEditor.commands.go.forward',
                    command: 'textEditor.commands.go.forward',
                    icon: 'codicon codicon-arrow-right',
                },
            ],
            [
                {
                    id: 'workbench.action.splitEditorRight',
                    command: 'workbench.action.splitEditorRight',
                    icon: 'codicon codicon-split-horizontal',
                },
            ],
        ],
        [ToolbarAlignment.CENTER]: [[
            {
                id: FolderCommands.OPEN_FOLDER.id,
                command: FolderCommands.OPEN_FOLDER.id,
                icon: FolderCommands.OPEN_FOLDER.iconClass,
                tooltip: nls.localizeByDefault('Open Folder'), 
            },
        ]],
        [ToolbarAlignment.RIGHT]: [
            [
                {
                    id: 'workbench.action.showCommands',
                    command: 'workbench.action.showCommands',
                    icon: 'codicon codicon-terminal',
                    tooltip: nls.localizeByDefault('Command Palette'),
                },
            ]
        ]
    },
    
}); 
