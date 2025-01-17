
import * as React from 'react';
import { inject, injectable, postConstruct } from 'inversify';
 
import { Dialog, DialogProps } from '@theia/core/lib/browser/dialogs';

import { ReactDialog } from '@theia/core/lib/browser/dialogs/react-dialog';
import { ApplicationServer, ApplicationInfo, ExtensionInfo } from '@theia/core/lib/common/application-protocol';
import { Message } from '@theia/core/lib/browser/widgets/widget';
import { FrontendApplicationConfigProvider } from '@theia/core/lib/browser/frontend-application-config-provider';
import { DEFAULT_SUPPORTED_API_VERSION } from '@theia/application-package/lib/api';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { Key, KeyCode } from '@theia/core/lib/browser/keys';
import { nls } from '@theia/core/lib/common/nls';

export const BASE_DIALOG_CONTENT_CLASS =  'base-dialog';// 'theia-aboutDialog';
export const ABOUT_EXTENSIONS_CLASS = 'theia-aboutExtensions';

@injectable()
export class BaseDialogProps extends DialogProps {
}

@injectable()
export class BaseDialog extends ReactDialog<void> {
    protected applicationInfo: ApplicationInfo | undefined;
    protected extensionsInfos: ExtensionInfo[] = [];
    protected readonly okButton: HTMLButtonElement;

    @inject(ApplicationServer)
    protected readonly appServer: ApplicationServer;

    @inject(WindowService)
    protected readonly windowService: WindowService;

    constructor(
        @inject(BaseDialogProps) protected override readonly props: BaseDialogProps
    ) {
        super({
            title: FrontendApplicationConfigProvider.get().applicationName,
        });
        this.appendAcceptButton(Dialog.OK);
    }

    @postConstruct()
    protected init(): void {
        this.doInit();
    }

    protected async doInit(): Promise<void> {
        this.applicationInfo = await this.appServer.getApplicationInfo();
        this.extensionsInfos = await this.appServer.getExtensionsInfos();
        this.update();
    }

    protected renderHeader(): React.ReactNode {
        const applicationInfo = this.applicationInfo;
        const compatibilityUrl = 'https://eclipse-theia.github.io/vscode-theia-comparator/status.html';

        const detailsLabel = nls.localizeByDefault('Details');
        const versionLabel = nls.localize('theia/core/about/version', 'Version');
        const defaultApiLabel = nls.localize('theia/core/about/defaultApi', 'Default {0} API', 'VS Code');
        const compatibilityLabel = nls.localize('theia/core/about/compatibility', '{0} Compatibility', 'VS Code');

        return <>
            <h3>{detailsLabel}</h3>
            <div className='about-details'>
                {applicationInfo && <p>{`${versionLabel}: ${applicationInfo.version}`}</p>}
                <p>{`${defaultApiLabel}: ${DEFAULT_SUPPORTED_API_VERSION}`}</p>
                <p>
                    <a
                        role={'button'}
                        tabIndex={0}
                        onClick={() => this.doOpenExternalLink(compatibilityUrl)}
                        onKeyDown={(e: React.KeyboardEvent) => this.doOpenExternalLinkEnter(e, compatibilityUrl)}>
                        {compatibilityLabel}
                    </a>
                </p>
            </div>
        </>;
    }

    protected renderExtensions(): React.ReactNode {
        const extensionsInfos = this.extensionsInfos;
        return <>
            <h3>List of extensions</h3>
            <ul className={ABOUT_EXTENSIONS_CLASS}>
                {
                    extensionsInfos
                        .sort((a: ExtensionInfo, b: ExtensionInfo) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .map((extension: ExtensionInfo) => <li key={extension.name}>{extension.name} {extension.version}</li>)
                }
            </ul>
        </>;
    }

    protected render(): React.ReactNode {
        return <div className={BASE_DIALOG_CONTENT_CLASS}>
            {this.renderHeader()}
            {this.renderExtensions()}
        </div>;
    }

    protected override onAfterAttach(msg: Message): void {
        super.onAfterAttach(msg);
        this.update();
    }

    /**
     * Open a link in an external window.
     * @param url the link.
     */
    protected doOpenExternalLink = (url: string) => this.windowService.openNewWindow(url, { external: true });
    protected doOpenExternalLinkEnter = (e: React.KeyboardEvent, url: string) => {
        if (this.isEnterKey(e)) {
            this.doOpenExternalLink(url);
        }
    };

    protected isEnterKey(e: React.KeyboardEvent): boolean {
        return Key.ENTER.keyCode === KeyCode.createKeyCode(e.nativeEvent).key?.keyCode;
    }

    get value(): undefined { return undefined; }
}
