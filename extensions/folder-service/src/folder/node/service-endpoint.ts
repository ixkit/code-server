import { inject, injectable } from '@theia/core/shared/inversify';
// import { Application, Router, Request, Response } from '@theia/core/shared/express';
import { Application  } from '@theia/core/shared/express';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { ILogger} from '@theia/core/lib/common';
//import { WorkspaceService } from '@theia/workspace/lib/browser'; 

@injectable()
export class ServiceApiEndpoint implements BackendApplicationContribution {
    @inject(ILogger)
    protected readonly logger: ILogger;

   // @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService;

   configure(app: Application): void {
       app.get('/open', (request, response) => {
           console.debug(' ☎️ ', request)
           const data ={
            'open': (new Date()).getTime(),
            'req': request.params
           }
           response.json(data)
       });

       this.hook();
   }

   hook(){
    this.logger.debug('🪝 hook folder backend service');
    // this.workspaceService.onWorkspaceChanged(() => {
    //     this.logger.debug('🔃 onWorkspaceChanged');
    // });
   }
}