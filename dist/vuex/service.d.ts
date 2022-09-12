import { HTTP } from '../http';
export interface VuexService {
    http: HTTP;
}
export declare class Service implements VuexService {
    http: HTTP;
}
export declare type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;
export declare function useService<S>(Service: ServiceClass<S>): S;
