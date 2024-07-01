
import { injectable,inject, interfaces, postConstruct } from '@theia/core/shared/inversify';
import { LateInjector } from '@theia/toolbar/lib/browser/toolbar-interfaces';
import { Command } from '@theia/core/lib/common';
 
import { FolderCommands } from './folder-command';

import { ToolbarController } from '@theia/toolbar/lib/browser/toolbar-controller';  
import { ToolbarAlignment } from '@theia/toolbar/lib/browser/toolbar-interfaces';
//import { ToolbarImpl } from '@theia/toolbar/lib/browser/toolbar';
 
//import { ApplicationShellWithToolbarOverride } from '@theia/toolbar/lib/browser/application-shell-with-toolbar-override';

@injectable()
export class FolderToolbarService {

    

    // @inject(ApplicationShellWithToolbarOverride) 
    // protected shell: ApplicationShellWithToolbarOverride;

    
   

    @inject(LateInjector) protected lateInjector: <T>(id: interfaces.ServiceIdentifier<T>) => T;

     protected  toolbarController: ToolbarController;


     @postConstruct()
     protected init(): void {
         this.doInit();
     }
 
     protected async doInit(): Promise<void> {
        this.toolbarController = this.lateInjector(ToolbarController);
        
     }
     
     public async setupToolbar():  Promise<void>{
        const cmd: Command = FolderCommands.OPEN_FOLDER; 
        
       await  this.toolbarController.addItem(cmd,ToolbarAlignment.CENTER);
 
     }
   
}

 
