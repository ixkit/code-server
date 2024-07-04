
import { hashValue } from '@theia/core/lib/common/uuid';

import { inject, injectable } from '@theia/core/shared/inversify';
import { Application, Response } from '@theia/core/shared/express';
// Router, Request,
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { ILogger} from '@theia/core/lib/common';
import { FolderBusBackendService } from '../../folder-bus/common/protocol';
import { Path } from '@theia/core/lib/common';
import cookieParser from 'cookie-parser';

import { myShareDB } from './my-sharedb';
import { IFolder } from 'src/land';
import { FolderServices,   } from '../../land';
import { LoggerDelgate, __XLogger__ } from './../../land/xlogger';

 
 
function echoError(res: Response, data: any, errorCode?: number): void {
    if (errorCode){
        res.status(errorCode).send(data); 
    } 
    res.status(500).send( (data));
  }
  
function echoSuccess(res: Response, data: any): void {
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.status(200).send( (data));
}

 
// -- active logger --
const __TAG__ = '[🛰️ ServiceApiEndpoint]';

const theLogger: LoggerDelgate ={  
    build(handler:ILogger){ 
        this.xLogger  = __XLogger__.get(handler, __TAG__);  
    }
}
const __debug__ = (...args: any[]) => {
    theLogger.xLogger?.debug(...args);
} 

// -- main calass feature --
@injectable()
export class ServiceApiEndpoint implements BackendApplicationContribution {
    @inject(ILogger)protected readonly logger: ILogger;

    @inject(FolderBusBackendService) protected folderBusBackendService: FolderBusBackendService;
 

    configure(app: Application): void {
       
        theLogger.build(this.logger);

        app.use(cookieParser());
        this.deployServices(app);
        
    }

   deployServices(app: Application): void{
        this.encodeFolderHandler(app);
        this.decodeFolderHandler(app);
        this.serveApiFolderService(app);
   }

   traceHandler(app: Application): void{
    app.get('/api/health', (req, res) => {
        __debug__(' ☎️ ', req);
        const data ={
         'ts': (new Date()).getTime(),
         'req': req.params
        }
        echoSuccess(res, data);
    });
   }

    /*
        open doc folder then trigger render on web page
        
        http://127.0.0.1:8080/folder?dir={}&file={}&line=1&keywords={}

        paramters:
        - dir: the folder path, eg:  /a/b/c

        - file: the file want open, eg:  index.html

        - line: the line number that want locate to, eg: 1 
        
        - keywords: seek to locate, eg: hello, if the parameter {line} was set then this keywords ignored
        
        http://127.0.0.1:8080/folder?dir=/WorkSpace/zanvil_page&file=__manifest__.py&line=11
        
        http://127.0.0.1:8080/folder?dir={}&file={}line={}
        http://127.0.0.1:8080/folder?dirId={}&file={}line={}

    */
    encodeFolderHandler(app: Application): void {
        const route = '/folder';
        app.get(route, (req, res) => {
            __debug__(` encodeFolderHandler, route: ${route} `,req.query);
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
            // max-age = 60 * 60  =  3600 (one hour)
            res.setHeader('Set-Cookie', `folderId=${id}; Secure; HttpOnly;Max-Age=60`);
            const nextUrl = `/#${dir}`;
            __debug__(` encodeFolderHandler,nextUrl: ${nextUrl} `);
            res.redirect(nextUrl);
        });
    }

    // deal with 'refresh' action in web browser
    decodeFolderHandler(app: Application): void {

        const route = FolderServices.Web.Feature.serveRootRoute();
        app.get( route, (req, res, next) => {
            const path = decodeURIComponent( req.path);
            __debug__(`decodeFolderHandler,route: ${route}, path?` , path); 
            if (!FolderServices.Web.Feature.isRootRoute(path) ) {
                next();
                return ;
            }
            const folderName = FolderServices.Web.Feature.parseRootRoute(path); 
            const cookies = req.cookies; 
            __debug__(`decodeFolderHandler,cookies? ` , cookies); 
            if (!cookies || !cookies.folderId){ 
                __debug__(`⚠️ decodeFolderHandler, cookies no value for folderId! back to root ` ); 
                res.redirect('/');
                return ;
            } 
            const folderId = cookies.folderId;
            let intentStr = this.folderBusBackendService.fetchIntent(folderId);
            intentStr = decodeURIComponent(intentStr);
            const reqData = JSON.parse(intentStr);
            const { dir,file,line} = reqData;
            const nextUrl = `/folder?dir=${dir}&file=${file}&line=${line}&name=${folderName}`;
            __debug__(`decodeFolderHandler,nextUrl: ${nextUrl} `);
            //  re-assgin the cookie value
            //res.setHeader('Set-Cookie', `folderId=${folderId}; Secure; HttpOnly;Max-Age=60`);
            res.redirect(nextUrl);
           
        });
    }
    
    /*
    @purpose: serve folders service, post and get, make the ide to be micro services.
    @url:    http://localhost:3030/api/folders
    */    
    serveApiFolderService(app: Application): void {
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
feature: add accessable folders via api
route: /api/folders
method: post
body: json format, eg:

{
  folders=[{
    id: ? optional
    name: 
    data:
    path: 
    items:[
        {
          id: ? optional
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
        __debug__(`handleFolderPostRoute,route: ${foldersRoute} `);
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
             
            return echoSuccess(res,{success: true, data:folders });
        
        }catch(ex){
            context?.logger.error('failed handleFolderGetRoute',ex);
            return echoError(res,{'error':ex.toString()}) ; 
        }

    });
}

 