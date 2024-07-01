import { FileStatNode } from '@theia/filesystem/lib/browser/file-tree/file-tree';
import { FileTreeLabelProvider } from '@theia/filesystem/lib/browser/file-tree/file-tree-label-provider';
import { injectable } from '@theia/core/shared/inversify';
import { URI } from '@theia/core'; 

const MainFile = '__manifest__.py'

function isMainFile(uri:URI) :boolean{
    const sfname = uri.path.base;
    return sfname === MainFile   
}

@injectable()
export class File_classifyLabelProviderContribution extends FileTreeLabelProvider {
    
    canHandle(element: object): number {
        if (FileStatNode.is(element)) {
            let uri = element.uri;
            if (isMainFile(element.uri)){
                return 0
            }
            if (uri.path.ext === '.py') { 
                return super.canHandle(element)+1;
            }
        }
        return 0;
    }

    getIcon(): string {
        return 'fa fa-file-text-o';
    }

    getName(fileStatNode: FileStatNode): string {
        return super.getName(fileStatNode) + '🐍';
    }
}


@injectable()
export class MainFile_classifyLabelProviderContribution extends FileTreeLabelProvider {
    
    canHandle(element: object): number {
        if (FileStatNode.is(element)) {
      
            if (isMainFile(element.uri)) { 
                return super.canHandle(element)+1;
            }
        }
        return 0;
    } 

    getIcon(): string {
        return 'fa fa-cubes';
    }

    getName(fileStatNode: FileStatNode): string {
        return super.getName(fileStatNode) + ' 🔨 ';
    }
}
