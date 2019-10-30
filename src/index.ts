const formatTime = (msec: number) => {
  return {
    d: Math.floor(msec / 1000 / (3600 * 24)),
    h: Math.floor((msec / 1000 / 3600) % 24),
    m: Math.floor((msec / 1000 / 60) % 60),
    s: Math.floor((msec / 1000) % 60),
    ms: Math.floor(msec % 1000)
  };
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
  private referenceTime: number;
  private pastTime: number;
  private timeId: number;

  private duration: number;
  private interval: number;
  private callback: (time: ItimerCallParams) => void;

  constructor({
    duration = 0,
    interval = 1000,
    callback = () => {}
  }: ItimerParams = {}) {
    this.duration = duration;
    this.interval = interval;
    this.callback = callback;
    this.reset();
  }

  private call() {
    this.callback({
      before: formatTime(this.pastTime),
      after: formatTime(this.duration - this.pastTime),
      msBefore: this.pastTime,
      msAfter: this.duration - this.pastTime
    });
  }

  private _begin(offset = this.interval) {
    if (this.duration && this.pastTime >= this.duration) return;

    this.timeId = setTimeout(() => {
      this.pastTime += this.interval;
      offset = this.referenceTime + this.pastTime + this.interval - +new Date();

      if (offset < 0) {
        const delay = this.interval * Math.ceil(-offset / this.interval);
        this.pastTime += delay;
        offset += delay;
      }

      this.call();
      this._begin(offset);
    }, offset);
  }

  start() {
    if (this.timeId > 0) return;

    if (this.timeId === 0) {
      this.referenceTime = +new Date();
      this.call();
      this._begin();
      return;
    }

    if (this.timeId < 0) {
      this.referenceTime = +new Date() - this.pastTime;
      this._begin();
      return;
    }
  }

  stop() {
    clearTimeout(this.timeId);
    this.timeId = -1;
  }

  reset() {
    clearTimeout(this.timeId);
    this.pastTime = 0;
    this.timeId = 0;
  }
}
