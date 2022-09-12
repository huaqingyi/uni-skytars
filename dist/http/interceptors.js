"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPInterceptor = void 0;
var HTTPInterceptor = /** @class */ (function () {
    function HTTPInterceptor() {
        this._request = [];
        this._response = [];
    }
    Object.defineProperty(HTTPInterceptor.prototype, "request", {
        get: function () {
            return { use: this.requestUse.bind(this) };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HTTPInterceptor.prototype, "response", {
        get: function () {
            return { use: this.responseUse.bind(this) };
        },
        enumerable: false,
        configurable: true
    });
    HTTPInterceptor.prototype.requestUse = function (fn) {
        this._request.push(fn);
        return this;
    };
    HTTPInterceptor.prototype.responseUse = function (fn) {
        this._response.push(fn);
        return this;
    };
    return HTTPInterceptor;
}());
exports.HTTPInterceptor = HTTPInterceptor;

//# sourceMappingURL=../.sourcemaps/http/interceptors.js.map
