
import { ILogger } from "@theia/core"; 

export interface IXLogger {
    tag?: string;
    handler?: ILogger;
    info?(...args: any[]): void;
    debug(...args: any[]): void;
    warn?(...args: any[]): void;
    error?(...args: any[]): void;
    trace?(...args: any[]): void;  
}

const __TAG__ = '[🕵️‍♂️]';
 
export class XLogger implements IXLogger{
    tag = __TAG__;
    handler?: ILogger;
    constructor(tag: string,handler:ILogger){
        this.tag = tag;
        this.handler = handler;
    }
    info(...args: any[]) { 
        const tag = this.tag ? this.tag: __TAG__;
        this.handler?.info(tag, args);
    }
    debug(...args: any[]) { 
        const tag = this.tag ? this.tag: __TAG__;
        this.handler?.debug(tag, args);
    }
    warn(...args: any[]) { 
        const tag = this.tag ? this.tag: __TAG__;
        this.handler?.warn(tag,   args);
    }
    error(...args: any[]) { 
        const tag = this.tag ? this.tag: __TAG__;
        this.handler?.error(tag, args);
    }
    trace(...args: any[]) { 
        const tag = this.tag ? this.tag: __TAG__;
        this.handler?.trace(tag,  args);
    }
    
}
export const __XLogger__={
    get(handler: ILogger, tag: string):IXLogger{ 
        const result = new XLogger(tag, handler); 
        return result;
    }
} 

export interface LoggerDelgate {
    xLogger? : IXLogger;
    build( handler: ILogger): void;
    
    debug?(...args: any[]): void;
}