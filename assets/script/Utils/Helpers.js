// CC_JSB 网页预览
// https://docs.cocos.com/creator/api/zh/modules/GLOBAL-MACROS.html?h=cc_jsb
if (CC_JSB && cc.runtime) {
    // fix cocos-creator/fireball#3578
    cc.LoaderLayer.setUseDefaultSource(false);
    cc.Dialog.setUseDefaultSource(false);
}

// Returns a random integer between min (included) and max (excluded)
// 返回介于min（included）和max（excluded）之间的随机整数
function getRandomInt(min, max) { // 获取一个随机整数
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    getRandomInt: getRandomInt
};