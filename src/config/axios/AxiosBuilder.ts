import {AxiosRequestConfig} from "axios";
import {isUndefined} from "lodash";
import {AUTH_CONSTANT} from "../../constant/AuthConstant.ts";
import {AXIOS_CONST} from "../../constant/AxiosConstant.ts";

export class AxiosBuilder {
    private readonly config: AxiosRequestConfig;

    constructor(config?: AxiosRequestConfig) {
        this.config = initAxiosConfig(config)
    }

    setHeaderNoLoading(): AxiosBuilder{
        this.config[AUTH_CONSTANT.HEADERS]![AXIOS_CONST.NO_LOADING] = true;
        return this;
    }

    setHeaderJson():AxiosBuilder{
        this.config[AUTH_CONSTANT.HEADERS]![AXIOS_CONST.CONTENT_TYPE] = AXIOS_CONST.APPLICATION_JSON;
        return this;
    }

    setResponseType(responseType: never): AxiosBuilder{
        this.config[AXIOS_CONST.RESPONSE_TYPE] = responseType;
        return this;
    }

    builder(): AxiosRequestConfig{
        return this.config;
    }
}

function initAxiosConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    if(isUndefined(config)){
        config = {}
    }
    if(isUndefined(config[AUTH_CONSTANT.HEADERS])){
        config[AUTH_CONSTANT.HEADERS] = {}
    }
    return config;
}