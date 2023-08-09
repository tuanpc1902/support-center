import AxiosCommon from "./AxiosCommon.ts";
import {AxiosPromise, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AxiosBuilder} from "./AxiosBuilder.ts";
import {AXIOS_CONST} from "../../constant/AxiosConstant.ts";
import HandleError from "./HandleError.ts";

class AppAxios extends AxiosCommon{
    public postNoLoading = (url: string, data?: never, config?: AxiosRequestConfig): AxiosPromise => {
        return this.post(url, data, new AxiosBuilder(config!).setHeaderNoLoading().builder());
    }

    public postJSONNoLoading = (url: string, data?: never, config?: AxiosRequestConfig): AxiosPromise => {
        return this.postJson(url, data, new AxiosBuilder(config!).setHeaderNoLoading().builder());
    }

    public getNoLoading = (url: string, config?: AxiosRequestConfig): AxiosPromise => {
        return this.get(url,  new AxiosBuilder(config!).setHeaderNoLoading().builder());
    }

    public getJSONNoLoading = (url: string, config?: AxiosRequestConfig): AxiosPromise => {
        return this.getJson(url,  new AxiosBuilder(config!).setHeaderNoLoading().builder());
    }

    public postDownload = (url: string, params?: never) => {
        return this.postJson(url, params, {responseType: "blob"})
    }

    public getDownload =  (url: string, params?: any) => {
        return this.getJson(url, {params: {...params}, responseType: "blob"})
    }

}

let count: number = 0;
const appAxios = new AppAxios();
const appAxiosInstance = appAxios.instance();

appAxiosInstance.interceptors.request.use(function (request: InternalAxiosRequestConfig) {
    if (request.headers) {
        if (!request.headers[AXIOS_CONST.NO_LOADING]) {
            count++;
            // window.fireEvent(EVENTS_CONST.START_LOADING);
            if (request.headers[AXIOS_CONST.DELAY_LOADING]) {
                request.headers[AXIOS_CONST.REQUEST_START_TIME] = new Date();
            }
        }
    }
    return request;
}, function (error) {
    count = 0;
    return HandleError(error);
})

appAxiosInstance.interceptors.response.use(function (response: AxiosResponse) {
    if(count > 0 && !response.config.headers[AXIOS_CONST.NO_LOADING]){
        count--;
    }
    if(count === 0 && !response.config.headers[AXIOS_CONST.NO_LOADING]){
        // window.fireEvent(EVENTS_CONST.STOP_LOADING);
    }
    return response;
}, function (error) {
    count = 0;
    // window.fireEvent(EVENTS_CONST.STOP_LOADING)
    return HandleError(error);
})

export default appAxios;