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
import {Close} from './OnCloseClick'
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
        buyCount:cc.Label,
        goodsIcon:Singleton,
        buyIcon:cc.Sprite,
        storageNode:cc.Node,
        storageItem:cc.Prefab,
        closeClick:Close
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    callback(){
        
        let count = this.buyCount.string
        let goodsIcon = this.goodsIcon.goodsIcon
        let buyIcon = this.buyIcon.spriteFrame
        let storageItem = this.storageItem
        let buygoodsName = GameData.getInstance().getValueToKey(buyIcon)
        let goodsPrice = Singleton.getInstance().goodsPrice[buygoodsName]

        if(Singleton.getInstance().buyGoodsPrice[buygoodsName][1] === 0){
            let storage = cc.instantiate(storageItem)
            storage.children[0].getComponent(cc.Sprite).spriteFrame = buyIcon
            storage.children[1].getComponent(cc.Label).string = Singleton.getInstance().goodsResource[GameData.getInstance().getValueToKey(buyIcon)][1]
            storage.children[2].getComponent(cc.Label).string = count
            storage.children[3].getComponent(cc.Label).string = goodsPrice
            Singleton.getInstance().cashValue = Singleton.getInstance().cashValue - count * goodsPrice
            Singleton.getInstance().buyGoodsPrice[buygoodsName][0] = goodsPrice
            Singleton.getInstance().buyGoodsPrice[buygoodsName][1] += count
            storage.parent = this.storageNode
        }
        else{
            let nowCount = count
            let nowPrice = goodsPrice
            let beforeCount = Singleton.getInstance().buyGoodsPrice[buygoodsName][1]
            let beforePrice = Singleton.getInstance().buyGoodsPrice[buygoodsName][0]

            let cost = (nowCount*nowPrice + beforeCount*beforePrice)/(nowCount + beforeCount)

            Singleton.getInstance().buyGoodsPrice[buygoodsName] = [cost,beforeCount+nowCount]
            Singleton.getInstance().cashValue = Singleton.getInstance().cashValue - nowCount * goodsPrice

        }


        this.closeClick.sellSlider.progress = 1
        this.closeClick.sellProgres.progress = 1
        this.node.parent.parent.active = false
        
    }

    // update (dt) {},
});
