export interface Runtime {
        trace: boolean,
}
 
export namespace FolderServiceLib {
    export const DEFAULT: Runtime = {
        trace: false,
    };
}