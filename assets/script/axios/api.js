let request = require('request');

const queryTaskStatus = (data) => request.postAction('/task/queryTaskStatus', data) // 互动看板换一批学员
const serverConnect = (params) => getAction('/server/connect', params) // 建立SSE链接
const disconnect = (params) => getAction('/server/disconnect', params) // 关闭SSE链接

module.exports = {
    queryTaskStatus: queryTaskStatus,
};