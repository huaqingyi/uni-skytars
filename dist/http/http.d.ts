import { HTTPInterceptor } from './interceptors';
import { HTTPConfiguration, HTTPResponse } from './types';
export declare class HTTP {
    private config;
    static create(config?: HTTPConfiguration): HTTP;
    interceptors: HTTPInterceptor;
    constructor(config?: HTTPConfiguration);
    private getConfig;
    success(response: HTTPResponse): Promise<any>;
    request<T = any, R = HTTPResponse<T>, D = any>(config: HTTPConfiguration<D>): Promise<R>;
    get<T = any, R = HTTPResponse<T>, D = any>(url: string, config?: HTTPConfiguration<D>): Promise<R>;
    post<T = any, R = HTTPResponse<T>, D = any>(url: string, data?: D, config?: HTTPConfiguration<D>): Promise<R>;
    put<T = any, R = HTTPResponse<T>, D = any>(url: string, data?: D, config?: HTTPConfiguration<D>): Promise<R>;
    delete<T = any, R = HTTPResponse<T>, D = any>(url: string, config?: HTTPConfiguration<D>): Promise<R>;
    options<T = any, R = HTTPResponse<T>, D = any>(url: string, config?: HTTPConfiguration<D>): Promise<R>;
}
export declare const create: typeof HTTP.create;
