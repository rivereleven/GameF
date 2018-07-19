// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { Singleton } from './GameController.js'
import { GameData } from './GameData.js'

cc.Class({
    extends: cc.Component,

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
        progress:cc.ProgressBar,
        count:cc.Label,
        payoff:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    callback(){
        // let sliderProgress = this.node.getComponent(cc.Slider).progress
        // let progressBarProgress = this.progress.getComponent(cc.ProgressBar).progress
        let count
        let goodsIcon = this.node.parent.children[7].getComponent(cc.Sprite).spriteFrame
        console.log(Singleton.getInstance().goodsResource)
        console.log(goodsIcon)
        let goodsName = GameData.getInstance().getValueToKey(goodsIcon)
        count = Singleton.getInstance().buyGoodsPrice[goodsName][1]
        this.progress.getComponent(cc.ProgressBar).progress = this.node.getComponent(cc.Slider).progress
        this.count.string = Math.floor(count * this.progress.getComponent(cc.ProgressBar).progress)
        let buyPrice = Singleton.getInstance().buyGoodsPrice[goodsName][0]
        let sellPrice = Singleton.getInstance().goodsPrice[goodsName]
        this.payoff.string = (sellPrice - buyPrice) * this.count.string
    }

    // update (dt) {},
});
