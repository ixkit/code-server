
import { injectable, inject } from '@theia/core/shared/inversify';
import { ILogger } from '@theia/core/lib/common';
import { FolderBusBackendService } from '../common/protocol';
//import { Deferred } from '@theia/core/lib/common/promise-util';
@injectable()
export class FolderBusBackendServiceImpl implements FolderBusBackendService {
    
    @inject(ILogger)
    protected readonly logger: ILogger;

    //protected bucket = new Deferred<Map<string,any>>();
    protected bucket = new Map<string,any>();

    getIntent(id: string): Promise<string> {
       
        return Promise.resolve(this.fetchIntent(id));

    }
    fetchIntent(id: string): string  {
        const val = this.bucket.get(id);
        if (null == val){
            throw new Error('No matched intent!');
        }
        const result = val.toString();

        this.logger.debug('🧐 getIntent', id, result);
        return result;
    }
    putIntent(id: string, val: any|null): Promise<boolean> {
        this.bucket.set(id, val);
        return Promise.resolve(true);
    }

    sayHelloTo(name: string): Promise<string> {
        return new Promise<string>(resolve => resolve('Hello folder 🚌 ' + name));
    }
}
