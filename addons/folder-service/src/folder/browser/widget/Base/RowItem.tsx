interface IRowItem {
    id: string ; 
    name: string;
    path: string,
    data?: Object|null|undefined; 
    items?: IRowItem[]|null|undefined; 

    files?: string; // reliatve path file names with comma split: a.txt,b.py...
}

export {IRowItem};