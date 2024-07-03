export interface FolderIntent {
    dir: string;
    file?: string;
    line?: number;
    keywords?: string;
    extra?:  Object|null|undefined;
};


export interface IFolder {
    id?: string;
    parentId?: string;
    name: string;
    path: string,
    data?: Object|null|undefined;
    items?: IFolder[]|null|undefined;
}


export namespace Reacts {
    export interface IObserver {
      update:(sender:any, val:any)=>void;
      lisenter?:IObserver;
    }
}
  
export namespace FolderServices{
    export namespace Web {
        export const RouteTag = '/🔨';
        
        const RouteTagEncode = '/%F0%9F%94%A8'; //  '/🔨';

        export const Feature={
            
            serveRootRoute(): string{
                const val = RouteTagEncode; 
                return  val + '*';
            },
            rootRoute(path: string): string{
                return `${RouteTag}${path}`;
            },
            isRootRoute(path: string): boolean{
                if (!path){
                    return false;
                }
                return  path.startsWith(RouteTag) || path.startsWith(RouteTagEncode);
            },
            parseRootRoute(path: string): string{
                if (!path){ return ''}
                return path.replace(RouteTag,'');
            }
        }
    }
   
}