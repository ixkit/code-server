
import * as os from 'os';
import * as path from 'path';
import { injectable } from '@theia/core/shared/inversify';
import { FileUri } from '@theia/core/lib/common/file-uri';
import { EnvVariablesServerImpl } from '@theia/core/lib/node/env-variables';

@injectable()
export class IDEEnvVariableServer extends EnvVariablesServerImpl {

    protected readonly _configDirUri: string = FileUri.create(path.join(os.homedir(), '.theia-ide')).toString(true);

    async getConfigDirUri(): Promise<string> {
        return this._configDirUri;
    }

}

