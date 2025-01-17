
import '../../src/browser/style/index.css';
import { WidgetFactory } from '@theia/core/lib/browser';
import { AboutDialog } from '@theia/core/lib/browser/about-dialog';
import { CommandContribution } from '@theia/core/lib/common/command';
import { ContainerModule } from '@theia/core/shared/inversify';
import { GettingStartedWidget } from '@theia/getting-started/lib/browser/getting-started-widget';
import { MenuContribution } from '@theia/core/lib/common/menu';
import { IDEAboutDialog } from './ide-about-dialog';
import { IDEContribution } from './ide-contribution';
import { IDEGettingStartedWidget } from './ide-getting-started-widget';
import { applyFeatures } from './vest-contribution';

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
    bind(IDEGettingStartedWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(context => ({
        id: GettingStartedWidget.ID,
        createWidget: () => context.container.get<IDEGettingStartedWidget>(IDEGettingStartedWidget),
    })).inSingletonScope();
    if (isBound(AboutDialog)) {
        rebind(AboutDialog).to(IDEAboutDialog).inSingletonScope();
    } else {
        bind(AboutDialog).to(IDEAboutDialog).inSingletonScope();
    }

    bind(IDEContribution).toSelf().inSingletonScope();
    [CommandContribution, MenuContribution].forEach(serviceIdentifier =>
        bind(serviceIdentifier).toService(IDEContribution)
    );
     
    applyFeatures(bind);
});
