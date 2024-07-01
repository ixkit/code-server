
// import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { injectable, inject} from '@theia/core/shared/inversify';
import { WorkspaceService } from '@theia/workspace/lib/browser';
// import URI from '@theia/core/lib/common/uri';
// import { WorkspaceServer, UntitledWorkspaceService, WorkspaceFileService } from '../common';
//import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { DEFAULT_WINDOW_HASH } from '@theia/core/lib/common/window';
// import {
//     FrontendApplicationContribution, PreferenceServiceImpl, PreferenceScope, PreferenceSchemaProvider, LabelProvider
// } from '@theia/core/lib/browser';
// import { Deferred } from '@theia/core/lib/common/promise-util';
// import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
// import { ILogger, Disposable, DisposableCollection, Emitter, Event, MaybePromise, MessageService, nls } from '@theia/core';
import { ILogger, MaybePromise } from '@theia/core';
// import { WorkspacePreferences } from './workspace-preferences';
// import * as jsoncparser from 'jsonc-parser';
// import * as Ajv from '@theia/core/shared/ajv';
// import { FileStat, BaseStat } from '@theia/filesystem/lib/common/files';
// import { FileService } from '@theia/filesystem/lib/browser/file-service';
// import { WindowTitleService } from '@theia/core/lib/browser/window/window-title-service';
// import { FileSystemPreferences } from '@theia/filesystem/lib/browser';
// import { workspaceSchema, WorkspaceSchemaUpdater } from './workspace-schema-updater';
// import { IJSONSchema } from '@theia/core/lib/common/json-schema';
// import { StopReason } from '@theia/core/lib/common/frontend-application-state';

@injectable()
export class HookWorkspaceService  {

    @inject(ILogger)
    protected readonly logger: ILogger;

    @inject(WorkspaceService) protected defaultWorkspaceService: WorkspaceService;

    public hook(): void {
        // @ts-ignore
        this.defaultWorkspaceService.getDefaultWorkspaceUri = this.doGetDefaultWorkspaceUri;
        this.logger.debug('🪝 HookWorkspaceService->hook success!');
    }

    protected getDefaultWorkspaceUri(): MaybePromise<string | undefined> {
        const activeRequest = window.location;
        this.logger.debug(`🪝 HookWorkspaceService->doGetDefaultWorkspaceUri, activeRequest:${activeRequest}`);

        // If an empty window is explicitly requested do not restore a previous workspace.
        // Note: `window.location.hash` includes leading "#" if non-empty.
        if (window.location.hash === `#${DEFAULT_WINDOW_HASH}`) {
            window.location.hash = '';
            return undefined;
        }

        // // Prefer the workspace path specified as the URL fragment, if present.
        // if (window.location.hash.length > 1) {
        //     // Remove the leading # and decode the URI.
        //     const wpPath = decodeURI(window.location.hash.substring(1));
        //     const workspaceUri = new URI().withPath(wpPath).withScheme('file');
        //     let workspaceStat: FileStat | undefined;
        //     try {
        //         workspaceStat = await this.fileService.resolve(workspaceUri);
        //     } catch { }
        //     if (workspaceStat && !workspaceStat.isDirectory && !this.isWorkspaceFile(workspaceStat)) {
        //         this.messageService.error(`Not a valid workspace file: ${workspaceUri}`);
        //         return undefined;
        //     }
        //     return workspaceUri.toString();
        // } else {
        //     // Else, ask the server for its suggested workspace (usually the one
        //     // specified on the CLI, or the most recent).
        //     return this.server.getMostRecentlyUsedWorkspace();
        // }
    }
}