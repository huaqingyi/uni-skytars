import { isString, map, mergeWith } from 'lodash';
import { HTTPInterceptor } from './interceptors';
import { HTTPConfiguration, HTTPResponse, Method } from './types';

export class HTTP {
    public static create(config: HTTPConfiguration = {}) {
        return new HTTP(config);
    }

    public interceptors: HTTPInterceptor;

    constructor(private config: HTTPConfiguration = {}) {
        this.interceptors = new HTTPInterceptor();
    }

    private async getConfig(config: HTTPConfiguration = {}, _url?: string): Promise<UniApp.RequestOptions & { cancelToken: (cancal: UniApp.RequestTask) => any }> {
        if (isString(_url)) config.url = _url;
        const mconfig: HTTPConfiguration = mergeWith({}, { ...this.config }, config);
        let uconfig: HTTPConfiguration = {
            url: mconfig.url,
            data: mconfig.data,
            header: mconfig.headers,
            method: mconfig.method,
            timeout: mconfig.timeout,
            responseType: mconfig.responseType,
            withCredentials: mconfig.withCredentials,
            cancelToken: mconfig.cancelToken,
        };
        await Promise.all(
            map(this.interceptors._request, async (fn) => {
                uconfig = await fn(uconfig);
                return uconfig;
            })
        );
        const baseURL = mconfig.baseURL?.slice(-1) === '/' ? mconfig.baseURL.slice(0, -1) : mconfig.baseURL;
        const url = [`${baseURL}/${config.url?.indexOf('/') === 0 ? config.url.slice(1) : config.url}`];
        url.push(map(config.params, (value, field) => `${field}=${value}`).join('&'));
        let joined = '?';
        if (encodeURI(config.url || '').includes('?')) joined = '&';
        return { ...uconfig, url: encodeURI(url.join(joined)) } as any;
    }

    public async success(response: HTTPResponse) {
        let resp: any = { ...response };
        await Promise.all(
            map(this.interceptors._response, (fn) => {
                return (resp = fn(resp));
            })
        );
        return resp;
    }

    public async request<T = any, R = HTTPResponse<T>, D = any>(config: HTTPConfiguration<D>): Promise<R> {
        const { cancelToken, ...configuration } = await this.getConfig(config);
        return new Promise((r, fail) => {
            const task = uni.request({
                ...configuration,
                fail,
                success: async (response) => {
                    return r(await this.success(response));
                },
            });
            cancelToken && cancelToken(task);
        });
    }

    public get<T = any, R = HTTPResponse<T>, D = any>(url: string, config?: HTTPConfiguration<D>): Promise<R> {
        return this.request({ ...(config || {}), url, method: Method.GET });
    }

    public post<T = any, R = HTTPResponse<T>, D = any>(url: string, data?: D, config?: HTTPConfiguration<D>): Promise<R> {
        return this.request({ ...(config || {}), url, method: Method.POST });
    }

    public put<T = any, R = HTTPResponse<T>, D = any>(url: string, data?: D, config?: HTTPConfiguration<D>): Promise<R> {
        return this.request({ ...(config || {}), url, method: Method.PUT });
    }

    public delete<T = any, R = HTTPResponse<T>, D = any>(url: string, config?: HTTPConfiguration<D>): Promise<R> {
        return this.request({ ...(config || {}), url, method: Method.DELETE });
    }

    public options<T = any, R = HTTPResponse<T>, D = any>(url: string, config?: HTTPConfiguration<D>): Promise<R> {
        return this.request({ ...(config || {}), url, method: Method.OPTIONS });
    }
}

export const create = HTTP.create;
