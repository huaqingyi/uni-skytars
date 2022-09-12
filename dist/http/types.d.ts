/// <reference types="@dcloudio/types" />
export declare enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS"
}
export interface HTTPConfiguration<D = any> {
    [x: string]: any;
    url?: string;
    method?: Method;
    baseURL?: string;
    headers?: any;
    params?: any;
    data?: D;
    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    responseType?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    cancelToken?: (cancal: UniApp.RequestTask) => any;
}
export interface HTTPResponse<T = any> {
    statusCode: number;
    header: any;
    cookies: Array<string>;
    data: T;
}
