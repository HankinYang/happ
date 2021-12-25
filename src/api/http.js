import axios from 'axios'
import $ from './common'

const instance=axios.create({
    timeout:30000,
    baseURL:'http://www.baidu.com'
    // baseURL:window.location.origin
});

instance.interceptors.request.use(
    config=>{
        $(config)
        .addCancel()
        .addHeaders({

        });
        console.log(config)
        return config;
    },
    error=>{
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    response=>{
        $(response.config,response).removeCancel();
        let res=response.data;
        return res.code==null 
            ||res.code==0
            ||res.status==200
            ||res.access_token
            ? res: Promise.reject(res);
    },
    error=>{
        let response = error.response;
        if ($.prototype.isCancel(error)) {
            return Promise.reject($.prototype.isCancel(error));
        }
        if (!response) {
            return Promise.reject($.prototype.errorHandlers.network());
        }
        if ($.prototype.errorHandlers.hasOwnProperty(response.status)) {
            return Promise.reject(
            $.prototype.errorHandlers[response.status](response)
        );
        }
        return Promise.reject(response.data);
    }
);

export const http=instance;