cc.Class({
    extends: cc.Component,

    properties: {
        monster: cc.Animation
    },


    onLoad() {
        // 使用事件名来注册
        this.node.on('touchstart', function (event) {
            if (this.seq != null) this.monster.node.stopAction(this.seq);
            let pos = event.getLocation(); // 获取的是世界的坐标
            // 世界坐标系，转换为本地坐标系
            let end = pos = this.node.convertToNodeSpaceAR(pos);
            let start = this.monster.node.getPosition();
            // let rot = this.getAngle(start, pos)
            // this.monster.angle = -rot;
            let index = this.getDirection(start, pos); // 获取返回的下标
            let arr = this.monster.getClips(); // 获取所有的 Animation
            if (this.oldIndex != index) this.monster.play(arr[index].name); // 根据下标 播放对应的 Animation
            this.moveToPoint(start, end);
            this.oldIndex = index;
        }, this);
    },
    testMove() {
        let moveTo1 = cc.moveTo(1, cc.v2(183, 110));
        let moveTo2 = cc.moveTo(1, cc.v2(-84, 79));
        let moveTo3 = cc.moveTo(1, 82, -184);

        // 放大缩小
        let scaleTo1 = cc.scaleTo(0.5, 2, 2);
        let scaleTo2 = cc.scaleTo(0.5, 1, 1);
        let scaleSeq = cc.sequence(scaleTo1, scaleTo2);
        // 颜色得变化
        let color1 = cc.tintTo(0.5, new cc.Color(235, 91, 91));
        let color2 = cc.tintTo(0.5, new cc.Color(255, 255, 255));
        let colorSeq = cc.sequence(color1, color2);
        let sp = cc.spawn(scaleSeq, moveTo1, colorSeq); // 同步执行
        let arr = this.monster.getClips(); // 获取所有的 Animation

        // callBack
        let callBack1 = cc.callFunc(() => {
            let end = { x: 183, y: 110 }
            let start = this.monster.node.getPosition();
            let index = this.getDirection(start, end); // 获取角度的下标
            this.monster.play(arr[index].name); // 根据下标 播放对应的 Animation
        })
        let callBack2 = cc.callFunc(() => {
            let end = { x: -84, y: 79 }
            let start = this.monster.node.getPosition();
            let index = this.getDirection(start, end); // 获取角度的下标
            this.monster.play(arr[index].name); // 根据下标 播放对应的 Animation
        })
        let callBack3 = cc.callFunc(() => {
            let end = { x: 82, y: -184 }
            let start = this.monster.node.getPosition();
            let index = this.getDirection(start, end); // 获取角度的下标
            this.monster.play(arr[index].name); // 根据下标 播放对应的 Animation
        })

        let seq = cc.sequence(callBack1, sp, callBack2, moveTo2, callBack3, moveTo3); // 顺序执行
        this.monster.node.runAction(seq);

    },
    moveToPoint(start, end) { // 移动速度
        if (this.moveAction != null) this.monster.node.stopAction(this.moveAction);
        // t = v/s;
        // 时间 = 距离/速度
        let dis = this.getDistance(start, end);
        let t = dis / 100;
        // dis = start.sub(end).mag() // 系统提供得计算两点得方法  这个方法未公开，随时可能改
        // 创建一个移动动作
        this.moveAction = cc.moveTo(t, end);
        // 执行动作
        this.monster.node.runAction(this.moveAction);
    },
    moveToCapy(pos) {
        let end = this.node.convertToNodeSpaceAR(pos);
        // 时间 = 距离/速度
        let dis = this.getDistance(this.monster.node.getPosition(), end);
        let t = dis / 100;
        let moveTo = cc.moveTo(t, cc.v2(end.x, end.y));
        let arr = this.monster.getClips(); // 获取所有的 Animation
        // callBack
        let callBack = cc.callFunc(() => {
            let start = this.monster.node.getPosition();
            let index = this.getDirection(start, end); // 获取角度的下标
            this.monster.play(arr[index].name); // 根据下标 播放对应的 Animation
        })
        return [callBack, moveTo]; // callBack 设置人物的转向 moveTo 去到的地方
    },
    goToMonsterArr() { // 怪物走的路线
        if (this.moveAction != null) this.monster.node.stopAction(this.moveAction);
        this.monster.node.setPosition(-226, -228);
        let arr = [
            { x: 410, y: 152, z: 0 },
            { x: 414, y: 245, z: 0 },
            { x: 655, y: 244, z: 0 },
            { x: 650, y: 327, z: 0 },
            { x: 489, y: 324, z: 0 },
            { x: 495, y: 409, z: 0 },
            { x: 764, y: 407, z: 0 },
            { x: 759, y: 320, z: 0 },
            { x: 898, y: 328, z: 0 },
            { x: 895, y: 481, z: 0 },
        ];
        let brr = [];
        arr.forEach(v => brr.push(...this.moveToCapy(v)));
        this.seq = cc.sequence(...brr); // 顺序执行
        this.monster.node.runAction(this.seq);
    },
    getDirection(start, end) { // 获取前进的方向
        let rot = this.getAngle(start, end)
        if (rot > -45 && rot <= 45) {
            return 0;
        } else if (rot > 45 && rot <= 135) {
            return 3;
        } else if (rot > 135 && rot <= 225) {
            return 1;
        } else {
            return 2;
        }
    },
    getDistance: function (start, end) { // 两点之间得距离
        let pos = cc.v2(start.x - end.x, start.y - end.y);
        let dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        return dis;
    },
    getAngle(start, end) { // 获取两点之间得角度
        //两点的x、y值
        var x = end.x - start.x;
        var y = end.y - start.y;
        var hypotenuse = Math.sqrt(x * x + y * y);
        //斜边长度
        var cos = x / hypotenuse;
        var radian = Math.acos(cos);
        //求出弧度
        var angle = 180 / (Math.PI / radian);
        //用弧度算出角度
        if (y < 0) {
            angle = 0 - angle;
        } else if (y == 0 && x < 0) {
            angle = 180;
        }
        return 90 - angle;
    },
    changePage() {
        cc.director.loadScene("ui");
    },
    start() { },

    // update (dt) {},
});