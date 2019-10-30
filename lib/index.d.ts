declare const formatTime: (msec: number) => {
    d: number;
    h: number;
    m: number;
    s: number;
    ms: number;
};
export interface ItimerCallParams {
    before: ReturnType<typeof formatTime>;
    after: ReturnType<typeof formatTime>;
    msBefore: number;
    msAfter: number;
}
export interface ItimerParams {
    duration?: number;
    interval?: number;
    callback?: (time: ItimerCallParams) => void;
}
export default class Timer {
    private referenceTime;
    private pastTime;
    private timeId;
    private duration;
    private interval;
    private callback;
    constructor({ duration, interval, callback }?: ItimerParams);
    private call;
    private _begin;
    start(): void;
    stop(): void;
    reset(): void;
}
export {};
