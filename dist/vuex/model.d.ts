import { VuexModule as VxModule } from 'vuex-module-decorators';
import { Module as Mod, Store as S } from 'vuex';
import { PluginFunction } from 'vue';
export declare class Store {
    static used: boolean;
    static _store: Store;
    static install: PluginFunction<S<any>>;
    static Module<S>(options: any & Mod<S, any>): any;
    store: S<any>;
    constructor(store?: S<any>);
    get<M extends VuexModule>(moduleClass: ConstructorOf<M>): M;
}
export * from 'vuex-module-decorators';
export declare class VuexModule<S = ThisType<any>, R = any> extends VxModule {
    static id: string;
    static keys: {
        [x: string]: string;
    };
    static action(callback: (model: any & VuexModule) => Function): string;
}
declare type ConstructorOf<C> = {
    new (...args: any[]): C;
};
declare module 'vue/types/vue' {
    interface Vue {
        $store: S<any>;
    }
}
export declare const Module: typeof Store.Module;
export declare function useStore<M extends VuexModule>(moduleClass?: ConstructorOf<M>): S<any> | M;
