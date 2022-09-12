## Uni APP HTTP Vuex Framework
* 本插件适用于 Uni APP VUE 2.0 项目
* 本插件兼容 typescript 和 javascript 开发
* 关于 Store 的 修饰器 请参考 vuex-module-decorators

### ------------------------------------ HTTP 使用 ------------------------------------

#### config/http.(ts|js)
```typescript
// export interface HTTPConfiguration<D = any> {
//     [x: string]: any;
//     url?: string;
//     method?: Method;
//     baseURL?: string;
//     headers?: any;
//     params?: any;
//     data?: D;
//     timeout?: number;
//     timeoutErrorMessage?: string;
//     withCredentials?: boolean;
//     responseType?: string;
//     onUploadProgress?: (progressEvent: any) => void;
//     onDownloadProgress?: (progressEvent: any) => void;
//     cancelToken?: (cancal: UniApp.RequestTask) => any ;
// }
export default {
    baseURL: 'xxxx',
    headers: {},
};
```

#### interceptors/http.(ts|js)
```typescript
import { HTTP } from 'uni-skytars';

export default function (http: HTTP) {
    http.interceptors.request.use((config) => {
        console.log('request intercptor', config);
        return config;
    });
    http.interceptors.response.use((response) => {
        console.log('response intercptor', response);
        return response;
    });
    return http;
}
```

#### main.(ts|js)
```typescript
import Vue from 'vue';
import config from '@/config/http';
import { create, HTTP, Service } from 'uni-skytars';
import interceptor from '@/interceptors/http';

const http = interceptor(create(config));
Vue.prototype.$http = http;
Service.prototype.http = http;
```

### ------------------------------------ Vuex 使用 ------------------------------------

#### main.(ts|js)
```typescript
import Vue from 'vue';
import config from '@/config/http';
import { Store } from 'uni-skytars';

Vue.use(Store);
```

#### store.(ts|js)
```typescript
import { VuexModule, Module, Mutation, Action, getModule } from 'uni-skytars';
import { UserService } from '@/service/user';

export interface IUserState {}

@Module
export class UserStore extends VuexModule implements IUserState {

    public service: UserService;
    public profile: IUserState;

    constructor(module: User) {
        super(module);
        if (!User.app) User.app = getApp();
        this.service = new UserService();
        this.profile = {};
    }

    @Action
    public async getProfile(params: any) {
        const data = await this.service.profile();
        await this.setProfile(data);
        return data;
    }

    @Mutation
    private setProfile(profile: IUserState) {
        this.profile = profile;
        return profile;
    }
}
```

#### service.(ts|js)
```typescript
import { Service } from 'uni-skytars';

export interface UserInfo {}

export class UserService extends Service {
    public async profile() {
        return await Promise.resolve({ id: 1, name: 'test ...' });
    }
}
```

#### *.vue 使用
```typescript
import UserStore from '@/store/modules/user';
import { useStore } from 'uni-skytars';

useStore(UserStore).profile;
useStore(UserStore).getProfile({});
```
