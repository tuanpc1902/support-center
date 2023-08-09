declare interface Window{
    env?: any,
    versionBuild?: string,
    Event: Event,
    listenEvent(eventName: any, handle: any): any;
    fireEvent(eventName: string): void
    stopListenEvent(EventName: string, handle: any): void
    browser(): string
}

declare interface Document{
    documentMode?: any
}