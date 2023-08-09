import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from "axios";
import {isUndefined} from "lodash";
import {AxiosBuilder} from "./AxiosBuilder.ts";

export default class AxiosCommon {
    private readonly config: AxiosRequestConfig;
    private readonly axiosInstance: AxiosInstance;

    public constructor(config?: AxiosRequestConfig) {
        this.config = config!;
        if(isUndefined(this.config)){
            this.axiosInstance = axios.create({baseURL: "/"});
        }else {
            this.config.baseURL = "/";
            this.axiosInstance = axios.create(config);
        }
    }

    public instance(): AxiosInstance{
        return this.axiosInstance;
    }
    
    public post = async (url: string, data?: never, config?: AxiosRequestConfig): AxiosPromise => {
        return await this.axiosInstance.post(url, data, config);
    }

    public postJson = async (url: string, data?: never, config?: AxiosRequestConfig): AxiosPromise => {
        return await this.axiosInstance.post(url, data, new AxiosBuilder(config!).setHeaderJson().builder())
    }

    public get = async (url: string, config?: AxiosRequestConfig): AxiosPromise => {
        return await this.axiosInstance.get(url, config);
    }

    public getJson = async (url: string, config?: AxiosRequestConfig): AxiosPromise => {
        return await this.axiosInstance.get(url, new AxiosBuilder(config!).setHeaderJson().builder());
    }

}