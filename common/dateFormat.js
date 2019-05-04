const Date = require('./index').Date;
/**
 * 将Sequelize query查询的数组的时间进行转化
 * arr 為還需要另外格式化的字段名稱
 */

function dateFormat(data, arr = []) {
    var formatArr = ['createdAt', 'updatedAt'].concat(arr);
    var result = [];
    data.forEach(function (item) {
        formatArr.forEach(function (formatItem) {
            if(item[formatItem]){
                item.setDataValue(formatItem, new Date(item[formatItem]).Format('yyyy-MM-dd hh:mm:ss'));
            }
        })
    })
}

exports.dateFormat = dateFormat;