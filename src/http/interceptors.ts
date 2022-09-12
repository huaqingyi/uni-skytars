import { HTTPConfiguration, HTTPResponse } from "./types";

export class HTTPInterceptor {

    public _request: Function[];
    public _response: Function[];

    constructor() {
        this._request = [];
        this._response = [];
    }

    public get request() {
        return { use: this.requestUse.bind(this) };
    }

    public get response() {
        return { use: this.responseUse.bind(this) };
    }

    private requestUse(fn: (params: HTTPConfiguration) => HTTPConfiguration | Promise<HTTPConfiguration>) {
        this._request.push(fn);
        return this as HTTPInterceptor;
    }

    private responseUse(fn: <D>(params: HTTPResponse<D>) => any | Promise<any>) {
        this._response.push(fn);
        return this as HTTPInterceptor;
    }
}