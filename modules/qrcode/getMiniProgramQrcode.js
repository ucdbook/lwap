const express = require('express');
const router = express.Router();
const request = require('request');
const WechatApp = require('../../models/WechatApp');

const getWxAccessToken = function(options) {
    return new Promise( function(resolve, reject) {
        request({
            url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${options.appid}&secret=${options.secret}`,
            method: "GET",
            json: true,
            //encoding: 'base64',
            //headers: {
            //    "content-type": "application/json",
            //},
            //form: JSON.stringify({path:''})
        }, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                console.log(44444444444, body);
                resolve(body);
            }
        });
    })
}

const getStoreApp = function(storeId) {
    return new Promise( function(resolve, reject) {
        const sql = {
            where:{id:storeId}
        };
        WechatApp.findAll(sql).then(function(rows){
            if(!(rows && rows.length)) {
                reject();
            }
            resolve({
                appid: rows[0].app_id,
                secret: rows[0].app_secret
            })
        }, function() {
            reject();
        })
    })
}

router.post('/linmedia/wap/getMPQrcode', function(req, res) {
    const goodsId = req.body.gd || '';
    const storeId = req.body.sd || '';
    if(!goodsId || !storeId) {
        res.json({
			result: 'error',
			data: '',
			msg: '请补充完整参数'
        });
        return;
    }
    getStoreApp(storeId).then(options => {
        getWxAccessToken(options).then((options) => {
            const accessToken = options.access_token;
            request({
                url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + accessToken,
                method: "POST",
                json: true,
                encoding: 'base64',
                headers: {
                    "content-type": "application/json",
                },
                form: JSON.stringify({path:'/pages/goods/goods?id=' + goodsId})
            }, function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    res.json({
                        result: 'success',
                        data: {
                            url: 'data:image/png;base64,' + body
                        },
                        msg: '查询成功'
                    });
                }
                else {
                    res.json({
                        result: 'error',
                        data: '',
                        msg: '查询失败'
                    });
                }
            });
        })
    }, err => {
        res.json({
			result: 'error',
			data: '',
			msg: '没有查找到此店面'
		});
    });
    
});

module.exports = router;