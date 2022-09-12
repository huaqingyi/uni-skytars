"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = exports.Module = exports.VuexModule = exports.Store = void 0;
var tslib_1 = require("tslib");
var vuex_module_decorators_1 = require("vuex-module-decorators");
var vuex_1 = tslib_1.__importStar(require("vuex"));
var vue_1 = tslib_1.__importDefault(require("vue"));
var lodash_1 = require("lodash");
vue_1.default.use(vuex_1.default);
var Store = /** @class */ (function () {
    function Store(store) {
        if (!Store._store) {
            this.store = store || new vuex_1.Store({});
            Store._store = this;
        }
        return Store._store;
    }
    Store.Module = function (options) {
        if (!options.id) {
            options.id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
        }
        options.keys = {};
        (0, lodash_1.map)((0, lodash_1.merge)({}, options.actions, options.mutations, options.getters), function (o, i) {
            options.keys[i] = i;
        });
        (0, vuex_module_decorators_1.Module)({ dynamic: true, store: new Store().store, name: options.id })(options);
    };
    Store.prototype.get = function (moduleClass) {
        return (0, vuex_module_decorators_1.getModule)(moduleClass);
    };
    Store.used = false;
    return Store;
}());
exports.Store = Store;
tslib_1.__exportStar(require("vuex-module-decorators"), exports);
var VuexModule = /** @class */ (function (_super) {
    tslib_1.__extends(VuexModule, _super);
    function VuexModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // tslint:disable-next-line:ban-types
    VuexModule.action = function (callback) {
        return "".concat(this.id, "/").concat(callback(this.keys));
    };
    return VuexModule;
}(vuex_module_decorators_1.VuexModule));
exports.VuexModule = VuexModule;
Store.install = function (app, options) {
    var store = new Store(options);
    app.prototype.$store = store.store;
};
exports.Module = Store.Module;
function useStore(moduleClass) {
    if (!moduleClass)
        return new Store().store;
    return new Store().get(moduleClass);
}
exports.useStore = useStore;

//# sourceMappingURL=../.sourcemaps/vuex/model.js.map
