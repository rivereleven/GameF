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

        let canvas = cc.find("Canvas")

        let goodsIcon = canvas.getComponent("GameController").goodsIcon

        console.log(goodsIcon)

        let buyAlert = cc.find("Canvas/buy_alert");
        
        let buyAlertIcon = cc.find("alert/goods_icon", buyAlert);

        let buyCountLabel = cc.find("alert/count", buyAlert);

        let goodsSpriteFrame = this.node.children[0].getComponent(cc.Sprite).spriteFrame

        let goodsName = GameData.getInstance().getValueToKey(goodsSpriteFrame)

        console.log("goodsName",goodsName)

        let buyAlertLabel = buyAlertIcon.children[0]
        let buyAlertCount = Math.floor(Singleton.getInstance().cashValue / Singleton.getInstance().goodsPrice[goodsName])
        console.log(Singleton.getInstance().goodsPrice)
        let goodsPrice = Singleton.getInstance().goodsPrice
        // 图标
        buyAlertIcon.getComponent(cc.Sprite).spriteFrame = goodsSpriteFrame
        // 名字
        buyAlertLabel.getComponent(cc.Label).string = this.node.children[1].getComponent(cc.Label).string
        // 数量
        buyCountLabel.getComponent(cc.Label).string = buyAlertCount
        buyAlert.active = true
    }
    // update (dt) {},
});
