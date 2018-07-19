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

        contentNode:cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        let buyPrice = Singleton.getInstance().buyGoodsPrice
        let storageItems = this.contentNode.children
        if(storageItems.length > 0){
            for(let i = 0,len = storageItems.length; i < len; i++){
                let icon = storageItems[i].children[0].getComponent(cc.Sprite).spriteFrame
                let name = GameData.getInstance().getValueToKey(icon)
                let count = buyPrice[name][1]
                storageItems[i].children[2].getComponent(cc.Label).string = count
                console.log(count)
                if(count<=0){
                    storageItems[i].destroy()
                }
    
            }
        }
    },
});
