import { CommandContribution} from '@theia/core';
//  import { WebSocketConnectionProvider } from '@theia/core/lib/browser';
 import { ServiceConnectionProvider } from '@theia/core/lib/browser';
 //This class serves to keep API compatibility for a while. Use the RemoteConnectionProvider as the injection symbol and ServiceConnectionProvider as the type instead.

import { ContainerModule, injectable } from '@theia/core/shared/inversify';
// import { BackendClient, HelloBackendWithClientService, HelloBackendService, HELLO_BACKEND_PATH, HELLO_BACKEND_WITH_CLIENT_PATH } from '../common/protocol';
import { BackendClient, FolderBusBackendWithClientService, FolderBusBackendService, FolderBuS_BACKEND_PATH, FolderBus_BACKEND_WITH_CLIENT_PATH } from '../common/protocol';

import { FolderBusCommandContribution} from './folder-bus-contribution';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(FolderBusCommandContribution).inSingletonScope();
    bind(BackendClient).to(BackendClientImpl).inSingletonScope();

    bind(FolderBusBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(ServiceConnectionProvider);
        return connection.createProxy<FolderBusBackendService>(FolderBuS_BACKEND_PATH);
    }).inSingletonScope();

    bind(FolderBusBackendWithClientService).toDynamicValue(ctx => {
        const connection = ctx.container.get(ServiceConnectionProvider);
        const backendClient: BackendClient = ctx.container.get(BackendClient);
        return connection.createProxy<FolderBusBackendWithClientService>(FolderBus_BACKEND_WITH_CLIENT_PATH, backendClient);
    }).inSingletonScope();
});

@injectable()
class BackendClientImpl implements BackendClient {
    getName(): Promise<string> {
        return new Promise(resolve => resolve('Client'));
    }

}
