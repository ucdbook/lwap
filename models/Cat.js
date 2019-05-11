const Sequelize= require('sequelize');

var seq = require('./connect.js').seq;

var Cat = seq.define('xcxmall_cat', {
  id: {
    autoIncrement:true,
    type: Sequelize.INTEGER,
    allowNull:false,
    primaryKey: true,
    comment: "编码 自增值且是主键"
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "父Id"
  },
  name:{
    type: Sequelize.STRING,
    allowNull:true,
    comment: "名称"
  },
  pic_url: {
    type: Sequelize.TEXT,
    allowNull:true,
    comment: "car类别"
  },
  sort: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "排序"
  },
  //框架自带
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
  comment: "商品类目"
});

module.exports = Cat;