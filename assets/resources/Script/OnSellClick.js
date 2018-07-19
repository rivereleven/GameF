// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import {Singleton} from './GameController.js'
import {GameData} from './GameData.js'
import {Close} from './OnCloseClick.js'
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
        count:cc.Label,
        sellIcon:cc.Sprite,
        closeClick:Close
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    callback(){
        let SingletonInstace = Singleton.getInstance()
        let DataInstance = GameData.getInstance()
        let count = this.count.string
        let goodsIcon = SingletonInstace.goodsResource
        let sellIcon = this.sellIcon.spriteFrame
        let goodsName = DataInstance.getValueToKey(sellIcon)
        let sellPrice = SingletonInstace.goodsPrice[goodsName]
        let buyPrice = SingletonInstace.buyGoodsPrice[goodsName][0]
        let storageCount = SingletonInstace.buyGoodsPrice[goodsName][1]
        let payoff = (sellPrice-buyPrice)*count
        SingletonInstace.cashValue += sellPrice*count
        SingletonInstace.totalMoney += payoff
        SingletonInstace.buyGoodsPrice[goodsName][1] -= count
        this.closeClick.sellSlider.progress = 1
        this.closeClick.sellProgres.progress = 1
        this.node.parent.parent.active = false
        
    }

    // update (dt) {},
});
