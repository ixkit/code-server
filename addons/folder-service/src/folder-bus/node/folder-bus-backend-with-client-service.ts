import { injectable } from '@theia/core/shared/inversify';
import { BackendClient, FolderBusBackendWithClientService } from '../common/protocol';

@injectable()
export class FolderBusBackendWithClientServiceImpl implements FolderBusBackendWithClientService {
    private client?: BackendClient;
    greet(): Promise<string> {
        return new Promise<string>((resolve, reject) =>
            this.client ? this.client.getName().then(greet => resolve('Hello ' + greet))
                : reject('No Client'));
    }
    dispose(): void {
        // do nothing
    }
    setClient(client: BackendClient): void {
        this.client = client;
    }

}
