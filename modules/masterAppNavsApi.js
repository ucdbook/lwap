var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const {masterAppNavsFile} = require('./utils');

router.post('/childApp/setMasterNavs', function(req, res) {
    try{
        let content = req.body.content || '[]';
        content = JSON.parse(content);
        fs.writeFileSync(masterAppNavsFile, JSON.stringify(content));
        res.json({
            code: 0,
            result: 'success',
            data: '',
            msg: '保存子应用成功'
        });
    }catch(err) {
        res.json({
            code: '-1',
            result: 'error',
            data: '',
            msg: '获取mock数据时报错:'+err
        });
    }

});

router.post('/childApp/getMasterNavs', function(req, res) {
    try{
        var content = parseInt(req.body.content) || '';
        data = fs.readFileSync(masterAppNavsFile, "utf-8");

        res.json({
            code: 0,
            result: 'success',
            data: JSON.parse(data || []),
            msg: '获取子应用成功'
        });
    }catch(err) {
        res.json({
            code: '-1',
            result: 'error',
            data: '',
            msg: '获取mock数据时报错:'+err
        });
    }

});

module.exports = router;