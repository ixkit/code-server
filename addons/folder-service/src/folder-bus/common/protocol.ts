import { RpcServer } from '@theia/core/lib/common/messaging';

export const FolderBusBackendService = Symbol('FolderBusBackendService');
export const FolderBuS_BACKEND_PATH = '/services/folderbus';

export interface FolderBusBackendService {
    sayHelloTo(name: string): Promise<string>

    /*
     get the request intent by id, return a json string
    */
    getIntent(id: string): Promise<string>
    
    fetchIntent(id: string): string

    putIntent(id: string, val: any|null): Promise<boolean>;
}
export const FolderBusBackendWithClientService = Symbol('FolderBusBackendWithClient');
export const FolderBus_BACKEND_WITH_CLIENT_PATH = '/services/folderbus/withClient';

export interface FolderBusBackendWithClientService extends RpcServer<BackendClient> {
    greet(): Promise<string>
}
export const BackendClient = Symbol('BackendClient');
export interface BackendClient {
    getName(): Promise<string>;
}
