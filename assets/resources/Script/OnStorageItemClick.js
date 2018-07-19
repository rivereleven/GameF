// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { Singleton } from './GameController'
import { GameData } from './GameData.js'

cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: 20
    },
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        GameController:Singleton
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    callback(e){
        console.log(e.target)

        let canvas = cc.find("Canvas")

        let goodsIcon = canvas.getComponent("GameController").goodsIcon

        console.log(goodsIcon)

        let sellAlert = cc.find("Canvas/sell_alert");
        
        let sellAlertIcon = cc.find("alert/goods_icon", sellAlert);

        let payoff = cc.find("payoff", sellAlert);

        let sellCountLabel = cc.find("alert/count", sellAlert);

        let goodsSpriteFrame = this.node.children[0].getComponent(cc.Sprite).spriteFrame

        let goodsName = GameData.getInstance().getValueToKey(goodsSpriteFrame)

        console.log("goodsName",goodsName)

        let sellAlertLabel = sellAlertIcon.children[0]
        let sellAlertCount = Singleton.getInstance().buyGoodsPrice[goodsName][1]
        console.log(Singleton.getInstance().goodsPrice)
        let goodsPrice = Singleton.getInstance().goodsPrice
        // 图标
        sellAlertIcon.getComponent(cc.Sprite).spriteFrame = goodsSpriteFrame
        // 名字
        sellAlertLabel.getComponent(cc.Label).string = this.node.children[1].getComponent(cc.Label).string
        // 数量
        sellCountLabel.getComponent(cc.Label).string = sellAlertCount
        // 盈利
        let buyPrice = Singleton.getInstance().buyGoodsPrice[goodsName][0]
        let sellPrice = Singleton.getInstance().goodsPrice[goodsName]
        payoff.getComponent(cc.Label).string = (sellPrice - buyPrice) * sellAlertCount
        console.log(this.sellSlider)
        sellAlert.active = true
    }
    // update (dt) {},
});
