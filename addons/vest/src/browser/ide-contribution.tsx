

import { inject, injectable } from '@theia/core/shared/inversify';
import { CommonMenus } from '@theia/core/lib/browser/common-frontend-contribution';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { MenuContribution, MenuModelRegistry, MenuPath } from '@theia/core/lib/common/menu';
import { WindowService } from '@theia/core/lib/browser/window/window-service';

export namespace CodeServerIDEMenus {
    export const CodeServer_IDE_HELP: MenuPath = [...CommonMenus.HELP, 'code-server-ide'];
}
export namespace CodeServerIDECommands {
    export const CATEGORY = 'CodeServerIDE';
    export const REPORT_ISSUE: Command = {
        id: 'code-server-ide:report-issue',
        category: CATEGORY,
        label: 'Report Issue'
    };
    export const DOCUMENTATION: Command = {
        id: 'code-server-ide:documentation',
        category: CATEGORY,
        label: 'Documentation'
    };
}

@injectable()
export class IDEContribution implements CommandContribution, MenuContribution {

    @inject(WindowService)
    protected readonly windowService: WindowService;

    static REPORT_ISSUE_URL = 'https://github.com/ixkit/code-server/issues/new?assignees=&labels=&template=bug_report.md';
    static DOCUMENTATION_URL = 'https://ixkit.com/code-server/docs/user_getting_started/';

    registerCommands(commandRegistry: CommandRegistry): void {
        commandRegistry.registerCommand(CodeServerIDECommands.REPORT_ISSUE, {
            execute: () => this.windowService.openNewWindow(IDEContribution.REPORT_ISSUE_URL, { external: true })
        });
        commandRegistry.registerCommand(CodeServerIDECommands.DOCUMENTATION, {
            execute: () => this.windowService.openNewWindow(IDEContribution.DOCUMENTATION_URL, { external: true })
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CodeServerIDEMenus.CodeServer_IDE_HELP, {
            commandId: CodeServerIDECommands.REPORT_ISSUE.id,
            label: CodeServerIDECommands.REPORT_ISSUE.label,
            order: '1'
        });
        menus.registerMenuAction(CodeServerIDEMenus.CodeServer_IDE_HELP, {
            commandId: CodeServerIDECommands.DOCUMENTATION.id,
            label: CodeServerIDECommands.DOCUMENTATION.label,
            order: '2'
        });
    }
}
