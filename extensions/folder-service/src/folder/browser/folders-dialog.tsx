
import * as React from 'react';
import { AboutDialog, ABOUT_CONTENT_CLASS } from '@theia/core/lib/browser/about-dialog'; // AboutDialogProps,
 
import { injectable, inject } from '@theia/core/shared/inversify';
import { renderDocumentation, renderDownloads, renderSourceCode, renderSupport, renderTickets, renderWhatIs } from './branding-util';
 
//import { Dialog, DialogProps } from'@theia/core/lib/browser/dialog"
import {  DialogProps } from'@theia/core/lib/browser/dialogs';

/*
import { TheiaDialog } from './theia-dialog';

export class TheiaAboutDialog extends TheiaDialog {

    override async isVisible(): Promise<boolean> {
        const dialog = await this.page.$(`${this.blockSelector} .theia-aboutDialog`);
        return !!dialog && dialog.isVisible();
    }

}

*/
@injectable()
export class FoldersDialogProps extends DialogProps {
}

@injectable()
export class FoldersDialog extends AboutDialog {

   

    constructor(
        @inject(FoldersDialogProps) protected readonly props: FoldersDialogProps
    ) {
        super(props);
    }

    protected async doInit(): Promise<void> {
        
        super.doInit();
    }

    protected render(): React.ReactNode {
        return <div className={ABOUT_CONTENT_CLASS}>
            {this.renderContent()}
        </div>;
    }

    protected renderContent(): React.ReactNode {
        return <div className='ad-container'>
            <div className='ad-float'>
                <div className='ad-logo'>
                </div>
                {this.renderExtensions()}
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
            {this.renderVersion()}
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
