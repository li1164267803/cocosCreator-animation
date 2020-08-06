// Learn cc.Class:
cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label,
        info: null
    },

    // 代码可以参考官方例子的ListView  assets/cases/02_ui/05_listView
    onLoad() {
        this.node.on('touchend', function () {
            console.log(this.info);
        }, this);
    },
    initItem: function (text, info) {
        console.log("onLoad -> text", info)
        this.text.string = text;
        this.info = info;
    },
    updateItem: function (text) { // 更新数据
        this.text.string = text;
        // this.label.textKey = i18n.t("cases/02_ui/05_scrollView/Item.js.1") + this.tmplID + ' Item#' + this.itemID;
    },
    start() {

    },

    // update (dt) {},
});
