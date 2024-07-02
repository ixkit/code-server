

import { ContainerModule } from '@theia/core/shared/inversify';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { IDEEnvVariableServer } from './ide-variables-server';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(EnvVariablesServer).to(IDEEnvVariableServer).inSingletonScope();
});
