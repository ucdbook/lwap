const goods = require('./goods');
const qrcode = require('./qrcode');
const cat = require('./cat');

module.exports = function (app) {
    goods(app);
    qrcode(app);
    cat(app);
}