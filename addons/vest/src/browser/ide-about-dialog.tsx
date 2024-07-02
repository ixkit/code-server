
import * as React from 'react';
import { AboutDialog, AboutDialogProps, ABOUT_CONTENT_CLASS } from '@theia/core/lib/browser/about-dialog';
import { injectable, inject } from '@theia/core/shared/inversify';
import { BaseInfo, renderDocumentation,  renderSourceCode, renderSupport, renderTickets, renderWhatIs,renderLand } from './branding-util';
//import { VSXEnvironment } from '@theia/vsx-registry/lib/common/vsx-environment';

import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { VSXEnvironment } from './lib/vsx-environment';

@injectable()
export class IDEAboutDialog extends AboutDialog {

   // @inject(VSXEnvironment)
    protected  environment: VSXEnvironment;

    @inject(WindowService)
    protected readonly windowService: WindowService;

    protected vscodeApiVersion: string;

    constructor(
        @inject(AboutDialogProps) protected readonly props: AboutDialogProps
    ) {
        super(props);
        this.environment = {
            getRegistryUri(): Promise<string>{
                return Promise.resolve("");
            },
            getRegistryApiUri(): Promise<string>{
                return Promise.resolve("");
            },
            getVscodeApiVersion(): Promise<string>{
                return Promise.resolve("");
            } 
        }
    }

    protected async doInit(): Promise<void> {
        this.vscodeApiVersion = await this.environment.getVscodeApiVersion();
        super.doInit();
    }

    protected render(): React.ReactNode {
        return <div className={ABOUT_CONTENT_CLASS}>
            {this.renderContent()} 
        </div>;
    }

    protected renderContent(): React.ReactNode {
        return <div className='ad-container'>
            {/* <div className='ad-float'>
                <div className='ad-logo'>
                </div>
                {this.renderExtensions()}
            </div> */}
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
                    {renderLand(this.windowService)}
                </div>
            </div>
        </div>;

    }

    protected renderTitle(): React.ReactNode {
        return <div className='gs-header'>
           <span className='gs-primary-header'> <h1>CodeServer☁️🔨 </h1></span>
            {this.renderVersion()}
        </div>;
    }

    protected renderVersion(): React.ReactNode {
        return <div>
            <p className='gs-sub-header gs-main-title' >
                {'Version:'+ BaseInfo.getAppVersion()}
            </p>
            {/* <p className='gs-sub-header' >
                {'Theia Version: ' + BaseInfo.getTheiaVersion()}
            </p> */}
            {/* <p className='gs-sub-header' >
                {'VS Code API Version: ' + this.vscodeApiVersion}
            </p> */}
        </div>;
    }
}
