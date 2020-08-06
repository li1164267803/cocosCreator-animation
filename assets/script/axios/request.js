
import axios from 'axios'
// import { Message } from 'element-ui'
// http://docs.cocos.com/creator/api/zh/modules/GLOBAL-MACROS.html#ccdebug   环境判断
if (CC_DEBUG) window.BASE_API = 'https://live-test.puxinwangxiao.com'; // 本地
if (CC_BUILD && CC_DEBUG) window.BASE_API = 'https://live-test.puxinwangxiao.com'; // 测试
if (CC_BUILD && !CC_DEBUG) window.BASE_API = 'https://live.puxinwangxiao.com'; // 生产

const service = axios.create({
    baseURL: window.BASE_API, // api的base_url
    timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(config => {
    config.method === 'post'
        ? config.data = { ...config.data }
        : config.params = { ...config.params }
    config.headers['Content-Type'] = 'application/json'

    return config
}, error => { // 请求错误处理
    Promise.reject(error)
})

/** **** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => { // 成功请求到数据
        // 这里根据后端提供的数据进行对应的处理
        if (response.data.rlt == true) {
            return response.data.data
        }
        if (!response.data.rlt) {
            //   Message({ message: response.data.message, type: 'error' })
            return Promise.reject(response.data)
        }
    },
    error => { // 响应错误处理
        return Promise.reject(error)
    }
)
function getAction(url, params) {
    return service({
        url: url,
        method: 'get',
        params: params
    })
}

function postAction(url, data) {
    return service({
        url: url,
        method: 'post',
        data: data
    })
}


module.exports = {
    getAction: getAction,
    postAction: postAction,
};