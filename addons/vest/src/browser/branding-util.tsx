

import { Key, KeyCode } from '@theia/core/lib/browser';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
import * as React from 'react';

export interface ExternalBrowserLinkProps {
    text: string;
    url: string;
    windowService: WindowService;
}
export const BaseInfo = {
    getAppVersion(): string {
        return '0.1.0';
    },
    getTheiaVersion(): string {
        return '1.50.100';
    }
}

function ExternalBrowserLink(props: ExternalBrowserLinkProps): JSX.Element {
    return <a
        role={'button'}
        tabIndex={0}
        onClick={() => openExternalLink(props.url, props.windowService)}
        onKeyDown={(e: React.KeyboardEvent) => {
            if (Key.ENTER.keyCode === KeyCode.createKeyCode(e.nativeEvent).key?.keyCode) {
                openExternalLink(props.url, props.windowService);
            }
        }}>
        {props.text}
    </a>;
}

function openExternalLink(url: string, windowService: WindowService): void {
    windowService.openNewWindow(url, { external: true });
}

export function renderWhatIs(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            What is this?
        </h3>
        <div>
            <u className='li-margin-2x'>
                <li >
                The CodeServer☁️🔨 IDE is online code editor for cloud server now, purpose is build security collaboration platform.
                </li>
                <li>
                The IDE goal is speed up development business application for <span className="gs-main-title">Digital Native Enterprise</span> 🚀. 
                </li>
            </u> 
        </div>
       
         
    </div>;
}

export function renderExtendingCustomizing(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Extending/Customizing the Theia IDE
        </h3>
        <div >
            You can extend the Theia IDE at runtime by installing VS Code extensions, e.g. from the <ExternalBrowserLink text="OpenVSX registry" url="https://open-vsx.org/"
            windowService={windowService} ></ExternalBrowserLink>, an open marketplace for VS Code extensions. Just open the extension view or browse <ExternalBrowserLink
            text="OpenVSX online" url="https://open-vsx.org/" windowService={windowService} ></ExternalBrowserLink>.
        </div>
        <div>
            Furthermore, the Theia IDE is based on the flexible Theia platform. Therefore, the Theia IDE can serve as a <span className='gs-text-bold'>template</span> for building
            custom tools and IDEs. Browse <ExternalBrowserLink text="the documentation" url="https://theia-ide.org/docs/composing_applications/"
            windowService={windowService} ></ExternalBrowserLink> to help you customize and build your own CodeServer-based product.
        </div>
    </div>;
}

export function renderSupport(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Professional Support
        </h3>
        <div>
            Professional support, implementation services, consulting for building tools like CodeServer IDE and for building other tools based on CodeServer is
            available  on the <ExternalBrowserLink text=" CodeServer support page" url="https://ixkit.com/code-server/support/"
            windowService={windowService} ></ExternalBrowserLink>.
        </div>
    </div>;
}

export function renderLand(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Land
        </h3>
       
        <div>    
            The IDE builds on the open source <ExternalBrowserLink text="Eclipse Theia"
            url="https://github.com/eclipse-theia" windowService={windowService} ></ExternalBrowserLink>. We extend and build more interesting features base the Eclipse-Theia core modules.
        </div>
        <div>    
            The CoderServer supprot by the <ExternalBrowserLink text="ixkit Team"
            url="http://ixkit.com" windowService={windowService} ></ExternalBrowserLink>.
        </div> 
    </div>;
}

export function renderTickets(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Reporting feature requests and bugs
        </h3>
        <div >
            For bugs in CodeServer please consider opening an issue in
            the <ExternalBrowserLink text="Code Server project on Github" url="https://github.com/ixkit/code-server/issues/new/choose"
                windowService={windowService} ></ExternalBrowserLink>.
        </div>
        <div>
           CodeServer IDE only packages existing functionality into a product and installers
            for the product. If you believe there is a mistake in packaging, something needs to be added to the
            packaging or the installers do not work properly,
            please <ExternalBrowserLink text="open an issue on Github" url="https://github.com/ixkit/code-server/issues/new/choose"
                windowService={windowService} ></ExternalBrowserLink> to let us know.
        </div>
    </div>;
}

export function renderSourceCode(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Source Code
        </h3>
        <div >
            The source code of CodeServer IDE is available
            on <ExternalBrowserLink text="Github" url="https://github.com/ixkit/code-server"
                windowService={windowService} ></ExternalBrowserLink>.
        </div>
    </div>;
}

export function renderDocumentation(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Documentation
        </h3>
        <div >
            Please see the <ExternalBrowserLink text="documentation" url="https://ixkit.com/code-server/docs/user_getting_started/"
            windowService={windowService} ></ExternalBrowserLink> on how to use the CodeServer IDE.
        </div>
    </div>;
}

export function renderDownloads(): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Updates and Downloads
        </h3>
        <div className='gs-action-container'>
            You can update CodeServer IDE directly in this application by navigating to
            File {'>'} Preferences {'>'} Check for Updates… Moreover the application will check for updates
            after each launch automatically.
        </div>
        <div className='gs-action-container'>
            Alternatively you can download the most recent version from the download page.
        </div>
    </div>;
}
