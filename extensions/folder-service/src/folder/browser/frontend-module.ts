
import { FolderCommandContribution } from './folder-contribution';
import { ContainerModule } from '@theia/core/shared/inversify';
import { FolderService } from './folder-service';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';

export default new ContainerModule(bind => {
    bind(FrontendApplicationContribution).to(FolderCommandContribution);
    bind(FolderService).toSelf().inSingletonScope();
});
