const Sequelize= require('sequelize');

var seq = require('./connect.js').seq;

var GoodsQrcode = seq.define('xcxmall_goods_qrcode', {
  id: {
    autoIncrement:true,
    type: Sequelize.INTEGER,
    allowNull:false,
    primaryKey: true,
    comment: "编码 自增值且是主键"
  },
  goods_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "商品id"
  },
  store_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "商店Id"
  },
  mp_qrcode: {
    type: Sequelize.TEXT,
    allowNull:true,
    comment: "car类别"
  },
  
  //框架自带
  createdAt: {
    field:"add_time" ,
    type: Sequelize.DATE,
    allowNull:true
  },
  updatedAt:{
   field:"add_time" ,
   type: Sequelize.DATE,
   allowNull:true
  }
  
},{
  freezeTableName: true,
  comment: "商品类目"
});

module.exports = GoodsQrcode;