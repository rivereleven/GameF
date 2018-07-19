// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { Singleton } from "./GameController.js";

var GameData = cc.Class({
  extends: cc.Component,

  editor: {
    executionOrder: -1
  },

  ctor: function() {
    console.log("gamed");
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
    GameController: Singleton
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    console.log("gamed_onload");
  },

  start() {
    // console.log(this.canvasNode)
  },


  getValueToKey(value) {
     
    let goodsResource = Singleton.getInstance().goodsResource




    for (let i in goodsResource) {
      console.log(typeof i);
      console.log(i);
      console.log(goodsResource[i][0]);
      console.log(value);
      if (goodsResource[i][0] === value) {
        return i;
      }
    }
  }

  // update (dt) {},
});

GameData._instance = null;
GameData.getInstance = function() {
  if (!GameData._instance) {
    GameData._instance = new GameData();
  }
  return GameData._instance;
};

export default {
  GameData
};
