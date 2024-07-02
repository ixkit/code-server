import '../../../src/folder/browser/style/index.css';

import * as React from 'react';

import { injectable, inject } from '@theia/core/shared/inversify';
import { BaseDialog,BaseDialogProps, BASE_DIALOG_CONTENT_CLASS } from './base-dialog';
import { ConfirmDialog, Dialog } from '@theia/core/lib/browser';
import { nls } from '@theia/core/lib/common/nls';
import { renderDocumentation, renderDownloads, renderSourceCode, renderSupport, renderTickets, renderWhatIs } from './branding-util';
import { IRowItem } from './widget/Base/RowItem';
import { FolderList }  from './widget/FolderList'; 
import { FolderService } from './folder-service';
import { Message } from '@theia/core/lib/browser';
import { Reacts } from 'src/land';

@injectable()
export class FoldersDialogProps extends BaseDialogProps {
}

let that:FoldersDialog;

@injectable()
export class FoldersDialog extends BaseDialog implements Reacts.IObserver {

    
    @inject(FolderService)
    protected folderService: FolderService;

   
    private folderList: IRowItem[] = [];
 

    constructor(
        @inject(FoldersDialogProps) protected readonly props: FoldersDialogProps
    ) {
        super(props);
        that = this;
    }
    lisenter: Reacts.IObserver;

    protected async doInit(): Promise<void> {
        
        super.doInit();
        console.debug('🧐 doInit', this);
        
    }

    public  openWith(){
        this.reloadFolderList();
        this.open();
    }
    protected override onAfterAttach(msg: Message): void {
        super.onAfterAttach(msg);
        console.debug('🧐 onAfterAttach', msg);
    }

    protected render(): React.ReactNode {
    
        return <div className={BASE_DIALOG_CONTENT_CLASS} >
            {this.renderContent()}
        </div>;
    }
 
    private reloadFolderList(): IRowItem[]{ 
        this.folderService.fetchFolders().then(x=>{ 
            // this.folderList = x;
            if (this.lisenter){
                this.lisenter.update(this,x);
            }
        }).catch(e=>{
            console.error('🔥 failed fetch',e); 
        }).finally(()=>{
        // console.log('🧐 folderService.getFolders finish', this.folderList);
        });
        return []; 
    }
  

    protected renderContent(): React.ReactNode {
        return <div className='ad-container'> 
            <hr className='gs-hr' />
            <div className='flex-grid'>
                {/* <div className='col'>
                    {renderWhatIs(this.windowService)}
                </div> */}
                <div className='col'>
                   {this.renderFolderList()}
                </div> 
            </div> 
        </div>; 
    }

    protected async shouldOpenNewFolder(row:IRowItem): Promise<boolean> {
        const dialog = new ConfirmDialog({
            title: nls.localize('codeserver/openfolder', 'Confirm'),
            msg: nls.localize('codeserver/openfolder/confirm/body',
                'Do you want to open folder: {0} ? \r\n path: {1}', row.name, row.path),
            ok: Dialog.YES,
            cancel: Dialog.NO,
        });
        return !!await dialog.open();
    }

    private  async onPickRow(row: IRowItem): Promise<void> {  

        const go = await that.shouldOpenNewFolder(row);
        if (go){
            that.folderService.redirectByFolder(row);
            that.close();
        }  
    }
    protected renderFolderList(): React.ReactNode {
       
        return <FolderList 
            items={this.folderList} 
            onPickRow={this.onPickRow} 
            observer={this}
            />;
        
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
            <h1>Folders <span className='gs-primary-header'>☕️</span></h1>
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
 