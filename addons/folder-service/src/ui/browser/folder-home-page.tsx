import { ReactWidget } from "@theia/core/lib/browser";
import { injectable } from "@theia/core/shared/inversify";

export type FolderHomePageFactory = (id: string) => FolderHomePage;
export const FolderHomePageFactory = Symbol("FolderHomePageFactory");

@injectable()
export class FolderHomePage extends ReactWidget {

  constructor() {
    super();
    this.scrollOptions = {
      suppressScrollX: true,
      suppressScrollY: true,
    };
  }

  protected render(): React.ReactNode {
    return (
      <div >Folder Home Page </div>
    );
  }
}