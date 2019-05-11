module.exports=function(app){
    app.use('/',require('./getGoods'));
    app.use('/',require('./getGoodsPic'));
 }