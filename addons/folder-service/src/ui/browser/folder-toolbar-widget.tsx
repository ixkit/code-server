import { ReactWidget } from "@theia/core/lib/browser";
import { injectable } from "@theia/core/shared/inversify";

export type FolderToolbarWidgetFactory = (id: string) => FolderToolbarWidget;
export const FolderToolbarWidgetFactory = Symbol("FolderToolbarWidgetFactory");

@injectable()
export class FolderToolbarWidget extends ReactWidget {

  constructor() {
    super();
    this.scrollOptions = {
      suppressScrollX: true,
      suppressScrollY: true,
    };
  }

  protected render(): React.ReactNode {
    return (
      <div >Hello xxxxx </div>
    );
  }
}