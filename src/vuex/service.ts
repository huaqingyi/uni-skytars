import { HTTP } from '../http';

// tslint:disable-next-line:interface-name
export interface VuexService {
    http: HTTP;
}

export class Service implements VuexService {
    public http!: HTTP;
}

export declare type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;
export function useService<S>(Service: ServiceClass<S>): S {
    return new Service();
}
