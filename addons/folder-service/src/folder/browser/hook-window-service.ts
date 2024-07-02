import { injectable,inject } from 'inversify';
import { ILogger, Event } from '@theia/core';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
 
 
@injectable()
export class HookWindowService  {
    @inject(ILogger)
    protected readonly logger: ILogger;


    @inject(WindowService) protected readonly defaultWindowService: WindowService;

    public hook(): void {
      
        this.defaultWindowService.openNewDefaultWindow = this.openNewDefaultWindow;
        this.logger.debug('🪝 HookWindowService->hook success!',this);
    }
    openNewWindow(): undefined { 
        
        return undefined;
     }
    openNewDefaultWindow(): void {
        this.logger.debug('🪝 HookWindowService->openNewDefaultWindow',this);
        //this.openNewWindow(`#${DEFAULT_WINDOW_HASH}`);
    }


    focus(): void { }
    reload(): void { }
    isSafeToShutDown(): Promise<boolean> { return Promise.resolve(true); }
    setSafeToShutDown(): void { }
    get onUnload(): Event<void> { return Event.None; }
}

