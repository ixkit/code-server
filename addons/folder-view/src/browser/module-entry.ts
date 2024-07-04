import { ContainerModule } from '@theia/core/shared/inversify';
import { FolderApiWidget } from './folder-api-widget';
import { FolderApiContribution } from './folder-api-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    if (1>0) {
        return ;
    }
    bindViewContribution(bind, FolderApiContribution);
    bind(FrontendApplicationContribution).toService(FolderApiContribution);
    bind(FolderApiWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: FolderApiWidget.ID,
        createWidget: () => ctx.container.get<FolderApiWidget>(FolderApiWidget)
    })).inSingletonScope();
});
