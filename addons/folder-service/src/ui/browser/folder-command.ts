

// import { inject, injectable, optional, postConstruct } from '@theia/core/shared/inversify';
// import { CommonCommands, PreferenceService, LabelProvider, ApplicationShell, QuickInputService, QuickPickValue, SaveableService } from '@theia/core/lib/browser';
 
// import { CommandContribution, CommandRegistry, Command, ResourceProvider, MessageService, nls } from '@theia/core';
import { Command  } from '@theia/core';

// import { LanguageService } from '@theia/core/lib/browser/language-service';
// import { SUPPORTED_ENCODINGS } from '@theia/core/lib/browser/supported-encodings';
// import { EncodingMode } from './editor';
// import { EditorLanguageQuickPickService } from './editor-language-quick-pick-service';

export namespace FolderCommands {
    const FOLDER_CATEGORY = 'Folder';
    //const FOLDER_CATEGORY_KEY = nls.getDefaultKey(FOLDER_CATEGORY);
    
    export const OPEN_FOLDER = Command.toDefaultLocalizedCommand({
        id: 'workbench.action.openFolder',
        category: FOLDER_CATEGORY,
        label: 'Open Folder',
        iconClass: 'codicon codicon-file-submodule', 
       
    });
     

}


