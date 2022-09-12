"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.HTTP = void 0;
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var interceptors_1 = require("./interceptors");
var types_1 = require("./types");
var HTTP = /** @class */ (function () {
    function HTTP(config) {
        if (config === void 0) { config = {}; }
        this.config = config;
        this.interceptors = new interceptors_1.HTTPInterceptor();
    }
    HTTP.create = function (config) {
        if (config === void 0) { config = {}; }
        return new HTTP(config);
    };
    HTTP.prototype.getConfig = function (config, _url) {
        var _a, _b;
        if (config === void 0) { config = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mconfig, uconfig, baseURL, url, joined;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if ((0, lodash_1.isString)(_url))
                            config.url = _url;
                        mconfig = (0, lodash_1.mergeWith)({}, tslib_1.__assign({}, this.config), config);
                        uconfig = {
                            url: mconfig.url,
                            data: mconfig.data,
                            header: mconfig.headers,
                            method: mconfig.method,
                            timeout: mconfig.timeout,
                            responseType: mconfig.responseType,
                            withCredentials: mconfig.withCredentials,
                            cancelToken: mconfig.cancelToken,
                        };
                        return [4 /*yield*/, Promise.all((0, lodash_1.map)(this.interceptors._request, function (fn) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, fn(uconfig)];
                                        case 1:
                                            uconfig = _a.sent();
                                            return [2 /*return*/, uconfig];
                                    }
                                });
                            }); }))];
                    case 1:
                        _c.sent();
                        baseURL = ((_a = mconfig.baseURL) === null || _a === void 0 ? void 0 : _a.slice(-1)) === '/' ? mconfig.baseURL.slice(0, -1) : mconfig.baseURL;
                        url = ["".concat(baseURL, "/").concat(((_b = config.url) === null || _b === void 0 ? void 0 : _b.indexOf('/')) === 0 ? config.url.slice(1) : config.url)];
                        url.push((0, lodash_1.map)(config.params, function (value, field) { return "".concat(field, "=").concat(value); }).join('&'));
                        joined = '?';
                        if (encodeURI(config.url || '').includes('?'))
                            joined = '&';
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, uconfig), { url: encodeURI(url.join(joined)) })];
                }
            });
        });
    };
    HTTP.prototype.success = function (response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resp = tslib_1.__assign({}, response);
                        return [4 /*yield*/, Promise.all((0, lodash_1.map)(this.interceptors._response, function (fn) {
                                return (resp = fn(resp));
                            }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    HTTP.prototype.request = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, cancelToken, configuration;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getConfig(config)];
                    case 1:
                        _a = _b.sent(), cancelToken = _a.cancelToken, configuration = tslib_1.__rest(_a, ["cancelToken"]);
                        return [2 /*return*/, new Promise(function (r, fail) {
                                var task = uni.request(tslib_1.__assign(tslib_1.__assign({}, configuration), { fail: fail, success: function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return tslib_1.__generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _a = r;
                                                    return [4 /*yield*/, this.success(response)];
                                                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                            }
                                        });
                                    }); } }));
                                cancelToken && cancelToken(task);
                            })];
                }
            });
        });
    };
    HTTP.prototype.get = function (url, config) {
        return this.request(tslib_1.__assign(tslib_1.__assign({}, (config || {})), { url: url, method: types_1.Method.GET }));
    };
    HTTP.prototype.post = function (url, data, config) {
        return this.request(tslib_1.__assign(tslib_1.__assign({}, (config || {})), { url: url, method: types_1.Method.POST }));
    };
    HTTP.prototype.put = function (url, data, config) {
        return this.request(tslib_1.__assign(tslib_1.__assign({}, (config || {})), { url: url, method: types_1.Method.PUT }));
    };
    HTTP.prototype.delete = function (url, config) {
        return this.request(tslib_1.__assign(tslib_1.__assign({}, (config || {})), { url: url, method: types_1.Method.DELETE }));
    };
    HTTP.prototype.options = function (url, config) {
        return this.request(tslib_1.__assign(tslib_1.__assign({}, (config || {})), { url: url, method: types_1.Method.OPTIONS }));
    };
    return HTTP;
}());
exports.HTTP = HTTP;
exports.create = HTTP.create;

//# sourceMappingURL=../.sourcemaps/http/http.js.map
