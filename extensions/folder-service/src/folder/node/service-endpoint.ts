//import { hash } from '@theia/core/lib/common/hash';
import { hashValue } from '@theia/core/lib/common/uuid';
import { inject, injectable } from '@theia/core/shared/inversify';
import { Application, Response } from '@theia/core/shared/express';
// Router, Request,
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { ILogger} from '@theia/core/lib/common';
import { FolderBusBackendService } from '../../folder-bus/common/protocol';
import { Path } from '@theia/core/lib/common';
 
function echoError(res: Response, data: any): void {
    // if (errCode){
    //     res.status(errCode).send(data); 
    // } 
    res.status(500).send(data);
  }
  
function echoSuccess(res: Response, data: any): void {
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.status(200).send(data);
}
 
@injectable()
export class ServiceApiEndpoint implements BackendApplicationContribution {
    @inject(ILogger)protected readonly logger: ILogger;

    @inject(FolderBusBackendService) protected folderBusBackendService: FolderBusBackendService;

   
    configure(app: Application): void {
        this.deployServices(app);
         
    }

   deployServices(app: Application): void{
    this.openHandler(app);
   }

   traceHandler(app: Application): void{
    app.get('/open', (request, response) => {
        console.debug(' ☎️ ', request)
        const data ={
         'open': (new Date()).getTime(),
         'req': request.params
        }
        echoSuccess(response,data);
    });
   }
    /*
        open doc folder then trigger render on web page
        eg: http://localhost:3030/folder?dir=/workspace/code/src&file=welcome.md&line=12

        dir=/WorkSpace/zanvil_page
        file=__manifest__.py
        
        http://127.0.0.1:8080/folder?dir=/WorkSpace/zanvil_page&file=__manifest__.py&line=11
        
        http://127.0.0.1:8080/folder?dir={}&file={}line={}
        http://127.0.0.1:8080/folder?dirId={}&file={}line={}

    */
   openHandler(app: Application): void{
        app.get('/folder', (req, res) => {
            console.debug(' ☎️ ', req);
            const dirPath = req.query['dir']; 
            //let file = req.query['file']; 
            
            if (!dirPath){
                return  echoError(res,{'error':`invlidate input:${JSON.stringify(req.query)}`}) ;
            } 
            let dir = dirPath.toString();

            if (false && !dir.startsWith(Path.separator)){
                // append first path separator
                dir = Path.separator + dir;
            }
            const reqData = req.query;
            const ts = (Date.now()).toString();
            reqData.xts = ts;
            
            let intentStr = JSON.stringify(reqData);
            intentStr = encodeURIComponent(intentStr);
            const id = hashValue(dir);
            this.folderBusBackendService.putIntent(id,intentStr);
            res.setHeader('Set-Cookie', `folderId=${id}; HttpOnly;Max-Age=60`);
            res.redirect(`/#${dir}`);
        });
    } 
}