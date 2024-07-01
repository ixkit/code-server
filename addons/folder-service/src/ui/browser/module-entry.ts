/**
 * Generated using theia-extension-generator
 */
import { FolderUICommandContribution, FolderUIMenuContribution } from './ui-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { FolderToolbarService } from './folder-toolbar-service';
import { ToolbarDefaultsFactory } from '@theia/toolbar/lib/browser/toolbar-defaults';
import { FolderToolbarDefaults } from './folder-toolbar-factory';

import { FolderHomePage, FolderHomePageFactory } from './folder-home-page';
 
 

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
    // add your contribution bindings here
    bind(CommandContribution).to(FolderUICommandContribution);
    bind(MenuContribution).to(FolderUIMenuContribution);

    bind(FolderToolbarService).toSelf().inSingletonScope();

    if (isBound(ToolbarDefaultsFactory)) {
        rebind(ToolbarDefaultsFactory).toConstantValue(FolderToolbarDefaults);
      } else {
        bind(ToolbarDefaultsFactory).toConstantValue(FolderToolbarDefaults);
    }
     
    bind(FolderHomePage).toSelf();
    bind(FolderHomePageFactory).toFactory<FolderHomePage>(ctx => {
        return (id: string) => {
            const widget = ctx.container.get(FolderHomePage);
            widget.id = id;
            return widget;
        }
    });
});
