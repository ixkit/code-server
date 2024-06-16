/**
 * Generated using theia-extension-generator
 */
import { EchoCommandContribution, EchoMenuContribution } from './echo-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(EchoCommandContribution);
    bind(MenuContribution).to(EchoMenuContribution);
});
