
import { inject, injectable } from '@theia/core/shared/inversify';
import { EditorManager,TextEditor } from '@theia/editor/lib/browser';
import { VariableRegistry, VariableContribution} from '@theia/variable-resolver/lib/browser'; 

@injectable()
export class EditorVariableContribution implements VariableContribution {

    constructor(
        @inject(EditorManager) protected readonly editorManager: EditorManager
    ) { }

    registerVariables(variables: VariableRegistry): void {
        variables.registerVariable({
            name: 'file',
            description: 'The name of the file opened in the current editor',
            resolve: () => {
                const currentEditor = this.getCurrentEditor();
                if (currentEditor) {
                    return currentEditor.uri.path.name;
                }
                return undefined;
            }
        });
        variables.registerVariable({
            name: 'lineNumber',
            description: 'The current line number in the current file',
            resolve: () => {
                const currentEditor = this.getCurrentEditor();
                if (currentEditor) {
                    return `${currentEditor.cursor.line + 1}`;
                }
                return undefined;
            }
        });
    }

    protected getCurrentEditor(): TextEditor | undefined {
        const currentEditor = this.editorManager.currentEditor;
        if (currentEditor) {
            return currentEditor.editor;
        }
        return undefined;
    }
}