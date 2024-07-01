export interface FolderIntent {
    dir: string;
    file?: string;
    line?: number;
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
        
        export const Feature={
            
            serveRootRoute(): string{
                const val = '/%F0%9F%94%A8'; //  '/🔨';
                return  val + '*';
            },
            rootRoute(path: string): string{
                return `${RouteTag}${path}`;
            },
            isRootRoute(path: string): boolean{
                if (!path){
                    return false;
                }
                return path.startsWith(RouteTag);
            },
            parseRootRoute(path: string): string{
                if (!path){ return ''}
                return path.replace(RouteTag,'');
            }
        }
    }
   
}