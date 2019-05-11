const Sequelize= require('sequelize');

var seq = require('./connect.js').seq;

var GoodPic = seq.define('xcxmall_goods_pic', {
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
    comment: "父Id"
  },
  pic_url: {
    type: Sequelize.TEXT,
    allowNull:true,
    comment: "car类别"
  },
  
  //框架自带
  createdAt: {
    field:"goods_id" ,
    type: Sequelize.INTEGER,
    allowNull:true
  },
  updatedAt:{
   field:"goods_id" ,
   type: Sequelize.INTEGER,
   allowNull:true
  }
  
},{
  freezeTableName: true,
  comment: "商品类目"
});

module.exports = GoodPic;