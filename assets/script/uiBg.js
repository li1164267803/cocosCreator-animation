cc.Class({
    extends: cc.Component,

    properties: {
        login_bg: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log(this.login_bg, 'this.login_bg');
        this.login_bg = this.login_bg.getComponent(cc.Animation); // 获取动画
        this.login_bg.node.active = false; // 通过当前Animation 获取node，设置显示隐藏
        // console.log("onLoad ->    this.login_bg", this.login_bg)
        this.login_bg.playEnd = () => { // 在动画上设置关键帧函数回调
            this.login_bg.node.active = false; // 关闭弹框 或者可以在某一帧的时候，播放音乐
        }
    },

    start() {},
    onClickScale(terget, type) {
        if (type == 1) {
            console.log('缩放显示');
            this.login_bg.node.active = true;
            this.login_bg.play("Scale ToShow"); // Scale ToShow 为动画的名字
            // https://docs.cocos.com/creator/api/zh/classes/Animation.html#play
            // https://docs.cocos.com/creator/manual/zh/animation/scripting-animation.html
        } else {
            this.login_bg.play("Scale ToHide");
            console.log(this.login_bg)
        }
    },
    onJumpScene() {
        cc.director.loadScene("moveTo");
    }
    // update (dt) {},
});