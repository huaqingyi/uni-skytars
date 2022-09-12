"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = exports.Store = exports.VuexModule = void 0;
var tslib_1 = require("tslib");
var vuex_module_decorators_1 = require("vuex-module-decorators");
var vuex_1 = require("vuex");
var lodash_1 = require("lodash");
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
var Store = /** @class */ (function () {
    function Store(store) {
        if (!Store._store) {
            this.store = store || new vuex_1.Store({});
            Store._store = this;
        }
        return Store._store;
    }
    Store.Modulee = function (options) {
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
    return Store;
}());
exports.Store = Store;
Store.install = function (app, options) {
    var store = new Store(options);
    app.prototype.$store = store.store;
};
function useStore(moduleClass) {
    return new Store().get(moduleClass);
}
exports.useStore = useStore;

//# sourceMappingURL=../.sourcemaps/vuex/model.js.map
