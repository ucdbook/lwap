const Sequelize= require('sequelize');


var seq = require('./connect.js').seq;

var Goods = seq.define('xcxmall_goods', {
  id: {
    autoIncrement:true,
    type: Sequelize.INTEGER,
    allowNull:false,
    primaryKey: true,
    comment: "编码 自增值且是主键"
  },
  store_id: {
    type: Sequelize.INTEGER,
    allowNull:true,
    comment: "关联store表主键"
  },
  name:{
    type: Sequelize.STRING,
    allowNull:true,
    comment: "名称"
  },
  /*price:{
    type: Sequelize.DECIMAL,
    allowNull:true,
    comment: "售价"
  },
  original_price:{
    type: Sequelize.DECIMAL,
    allowNull:true,
    comment: "原价（只做显示用）"
  },
  detail: {
    type: Sequelize.TEXT,
    allowNull:false,
    comment: "商品详情，图文"
  },
  cat_id: {
    type: Sequelize.INTEGER,
    allowNull:true,
    comment: "商品类别"
  },
  status:{
    type: Sequelize.SMALLINT,
    allowNull:true,
    comment: "上架状态：0=下架，1=上架"
  },
  addtime:{
    type: Sequelize.INTEGER,
    allowNull:true,
    comment: "创建时间"
  },
  is_delete:{
    type: Sequelize.INTEGER,
    //type: Sequelize.SMALLINT,
    allowNull:true,
    comment: "是否删除"
  },
  attr:{
    type: Sequelize.TEXT,
    allowNull:true,
    comment: "规格的库存及价格"
  },
  service:{
    type: Sequelize.CHAR(1),
    allowNull:true,
    comment: "商品服务选项"
  },*/

  //dddd
  createdAt: {
    field:"addtime" ,
    type: Sequelize.DATE,
    allowNull:true
  },
  updatedAt:{
   field:"addtime" ,
   type: Sequelize.DATE,
   allowNull:true
  }
  
},{
  freezeTableName: true,
  comment: "商品列表"
});

module.exports = Goods;