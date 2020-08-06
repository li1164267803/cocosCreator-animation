cc.Class({
    extends: cc.Component,

    properties: {
        root: {
            type: cc.Node,
            default: null
        },
        prefab: {
            type: cc.Prefab,
            default: null
        },
        canvas: {
            type: cc.Canvas,
            default: null
        },
        numnerToSpawn: 0, // 生成的数量
        spawnInterval: 0, // 间隔时间
    },

    onLoad() {
        this.randomRange = cc.v2(300, 200); // 随机显示的范围
        this.spawnCount = 0;
        // 调度一个自定义的回调函数。如果回调函数已调度，那么将不会重复调度它，只会更新时间间隔参数。
        // https://docs.cocos.com/creator/api/zh/classes/Mask.html#unschedule
        // this.addSpawn 为callBack
        // this.spawnInterval 为执行间隔时间 秒
        this.schedule(this.addSpawn, this.spawnInterval);
    },
    addSpawn() {
        // 已渲染速 > 生成总数量停止
        if (this.spawnCount >= this.numnerToSpawn) return this.clearRepeater();
        let monster = cc.instantiate(this.prefab); // 创建一个节点
        monster.parent = this.root; // 挂载在root跟节点上 或使用 this.canvas.node.addChild(monster);
        monster.position = this.getRandomPosition(); // 设置位置信息
        this.spawnCount++;
    },
    getRandomPosition() { // 获取随机的位置坐标
        return cc.v2((Math.random() - 0.5) * 2 * this.randomRange.x, (Math.random() - 0.5) * 2 * this.randomRange.y)
    },
    clearRepeater() {
        this.unschedule(this.addSpawn); // unschedule 取消调度一个自定义的回调函数。
    },
    start() {},

    // update (dt) {},
});