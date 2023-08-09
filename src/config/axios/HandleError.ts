import {AxiosResponse} from "axios";

export default function HandleError(error: AxiosResponse){
    // window.fireEvent(EVENTS_CONST.STOP_LOADING);
    console.log(error)
    return Promise.reject(error);
}