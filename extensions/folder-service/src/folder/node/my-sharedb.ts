import { IFolder } from "src/land";
import { hashValue } from '@theia/core/lib/common/uuid';

export  const myShareDB = {

    toFolderId(path: string): string {
        const hashKey = hashValue(path);
        return hashKey;
    },

   
    _folderMap: new Map<string,IFolder>(),

    getFolders(): IFolder[]{
        const result: IFolder[] = [];
        this._folderMap.forEach((value, key) => {
            result.push(value);
        });
        return result;
    },

    syncFolders(folders: IFolder[]): any {
        const result =[];
        for (let index = 0; index < folders.length; index++) {
            const folder = folders[index];
            const parentId = folder.parentId;
            if (parentId){
                const parentFolder = this._folderMap.get(parentId);
                if (!parentFolder){ continue; } 
                if (!parentFolder.items){ 
                    parentFolder.items = []; 
                }  
                parentFolder.items.push(folder); 
                // sub folder do not need return folder id ineed,
                // now for degug output it 
                result.push({id:folder.id,path:folder.path})
                continue
            } 
            const key = "" + folder.id
            this._folderMap.set(key,folder); 
            result.push({id:key,path:folder.path})
        } 
        return result;
    } 
}