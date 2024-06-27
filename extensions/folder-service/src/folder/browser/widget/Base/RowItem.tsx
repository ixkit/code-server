interface IRowItem {
    id : string ; 
    name: string;
    path: string,
    data?: Object|null|undefined; 
    items?: IRowItem[]|null|undefined;

    
}

export {IRowItem};