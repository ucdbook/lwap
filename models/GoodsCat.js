const Sequelize= require('sequelize');

var seq = require('./connect.js').seq;

var GoodsCat = seq.define('xcxmall_goods_cat', {
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
  store_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "商店id"
  },
  cat_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "类目id"
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

module.exports = GoodsCat;