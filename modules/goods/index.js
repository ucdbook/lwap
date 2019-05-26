module.exports=function(app){
    app.use('/',require('./getGoods'));
    app.use('/',require('./getGoodsPic'));
    app.use('/',require('./getGoodsCat'));
    app.use('/',require('./getGoodsQrcode'));
 }