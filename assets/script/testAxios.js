const api = require('api');
// import { Message } from 'element-ui'

cc.Class({
    extends: cc.Component,

    properties: {
        listPrefab: cc.Prefab,
        label: cc.Prefab,
        m_layout: cc.Node
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
    },

    onLoad() {
      
     },
    textAxios() {
        // let div = document.createElement('div');
        // div.innerHTML = '78797979';
        // document.body.appendChild(div)
        // console.log("textAxios -> div", div)

        // let link = document.createElement('link');
        // link.rel = 'stylesheet';
        // link.href = 'https://unpkg.com/element-ui/lib/theme-chalk/index.css';
        // document.body.appendChild(link)
        // console.log("textAxios -> link", link)

        // let script = document.createElement('script');
        // script.src = 'https://unpkg.com/element-ui/lib/index.js';
        // document.body.appendChild(script)
        // console.log("textAxios -> script", script)

        // setTimeout(() => {
        //     Message({
        //         showClose: true,
        //         message: '错了哦，这是一条错误消息',
        //         type: 'error'
        //     });
        //     Message.error('该运行设备不支持SSE链接')
        //     console.log('执行完毕', Message);
        // }, 3000);
        // 环境
        console.log(window.BASE_API);

        let data = { "chapterId": "209253061272838144", "classId": "209253545916276736", "taskType": 1 };
        api.queryTaskStatus(data).then((res) => {
            console.log(res)
        })
    },
    onSEE() {
        if ('EventSource' in window) {
            console.log('EventSource' in window);
            let url = `${window.BASE_API}/server/connect?classId=123&chapterId=123`
            this.source = new EventSource(url, { withCredentials: true })
            // eventSource实例的readyState属性，表明连接的当前状态。该属性只读，可以取以下值。
            // 0：相当于常量eventSource.CONNECTING，表示连接还未建立，或者断线正在重连。
            // 1：相当于常量eventSource.OPEN，表示连接已经建立，可以接受数据。
            // 2：相当于常量eventSource.CLOSED，表示连接已断，且不会重连。
            this.source.onopen = function (event) {
                console.log('建立SSE', event);
            }
            this.source.onmessage = function (event) {
                console.log(event.data);
                if (!/^'success'$|^"success"$|^success$/.test(event.data)) {
                    const res = JSON.parse(JSON.parse(event.data))
                    console.log("this.source.onmessage -> res", res)
                    // this.text.string = res.
                }
            }
            this.source.onerror = function (error) {
                // Message.error('该运行设备不支持SSE链接')
                console.error('通信错误', error)
            }
        } else {
            console.error('是否支持SSE：', 'EventSource' in window)
        }
    },
    onasd() {
        console.log(this.m_layout);
        let arr = [
            {
                id: 123,
                value: '阿松大'
            }, {
                id: 46,
                value: '同仁堂'
            }, {
                id: 897,
                value: '试得'
            }, {
                id: 20,
                value: 'as'
            }
        ];
        arr.forEach(v => {
            // item = cc.instantiate(this.listPrefab);

            item = cc.instantiate(this.label);
            item.getComponent('list-box-prefab').initItem(v.value, v);
            this.m_layout.addChild(item);

            // item.y += ofset
            // ofset += 30
            // let pos = this.m_airPlane.node.getPosition();
            // pos.y += 116;
            // bullteNode.setPosition(pos);
            // let js = bullteNode.getComponent('Bullet');
            // js.init();
            // js.setSecondPos(cc.v2(pos.x + ofset, pos.y + 80));
        });



    },
    start() {

    },

    // update (dt) {},
});
