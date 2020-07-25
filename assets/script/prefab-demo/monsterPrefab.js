// 公共的方法
let Helpers = require('Helpers'); // 引入外部js
cc.Class({
    extends: cc.Component,

    properties: {
        spriteList: { // 需要替换的精灵图片
            type: [cc.SpriteFrame],
            default: []
        }
    },

    onLoad() {
        let randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        let sprite = this.getComponent(cc.Sprite);
        // spriteFrame 的S一定不能大写 SpriteFrame是错误的
        sprite.spriteFrame = this.spriteList[randomIdx];
    },
});