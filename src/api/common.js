import axios from 'axios'


const CancelToken = axios.CancelToken;

function http(config,response){
    return new Init(config,response)
}

var init=function(config,response){
    this.config=config;
    this.response=response;
}
http.prototype =init.prototype={
    cancels:{},
    errorHandlers:{
        network(){
            return {
                message:'网络连接错误，请检查网络环境'
            }
        },
        401: () => {
            GoOut()
            return {
                message: '登录已失效'
            }
        },
        403: () => {
            return {
                message: '抱歉，访问权限受限'
            }
        },
        404: (response) => {
            return {
                message: response.data.message || '接口地址不存在'
            }
        },
        500: (response) => {
            if ([80001, 80002, 3110, 81008].indexOf(response.data.code) > -1) {
                GoOut()
                return response.data
            }
            return {
                message: response.data.message || '服务器错误，请稍候~'
            }
        }
    },
    addCancel(){
        let config=this.config;
        if(this.cancels[config.url]&& config.isLimitRequest){
            this.cancels[config.url]();
        }
        if(config.isLimitRequest){
            config.CancelToken=new CancelToken(c=>{
                this.cancels[config.url]=c;
            })
        }
        return this;
    },
    addHeaders(headers){
        for(let k in headers){
            this.config.headers.common[k]=headers[k];
        }
        return this;
    },
    removeCancel() {
        let config = this.config
        if (this.cancels[config.url]) {
            this.cancels[config.url] = null
        }
        return this
    },
    isCancel(error) {
        if (axios.isCancel(error)) {
            // Message.warning('请求已重置')
            return {
                message: false
            }
        }
        return false
    },
}

export default http;