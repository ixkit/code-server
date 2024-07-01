#2024-6-3 sktech

    #compile failed start, try below command
    
    ```
        nvm use  v18.20.2
        npm install -g pkg

        yarn clean 

        yarn --pure-lockfile && \
        yarn build:extensions && \
        yarn download:plugins && \ // ignore this step no plugin support 
        yarn browser build

        yarn browser start   

        yarn browser start    /my-workspace --hostname 0.0.0.0 --port 8080

        yarn start:browser // build and run

        npm run pkg
    ```
    code can not hotreload !

    #notice 
        add new extension, need do: yarn clean then yarn then build all.
        
#2024-6-4 
    #update-log  
        remove from package.json

            `
             "vscjava.vscode-java-pack": "https://open-vsx.org/api/vscjava/vscode-java-pack/0.25.11/file/vscjava.vscode-java-pack-0.25.11.vsix",
    "vscjava.vscode-java-dependency": "https://open-vsx.org/api/vscjava/vscode-java-dependency/0.21.2/file/vscjava.vscode-java-dependency-0.21.2.vsix"
            `
    #kn
        Q: how to config plugin ?
        A: open the file 
         ./plugins/eclipse-theia.builtin-extension-pack/extension/package.json
         that looks : 
              "repository": "https://github.com/eclipse-theia/vscode-builtin-extensions",
              "extensionPack": [
                "vscode.bat",
                "vscode.clojure",
                "vscode.coffeescript",
                "vscode.configuration-editing",
                "vscode.cpp",
                "vscode.csharp",
                "vscode.css",
                "vscode.css-language-features",
                "vscode.dart",
                "vscode.debug-auto-launch",
                "vscode.debug-server-ready",
                "vscode.diff",
                ...

            can remove or put some plugin here ?
        
        Q: extension, notice the 'rimraf' version, it should be keep the same version with 'application' : ^2.7.1
        A: 

#2024-6-14 hide orignianl menu action
    ```
        menus.unregisterMenuAction(CommonMenus.HELP[CommonMenus.HELP.length - 1],  MAIN_MENU_BAR)
     
        menus.unregisterMenuAction(CommonMenus.FILE_OPEN[CommonMenus.FILE_OPEN.length - 1])
        menus.unregisterMenuAction("workspace:saveAs")
        menus.unregisterMenuAction("workspace:addFolder")
        menus.unregisterMenuAction("workspace:close") 
    ```
    full code:
    ```
        import { injectable, inject } from '@theia/core/shared/inversify';
        import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
        
        // import { CommonMenus } from '@theia/core/lib/browser';
        import { CommonMenus } from '@theia/core/lib/browser';

        export const EchoCommand: Command = {
            id: 'echo.command',
            label: 'Say Hello'
        };

        @injectable()
        export class EchoCommandContribution implements CommandContribution {

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

        function hideOpenSpaceFeatures(menus: MenuModelRegistry){
            menus.unregisterMenuAction(CommonMenus.HELP[CommonMenus.HELP.length - 1],  MAIN_MENU_BAR)
            
            menus.unregisterMenuAction(CommonMenus.FILE_OPEN[CommonMenus.FILE_OPEN.length - 1])
            
            menus.unregisterMenuAction("workspace:saveAs")
            menus.unregisterMenuAction("workspace:addFolder")
            menus.unregisterMenuAction("workspace:close") 
        }
        

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
    ```

#2024-6-16 
    #kn 
        ```
            /**
            * Trigger the open workspace command.
            */
            protected doOpenWorkspace = () => this.commandRegistry.executeCommand(WorkspaceCommands.OPEN_WORKSPACE.id);
            protected doOpenWorkspaceEnter = (e: React.KeyboardEvent) => {
                if (this.isEnterKey(e)) {
                    this.doOpenWorkspace();
                }
            };
        ```
    // theia-master/packages/workspace/src/browser/workspace-frontend-contribution.ts
    ```
        if (targetFolders) {
            const openableUri = await this.getOpenableWorkspaceUri(targetFolders);
            if (openableUri) {
                if (!this.workspaceService.workspace || !openableUri.isEqual(this.workspaceService.workspace.resource)) {
                    this.workspaceService.open(openableUri);
                    return openableUri;
                }
            };
        }

    ```

#2024-6-16 
    #remark     
    workspace workflow:
    doInit() -> getDefaultWorkspaceUri() -->

    --> doOpen() 

    await this.server.setMostRecentlyUsedWorkspace(uri.toString());


        #file: theia-master/packages/workspace/src/browser/workspace-service.ts
        
             method: doGetDefaultWorkspaceUri

            protected updateTitle(): void  

    --> theia-master/packages/workspace/src/node/default-workspace-server.ts
        async setMostRecentlyUsedWorkspace(rawUri: string)


       


    #open file in tab:
    #file: theia/packages/editor/src/browser/editor-navigation-contribution.ts
        protected async restoreClosedEditors(): Promise<void> 

        ...
        registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(EditorCommands.SHOW_ALL_OPENED_EDITORS, {
            execute: () => this.quickInputService?.open('edt ')
        });
        const splitHandlerFactory = (splitMode: DockLayout.InsertMode): CommandHandler => new CurrentWidgetCommandAdapter(this.shell, {
            isEnabled: title => title?.owner instanceof EditorWidget,
            execute: async title => {
                if (title?.owner instanceof EditorWidget) {
                    const selection = title.owner.editor.selection;
                    const newEditor = await this.editorManager.openToSide(title.owner.editor.uri, { selection, widgetOptions: { mode: splitMode, ref: title.owner } });
                    const oldEditorState = title.owner.editor.storeViewState();
                    newEditor.editor.restoreViewState(oldEditorState);
                }
            }
        });
        ...

    #file: packages/editor/src/browser/editor-command.ts
         registry.registerCommand(EditorCommands.REOPEN_CLOSED_EDITOR);
    
    #file: packages/editor/src/browser/editor-manager.ts


    #file: packages/editor/src/browser/navigation/navigation-location-service.ts

    register(...locations: NavigationLocation[]): void {
