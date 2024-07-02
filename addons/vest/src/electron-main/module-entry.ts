

import { ContainerModule } from '@theia/core/shared/inversify';
import { ElectronMainApplicationContribution } from '@theia/core/lib/electron-main/electron-main-application';
import { IconContribution } from './icon-contribution';

export default new ContainerModule(bind => {
    bind(IconContribution).toSelf().inSingletonScope();
    bind(ElectronMainApplicationContribution).toService(IconContribution);
});
