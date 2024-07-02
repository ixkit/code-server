import { ConnectionHandler, RpcConnectionHandler } from '@theia/core';
import { ContainerModule } from '@theia/core/shared/inversify';
import { BackendClient, FolderBusBackendWithClientService, FolderBusBackendService, FolderBuS_BACKEND_PATH, FolderBus_BACKEND_WITH_CLIENT_PATH } from '../common/protocol';
import { FolderBusBackendWithClientServiceImpl } from './folder-bus-backend-with-client-service';
import { FolderBusBackendServiceImpl } from './folder-bus-backend-service';

export default new ContainerModule(bind => {
    bind(FolderBusBackendService).to(FolderBusBackendServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler(FolderBuS_BACKEND_PATH, () => {
            return ctx.container.get<FolderBusBackendService>(FolderBusBackendService);
        })
    ).inSingletonScope();

    bind(FolderBusBackendWithClientService).to(FolderBusBackendWithClientServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler<BackendClient>(FolderBus_BACKEND_WITH_CLIENT_PATH, client => {
            const server = ctx.container.get<FolderBusBackendWithClientServiceImpl>(FolderBusBackendWithClientService);
            server.setClient(client);
            client.onDidCloseConnection(() => server.dispose());
            return server;
        })
    ).inSingletonScope();
});
