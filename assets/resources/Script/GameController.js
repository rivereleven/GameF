// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Singleton = cc.Class({
  extends: cc.Component,

  editor: {
    executionOrder: -2
  },
  ctor: function() {

    console.log("gameC")
    this.sys_tips = "单例模式成功";

    // 个人属性面板

    this.achivementValue = "白手起家";
    this.cashValue = 5000;
    this.totalMoney = 5000;
    this.monthValue = 0;
    this.ageValue = 20;
    cc.log("Shape"); // 实例化时，父构造函数会自动调用，

    // 商品资源
    // 因为生命周期不对  所以不能在这里引用goodsIcon
    // this.goodsResource = {
    //     "apple":self.goodsIcon[0],
    //     "bitcoin":self.goodsIcon[1],
    //     "domesticCar":self.goodsIcon[2],
    //     "geliening":self.goodsIcon[3],
    //     "house":self.goodsIcon[4],
    //     "importedCar":self.goodsIcon[5],
    //     "qiegao":self.goodsIcon[6],
    //     "shanzhaiPhone":self.goodsIcon[7],
    //     "whiteWine":self.goodsIcon[8],
    //     "xinpian":self.goodsIcon[9],
    // }

    // console.log(this.goodsIcon[0])

    this.goodsArray = [
      "apple",
      "bitcoin",
      "domesticCar",
      "geliening",
      "house",
      "importedCar",
      "qiegao",
      "shanzhaiPhone",
      "whiteWine",
      "xinpian"
    ];

    // 买入价
    this.buyGoodsPrice = {
        "apple":[0,0],
        "bitcoin":[0,0],
        "domesticCar":[0,0],
        "geliening":[0,0],
        "house":[0,0],
        "importedCar":[0,0],
        "qiegao":[0,0],
        "shanzhaiPhone":[0,0],
        "whiteWine":[0,0],
        "xinpian":[0,0]
    };

    // new Map([
    //   ["apple", [0, 0]],
    //   ["bitcoin", [0, 0]],
    //   ["domesticCar", [0, 0]],
    //   ["geliening", [0, 0]],
    //   ["house", [0, 0]],
    //   ["importedCar", [0, 0]],
    //   ["qiegao", [0, 0]],
    //   ["shanzhaiPhone", [0, 0]],
    //   ["whiteWine", [0, 0]],
    //   ["xinpian", [0, 0]]
    // ]);

    // 实时价格
    this.goodsPrice = {
        "apple":0,
        "bitcoin":0,
        "domesticCar":0,
        "geliening":0,
        "house":0,
        "importedCar":0,
        "qiegao":0,
        "shanzhaiPhone":0,
        "whiteWine":0,
        "xinpian":0
    }
    // new Map([
    //   ["apple", 0],
    //   ["bitcoin", 0],
    //   ["domesticCar", 0],
    //   ["geliening", 0],
    //   ["house", 0],
    //   ["importedCar", 0],
    //   ["qiegao", 0],
    //   ["shanzhaiPhone", 0],
    //   ["whiteWine", 0],
    //   ["xinpian", 0]
    // ]);

    this.goodsResource = {}

    console.log("constructor");
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
    achivementLabel: cc.Label,
    cashLabel: cc.Label,
    totalMoneyLabel: cc.Label,
    monthLabel: cc.Label,
    ageLabel: cc.Label,
    goodsItem: cc.Prefab,
    storageItem: cc.Prefab,
    goodsIcon: [cc.SpriteFrame],
    marketContent: cc.Node,
    storageContent: cc.Node,
    buyAlert: cc.Node,
    sellAlert: cc.Node,
    game:cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.log("onload");

    try {
      wx.showShareMenu({
        withShareTicket: false
      });
    } catch (error) {}
  },

  start() {
    cc.log("start");
    // let node = cc.instantiate(this.goodsPrefab)
    // node.y = node.y - 46.9
    // node.children[0].getComponent(cc.Sprite).spriteFrame = this.goodsItems[5]
    // cc.log(node.children[0].getComponent(cc.Sprite).spriteFrame)
    // node.parent = this.goodsContent
    // node.setPosition(-89,node.y - 46.9);
    try {
      console.log(wx);
      wx.showShareMenu({
        withShareTicket: false
      });
    } catch (error) {
      console.log(error);
    }
    
    this.init()

  },
  //初始化数据
  init() {
    let self = this;
    let goodsResource = {
      apple: [this.goodsIcon[0], "苹果"],
      bitcoin: [this.goodsIcon[1], "比特币"],
      domesticCar: [this.goodsIcon[2], "国产汽车"],
      geliening: [this.goodsIcon[3], "格列宁"],
      house: [this.goodsIcon[4], "房地产"],
      importedCar: [this.goodsIcon[5], "进口汽车"],
      qiegao: [this.goodsIcon[6], "切糕"],
      shanzhaiPhone: [this.goodsIcon[7], "山寨肾X"],
      whiteWine: [this.goodsIcon[8], "红毛要酒"],
      xinpian: [this.goodsIcon[9], "国产芯片"]
    };

    Singleton.getInstance().goodsResource = goodsResource

    // player 属性
    this.achivementLabel.string = this.achivementValue;
    this.cashLabel.string = this.cashValue;
    this.totalMoneyLabel.string = this.totalMoney;
    // this.monthLabel.string = this.monthValue + "月";
    this.ageLabel.string = this.ageValue + "/70";

    // 时间自动加

    // this.monthLabel.schedule(function() {
    //   if (self.monthValue < 600) {
    //     self.monthValue += 1;
    //     Singleton.getInstance().monthValue = self.monthValue
    //     self.monthLabel.string = self.monthValue + "月";
    //   }
    // }, 0.5);

    // this.ageLabel.schedule(function() {
    //   if (self.ageValue < 70) {
    //     self.ageValue += 1;
    //     Singleton.getInstance().ageValue = self.ageValue
    //     self.ageLabel.string = self.ageValue + "/70";
    //   }
    // }, 6);


    //商品初始化
    // let goodsNode = this.goodsItem.children
    // goodsNode[0].getComponent(cc.Sprite).spriteFrame = this.goodsIcon[0]
    // goodsNode[1].getComponent(cc.Label).string = "apple"
    // goodsNode[2].getComponent(cc.Label).string = 0

    // let parent_node = this.goodsItem.parent
    // let copynode = cc.instantiate(this.goodsItem)
    // copynode.parent = parent_node

    // 取5到8个商品进行陈列
    let goodsCount = Math.floor(Math.random() * 3 + 5);
    console.log(goodsCount);
    // 随机取出   存放在goodsmarketArray
    let goodsMarketArray = this.getRandomArrayElements(
      this.goodsArray,
      goodsCount
    );
    console.log(goodsMarketArray);

    let parent_node = this.marketContent;
    for (let i = 0, len = goodsMarketArray.length; i < len; i++) {
      let goodsName = goodsMarketArray[i];
      console.log(typeof goodsName);
      console.log(goodsResource);
      let newNOde = cc.instantiate(this.goodsItem);
      let childrenNode = newNOde.children;
      let goodsPrice = this.randomValue(
        200,
        4000
      );
      childrenNode[0].getComponent(cc.Sprite).spriteFrame =
        goodsResource[goodsName][0];
      childrenNode[1].getComponent(cc.Label).string =
        goodsResource[goodsName][1];
      childrenNode[2].getComponent(cc.Label).string = goodsPrice
      Singleton.getInstance().goodsPrice[goodsName] = goodsPrice
      newNOde.parent = parent_node;
      // console.log(this.goodsPrice)
    }

    return goodsResource
  },

  randomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  getRandomArrayElements(arr, count) {
    let shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },

  update(dt) {
    if (this.ageValue >= 70) {
      // 游戏结束
    }
    

    // 个人属性面板的更新


    //  市场商品面板的更新

    // 仓库商品面板的更新
  },
//   getGoodsResource(){

//     // 组建性质的数据只能在当前组建获取
//     let goodsResource = {
//         "apple": [this.goodsIcon[0], "苹果"],
//         "bitcoin": [this.goodsIcon[1], "比特币"],
//         "domesticCar": [this.goodsIcon[2], "国产汽车"],
//         "geliening": [this.goodsIcon[3], "格列宁"],
//         "house": [this.goodsIcon[4], "房地产"],
//         "importedCar": [this.goodsIcon[5], "进口汽车"],
//         "qiegao": [this.goodsIcon[6], "切糕"],
//         "shanzhaiPhone": [this.goodsIcon[7], "山寨肾X"],
//         "whiteWine": [this.goodsIcon[8], "红毛要酒"],
//         "xinpian": [this.goodsIcon[9], "国产芯片"]
//       };
      
//       return goodsResource
//   }
});

Singleton._instance = null;
Singleton.getInstance = function() {
  if (!Singleton._instance) {
    Singleton._instance = new Singleton();
  }
  return Singleton._instance;
};

export default {
  Singleton
};
