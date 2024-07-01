
import { ILogger } from '@theia/core/lib/common'; 
import { injectable, inject } from '@theia/core/shared/inversify'; 
import { VariableResolverService} from '@theia/variable-resolver/lib/browser'; 

@injectable()
export class EditorValService {

    @inject(ILogger)
    protected readonly logger: ILogger;

    constructor(
        @inject(VariableResolverService) protected readonly variableResolver: VariableResolverService
    ) { }

    async resolve(): Promise<void> {
        const text = 'cursor is in file ${file} on line ${lineNumber}';
        const resolved = await this.variableResolver.resolve(text);
        this.logger.debug(" 🧐🔍 " + resolved);
    }
    public async do(): Promise<void> {
        await this.resolve();
        return  ;
    }
}