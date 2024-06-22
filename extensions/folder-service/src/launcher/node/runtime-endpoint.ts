import { inject, injectable } from '@theia/core/shared/inversify';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';

 
import { ILogger, MaybePromise } from '@theia/core/lib/common'; 
@injectable()
export class MemoryTracker implements BackendApplicationContribution {

   @inject(ILogger)
   protected readonly logger: ILogger;
   protected logTimer: NodeJS.Timeout; // NodeJS.Timer;
   protected memoryUsed = 0;

   initialize(): MaybePromise<void> {
       this.logTimer = setInterval(() => this.logMemory(), 2000);
   }

   protected logMemory(): void {
       const currentMemoryUsed = this.currentRoundedMemoryUsage();
       const diff = currentMemoryUsed - this.memoryUsed;
       if (Math.abs(diff) > 0.1) {
           const timestamp = new Date().toUTCString();
           this.logger.info(
               `[${timestamp}] PID ${process.pid} uses ${currentMemoryUsed} MB (${diff > 0 ? '+' : ''}${diff.toFixed(2)})`
           );
           this.memoryUsed = currentMemoryUsed;
       }
   }

   // eslint-disable-next-line @typescript-eslint/tslint/config
   protected currentRoundedMemoryUsage() {
       return Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;
   }

   onStop(): void {
       if (this.logTimer) {
           clearInterval(this.logTimer);
       }
   }
}