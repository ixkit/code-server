
import * as React from 'react';

import { Message, PreferenceService, codicon } from '@theia/core/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';
import { renderDocumentation,  renderSourceCode, renderSupport, renderTickets, renderWhatIs,BaseInfo,renderLand } from './branding-util';
import {  isOSX, environment, nls } from '@theia/core/lib/common';

import { GettingStartedWidget } from '@theia/getting-started/lib/browser/getting-started-widget';
//import { VSXEnvironment } from '@theia/vsx-registry/lib/common/vsx-environment';
import { VSXEnvironment } from './lib/vsx-environment';

import { WindowService } from '@theia/core/lib/browser/window/window-service';

@injectable()
export class  IDEGettingStartedWidget extends GettingStartedWidget {

  //  @inject(VSXEnvironment)
    protected   environment: VSXEnvironment;

    @inject(WindowService)
    protected readonly windowService: WindowService;

    @inject(PreferenceService)
    protected readonly preferenceService: PreferenceService;

    protected vscodeApiVersion: string;

    protected async doInit(): Promise<void> {
        super.doInit();
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
        
        this.vscodeApiVersion = await this.environment.getVscodeApiVersion();
        await this.preferenceService.ready;
        this.update();
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        const htmlElement = document.getElementById('alwaysShowWelcomePage');
        if (htmlElement) {
            htmlElement.focus();
        }
    }

    protected render(): React.ReactNode {
        return <div className='gs-container'>
            <div className='gs-content-container'>
                <div className='gs-float'>
                    <div className='gs-logo'>
                    </div>
                    {this.renderActions()}
                </div>
                {this.renderHeader()}
                <hr className='gs-hr' />
                <div className='flex-grid'>
                    <div className='col'>
                        {renderWhatIs(this.windowService)}
                    </div>
                </div>
                {/* <div className='flex-grid'>
                    <div className='col'>
                        {renderExtendingCustomizing(this.windowService)}
                    </div>
                </div> */}
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
            </div>
            <div className='gs-preference-container'>
                {this.renderPreferences()}
            </div>
        </div>;
    }

    protected _doOpenFolder = () => this.commandRegistry.executeCommand("workbench.action.openFolder");
    protected _doOpenFolderEnter = (e: React.KeyboardEvent) => {
        if (this.isEnterKey(e)) {
            this._doOpenFolder();
        }
    };
    protected _renderStart(): React.ReactNode {
        const requireSingleOpen =  isOSX || !environment.electron.is();
        if (requireSingleOpen){}
        const openFolder = <div className='gs-action-container'>
            <a
               role={'button'}
                tabIndex={0}
                onClick={this._doOpenFolder}
                onKeyDown={this._doOpenFolderEnter}>
                {nls.localizeByDefault('Open Folder')}
            </a>
        </div>;
 

        return <div className='gs-section'>
            <h3 className='gs-section-header'><i className={codicon('folder-opened')}></i>{nls.localizeByDefault('Start')}</h3> 
            {openFolder} 
        </div>;
    }
    protected renderActions(): React.ReactNode {
        return <div className='gs-container'>
            <div className='flex-grid'>
                <div className='col'>
                    {this._renderStart()}
                </div>
            </div>
            {/* <div className='flex-grid'>
                <div className='col'>
                    {this.renderRecentWorkspaces()}
                </div>
            </div> */}
            <div className='flex-grid'>
                <div className='col'>
                    {this.renderSettings()}
                </div>
            </div>
            {/* <div className='flex-grid'>
                <div className='col'>
                    {this.renderHelp()}
                </div>
            </div> */}
        </div>;
    }

    protected renderHeader(): React.ReactNode {
        return <div className='gs-header'>
            <h1>CodeServer☁️🔨 <span className='gs-primary-header'></span></h1>
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
