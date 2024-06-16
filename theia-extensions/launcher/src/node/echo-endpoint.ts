import { injectable } from '@theia/core/shared/inversify';
// import { Application, Router, Request, Response } from '@theia/core/shared/express';
import { Application  } from '@theia/core/shared/express';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';

@injectable()
export class EchoApiEndpoint implements BackendApplicationContribution {
   configure(app: Application): void {
       app.get('/echo', (request, response) => {
           console.debug(' ☎️ ', request)
           const data ={
            'echo': (new Date()).getTime(),
            'req': request.params
           }
           response.json(data)
       });
   }
}