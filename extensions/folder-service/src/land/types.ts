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
  