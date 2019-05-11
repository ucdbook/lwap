const Sequelize= require('sequelize');

var seq = require('./connect.js').seq;

var WechatApp = seq.define('xcxmall_wechat_app', {
  id: {
    autoIncrement:true,
    type: Sequelize.INTEGER,
    allowNull:false,
    primaryKey: true,
    comment: "编码 自增值且是主键"
  },
  name:{
    type: Sequelize.STRING,
    allowNull:true,
    comment: "名称"
  },
  app_id:{
    type: Sequelize.STRING,
    allowNull:true,
    comment: "小程序appid"
  },
  app_secret:{
    type: Sequelize.STRING,
    allowNull:true,
    comment: "小程序密钥"
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
  comment: "商城店面小程序账户"
});

module.exports = WechatApp;