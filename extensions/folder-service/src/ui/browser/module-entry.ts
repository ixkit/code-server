/**
 * Generated using theia-extension-generator
 */
import { FolderUICommandContribution, FolderUIMenuContribution } from './ui-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { FolderToolbarService } from './folder-toolbar-service';
//import { ToolbarDefaultsFactory } from '@theia/toolbar/lib/browser/toolbar-defaults';
//import { FolderToolbarDefaults } from './folder-toolbar-factory';
import { FolderToolbarWidget, FolderToolbarWidgetFactory } from './folder-toolbar-widget';
//import { ToolbarBuilder } from './toolbar-builder';
//import { ToolbarContribution } from '@theia/toolbar/lib/browser/toolbar-interfaces';

 

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
    // add your contribution bindings here
    bind(CommandContribution).to(FolderUICommandContribution);
    bind(MenuContribution).to(FolderUIMenuContribution);

    bind(FolderToolbarService).toSelf().inSingletonScope();

    // if (isBound(ToolbarDefaultsFactory)) {
    //     rebind(ToolbarDefaultsFactory).toConstantValue(FolderToolbarDefaults);
    //   } else {
    //     bind(ToolbarDefaultsFactory).toConstantValue(FolderToolbarDefaults);
    // }
     
    bind(FolderToolbarWidget).toSelf();
    bind(FolderToolbarWidgetFactory).toFactory<FolderToolbarWidget>(ctx => {
        return (id: string) => {
            const widget = ctx.container.get(FolderToolbarWidget);
            widget.id = id;
            return widget;
        }
    });
});
