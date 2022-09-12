import { VuexModule as VxModule, Module as VModule, getModule } from 'vuex-module-decorators';
import { Module as Mod, Store as S } from 'vuex';
import Vue, { PluginFunction } from 'vue';
import { map, merge } from 'lodash';
export * from 'vuex-module-decorators';

export class VuexModule<S = ThisType<any>, R = any> extends VxModule {
    public static id: string;
    public static keys: { [x: string]: string };
    // tslint:disable-next-line:ban-types
    public static action(callback: (model: any & VuexModule) => Function) {
        return `${this.id}/${callback(this.keys)}`;
    }
}

declare type ConstructorOf<C> = {
    new (...args: any[]): C;
};

export class Store {
    public static _store: Store;
    public static install: PluginFunction<S<any>>;

    public static Modulee<S>(options: any & Mod<S, any>): any {
        if (!(options as any).id) {
            (options as any).id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
        }

        (options as any).keys = {};
        map(merge({}, options.actions, options.mutations, options.getters), (o, i) => {
            (options as any).keys[i] = i;
        });
        VModule({ dynamic: true, store: new Store().store, name: options.id })(options);
    }

    public store!: S<any>;

    constructor(store?: S<any>) {
        if (!Store._store) {
            this.store = store || new S({});
            Store._store = this;
        }
        return Store._store;
    }

    public get<M extends VuexModule>(moduleClass: ConstructorOf<M>) {
        return getModule(moduleClass);
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $store: S<any>;
    }
}

Store.install = (app: typeof Vue, options?: S<any>) => {
    const store = new Store(options);
    app.prototype.$store = store.store;
};

export function useStore<M extends VuexModule>(moduleClass: ConstructorOf<M>) {
    return new Store().get(moduleClass);
}
