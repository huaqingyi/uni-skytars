import { HTTPConfiguration, HTTPResponse } from "./types";
export declare class HTTPInterceptor {
    _request: Function[];
    _response: Function[];
    constructor();
    get request(): {
        use: (fn: (params: HTTPConfiguration<any>) => HTTPConfiguration<any> | Promise<HTTPConfiguration<any>>) => HTTPInterceptor;
    };
    get response(): {
        use: (fn: <D>(params: HTTPResponse<D>) => any) => HTTPInterceptor;
    };
    private requestUse;
    private responseUse;
}
