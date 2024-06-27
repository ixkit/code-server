import '../../../src/folder/browser/style/index.css';

import * as React from 'react';
//import { AboutDialog, ABOUT_CONTENT_CLASS } from '@theia/core/lib/browser/about-dialog'; // AboutDialogProps,
import { BaseDialog,BaseDialogProps, ABOUT_CONTENT_CLASS } from './base-dialog'; // AboutDialogProps,


import { injectable, inject } from '@theia/core/shared/inversify';
import { renderDocumentation, renderDownloads, renderSourceCode, renderSupport, renderTickets, renderWhatIs } from './branding-util';

//import { FolderBar } from './widget/FolderBar';
import { IRowItem } from './widget/Base/RowItem';
import { FolderList } from './widget/folders/FolderList'; 
@injectable()
export class FoldersDialogProps extends BaseDialogProps {
}

@injectable()
export class FoldersDialog extends BaseDialog {

   

    constructor(
        @inject(FoldersDialogProps) protected readonly props: FoldersDialogProps
    ) {
        super(props);
    }

    protected async doInit(): Promise<void> {
        
        super.doInit();
    }

    protected render(): React.ReactNode {
        return <div className={ABOUT_CONTENT_CLASS} >
            {this.renderContent()}
        </div>;
    }
    private putItems(rowItem: IRowItem): IRowItem{
        for (let index = 0; index < 10; index++) {
            const item: IRowItem = {
                id : 'sub' + index , 
                name: 'sub' + index,
                path: 'sub/path',
                data: { 
                    a:'sub-a', b:'sub-b'
                }  
            }
            rowItem.items?.push(item); 
        }
        return rowItem;
    }
    private getFolderList(): IRowItem[]{
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
    protected renderContent(): React.ReactNode { 

        const folders = this.getFolderList();

      
        const onPickRow = ()=>{

        }
        return <div className='ad-container'> 
            <hr className='gs-hr' />
            <div className='flex-grid'>
                {/* <div className='col'>
                    {renderWhatIs(this.windowService)}
                </div> */}
                <div className='col'>
                <FolderList items={folders} onPickRow={onPickRow} isDoc={false} />
                </div> 
            </div> 
        </div>;

    }
    /*
    private keep():  React.ReactNode{
       return  <FolderBar key={item.id} documentId={item.id} rowData= {item} onPickRow={handlePickRow} >
        <div >debug:{JSON.stringify(item.items)}</div>  
       { 
          item.items ? (
            <FolderList items={item.items} onPickRow={handlePickRow} isDoc={true}/>  
          ):(<></>)
        }  
       
      </FolderBar> ;
    }
    */
   
    protected _renderContent(): React.ReactNode {
        return <div className='ad-container'>
            <div className='ad-float'>
                <div className='ad-logo'>
                </div>
             {/* //   {this.renderExtensions()} */}
            </div>
            {this.renderTitle()}
            <hr className='gs-hr' />
            <div className='flex-grid'>
                <div className='col'>
                    {renderWhatIs(this.windowService)}
                </div>
            </div>
            <div className='flex-grid'>
                <div className='col'>
                    {renderSupport(this.windowService)}
                </div>
            </div>
            <div className='flex-grid'>
                <div className='col'>
                    {renderTickets(this.windowService)}
                </div>
            </div>
            <div className='flex-grid'>
                <div className='col'>
                    {renderSourceCode(this.windowService)}
                </div>
            </div>
            <div className='flex-grid'>
                <div className='col'>
                    {renderDocumentation(this.windowService)}
                </div>
            </div>
            <div className='flex-grid'>
                <div className='col'>
                    {renderDownloads()}
                </div>
            </div>
        </div>;

    }

    protected renderTitle(): React.ReactNode {
        return <div className='gs-header'>
            <h1>Folders <span className='gs-blue-header'>☕️</span></h1>
            {/* {this.renderVersion()} */}
        </div>;
    }

    protected renderVersion(): React.ReactNode {
        return <div>
            <p className='gs-sub-header' >
                {this.applicationInfo ? 'Version ' + this.applicationInfo.version : '-'}
            </p>

            <p className='gs-sub-header' >
                {'VS Code API Version: ' }
            </p>
        </div>;
    }
}
