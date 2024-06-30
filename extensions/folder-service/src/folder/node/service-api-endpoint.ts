//import { hash } from '@theia/core/lib/common/hash';
import { hashValue } from '@theia/core/lib/common/uuid';
import { inject, injectable } from '@theia/core/shared/inversify';
import { Application, Response } from '@theia/core/shared/express';
// Router, Request,
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { ILogger} from '@theia/core/lib/common';
import { FolderBusBackendService } from '../../folder-bus/common/protocol';
import { Path } from '@theia/core/lib/common';
import { myShareDB } from './my-sharedb';
import { IFolder } from 'src/land';

 
 
function echoError(res: Response, data: any): void {
    // if (errCode){
    //     res.status(errCode).send(data); 
    // } 
    res.status(500).send( (data));
  }
  
function echoSuccess(res: Response, data: any): void {
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.status(200).send( (data));
}


@injectable()
export class ServiceApiEndpoint implements BackendApplicationContribution {
    @inject(ILogger)protected readonly logger: ILogger;

    @inject(FolderBusBackendService) protected folderBusBackendService: FolderBusBackendService;

   
    configure(app: Application): void {
        this.deployServices(app);
         
    }

   deployServices(app: Application): void{
    this.serveOpenFolderHandler(app);
    this.serveFolderService(app);
   }

   traceHandler(app: Application): void{
    app.get('/api/health', (request, response) => {
        this.logger.debug(' ☎️ ', request);
        const data ={
         'ts': (new Date()).getTime(),
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
   serveOpenFolderHandler(app: Application): void{
        app.get('/folder', (req, res) => {
            this.logger.debug(' ☎️ ', req);
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

    /*
    @purpose: serve folders service, post and get, make the ide to be micro services.
    @url:    http://localhost:3030/api/folders
    */    
    serveFolderService(app: Application): void {
        handleFolderGetRoute(app,{logger:this.logger});
        handleFolderPostRoute(app,{logger:this.logger});
    }
}
// ---------------------------  traditional code organizing

function mockFolder():IFolder{
    const ts = Date.now();
    const folder:IFolder = {
           // parentId: "xxx", // option 
            name:"group-name" + ts,
            path: "group-path" + ts,
            data: {
                demo:{
                    name:ts +"",
                    ts: ts
                }
            },
            items:[ {
                name:"item-name" + ts,
                path: 'item-path' + ts,
                data:{
                    list:[
                        {name:"item-1" + ts,age:ts},
                        {name:"item-2" + ts,age:ts}
                    ]
                }
            }]
        };
    return folder;
} 
function fillFolderId(list: IFolder[], put2Cache: boolean ): void {
    if (!list) { return; }
    for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const key = myShareDB.toFolderId(item.path);
        item.id = key;
    }
}
/*
{
  folders=[{
    id: ?
    name: 
    data:
    path: 
    items:[
        {
          id: ?
          name: 
          data:
          path: 
        }
    ]
  }]
}
*/ 
function handleFolderPostRoute(app: Application, context?:{logger:ILogger}): void{
    const foldersRoute = '/api/folders';
    app.post(foldersRoute, (req, res) => {  
        
        let params:{
            folders:IFolder[]
        } = {folders:[]};
        
        const mockMode = req.query['mock'] === '1';
        if (mockMode){
            params.folders = [mockFolder()];
        }else{
            params = req.body;
        } 
        if (!params){
            return  echoError(res,{'error': 'invlidate parameters'}) ;
        } 
        try{
            const folders: IFolder[] = params.folders;
            // pack the id
            fillFolderId(folders,true);
            for (let index = 0; index < folders.length; index++) {
                const folder: IFolder = folders[index];
                if (folder.items){
                    fillFolderId(folder.items,true);
                } 
            }
            const result = myShareDB.syncFolders(folders);
                
            return echoSuccess(res,{success: true,data :result }); 
        
        }catch(ex){
            context?.logger.error('failed handleFolderPostRoute',ex);
            return echoError(res,{'error':ex.toString()}) ;  
        }
    
    });
}
/*
  folders=[{
    id: ?
    name: 
    data:
    path: 
    items:[
        {
          id: ?
          name: 
          data:
          path: 
        }
    ]
  }]
*/  
function handleFolderGetRoute(app: Application, context?:{logger:ILogger}): void{ 
    const foldersRoute = '/api/folders';
    app.get(foldersRoute, (req, res) => {  
        
        try{ 
            const folders = myShareDB.getFolders();
            console.log('🚌 folders:',folders);
            return echoSuccess(res,{success: true, data:folders });
        
        }catch(ex){
            context?.logger.error('failed handleFolderGetRoute',ex);
            return echoError(res,{'error':ex.toString()}) ; 
        }

    });
}