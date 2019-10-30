(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var formatTime = function (msec) {
        return {
            d: Math.floor(msec / 1000 / (3600 * 24)),
            h: Math.floor((msec / 1000 / 3600) % 24),
            m: Math.floor((msec / 1000 / 60) % 60),
            s: Math.floor((msec / 1000) % 60),
            ms: Math.floor(msec % 1000)
        };
    };
    var Timer = /** @class */ (function () {
        function Timer(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.duration, duration = _c === void 0 ? 0 : _c, _d = _b.interval, interval = _d === void 0 ? 1000 : _d, _e = _b.callback, callback = _e === void 0 ? function () { } : _e;
            this.duration = duration;
            this.interval = interval;
            this.callback = callback;
            this.reset();
        }
        Timer.prototype.call = function () {
            this.callback({
                before: formatTime(this.pastTime),
                after: formatTime(this.duration - this.pastTime),
                msBefore: this.pastTime,
                msAfter: this.duration - this.pastTime
            });
        };
        Timer.prototype._begin = function (offset) {
            var _this = this;
            if (offset === void 0) { offset = this.interval; }
            if (this.duration && this.pastTime >= this.duration)
                return;
            this.timeId = setTimeout(function () {
                _this.pastTime += _this.interval;
                offset = _this.referenceTime + _this.pastTime + _this.interval - +new Date();
                if (offset < 0) {
                    var delay = _this.interval * Math.ceil(-offset / _this.interval);
                    _this.pastTime += delay;
                    offset += delay;
                }
                _this.call();
                _this._begin(offset);
            }, offset);
        };
        Timer.prototype.start = function () {
            if (this.timeId > 0)
                return;
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
        };
        Timer.prototype.stop = function () {
            clearTimeout(this.timeId);
            this.timeId = -1;
        };
        Timer.prototype.reset = function () {
            clearTimeout(this.timeId);
            this.pastTime = 0;
            this.timeId = 0;
        };
        return Timer;
    }());
    exports.default = Timer;
});
//# sourceMappingURL=index.js.map