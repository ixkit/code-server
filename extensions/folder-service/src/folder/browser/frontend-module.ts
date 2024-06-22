
import { ContainerModule } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { FolderCommandContribution } from './folder-contribution';
import { FolderService } from './folder-service'; 
import { EditorValService } from './editor-val-service';
export default new ContainerModule(bind => {
    bind(FrontendApplicationContribution).to(FolderCommandContribution);
    bind(FolderService).toSelf().inSingletonScope();
    bind(EditorValService).toSelf().inSingletonScope();
});
