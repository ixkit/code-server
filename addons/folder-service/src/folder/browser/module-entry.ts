
import '../../../src/folder/browser/style/index.css';

import { ContainerModule } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { FolderServiceAppContribution, MyLayoutHandlder } from './folder-service-app-contribution';
import { FolderService } from './folder-service'; 
import { EditorValService } from './editor-val-service';
import { EditorVariableContribution } from './editor-val-contribution';
import { HookWorkspaceService } from './hook-workspace-service';
//import { WindowService } from '@theia/core/lib/browser/window/window-service';
//import { HookWindowService } from './hook-window-service';
import { FoldersDialog,FoldersDialogProps } from './folders-dialog';
import { ShellLayoutRestorer } from '@theia/core/lib/browser/shell';
 
 
export default new ContainerModule((bind, _unbind, isBound, rebind) => {
    bind(FolderServiceAppContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).to(FolderServiceAppContribution);
    bind(FolderService).toSelf().inSingletonScope();

    bind(EditorValService).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).to(EditorVariableContribution);

  //  bind(WindowService).to(HookWindowService).inSingletonScope();
    bind(HookWorkspaceService).toSelf().inSingletonScope();
 
    bind(FoldersDialog).toSelf().inSingletonScope();
    bind(FoldersDialogProps).toConstantValue({ title: 'Folders' });

    bind(MyLayoutHandlder).toSelf().inSingletonScope();
    rebind(ShellLayoutRestorer).to(MyLayoutHandlder);
     
});
/* 
export const bindToolbarApplicationShell = (bind: interfaces.Bind, rebind: interfaces.Rebind, unbind: interfaces.Unbind): void => {
  bind(ApplicationShellWithToolbarOverride).toSelf().inSingletonScope();
  rebind(ApplicationShell).toService(ApplicationShellWithToolbarOverride);
};
*/

