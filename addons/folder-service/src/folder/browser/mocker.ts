import { IRowItem } from "./widget/Base/RowItem";

export const Mocker={
    putItems(rowItem: IRowItem): IRowItem{
        const result  = [];
        for (let index = 0; index < 10; index++) {
            const item: IRowItem = {
                id : 'sub' + index , 
                name: 'sub' + index,
                path: 'sub/path',
                data: { 
                    a:'sub-a', b:'sub-b'
                }  
            }
            result.push(item); 
        }
        rowItem.items = result;
        return rowItem;
    },
     mockFolderList(): IRowItem[]{
        const result  = [];
        for (let index = 0; index < 10; index++) {
            let item: IRowItem = {
                id : 'p' + index , 
                name: 'parent' + index,
                path: 'parent/path',
                data: { 
                    a:'xxx', b:'yyy'
                }  
            }
            item = this.putItems(item);
            result.push(item); 
        }
        return result;
    }
}