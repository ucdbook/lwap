const express = require('express');
const router = express.Router();
const request = require('request');
const WechatApp = require('../../models/WechatApp');
const {getStoreId} = require('../../common/getStoreId');
const GoodsQrcode = require('../../models/GoodsQrcode');
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

//保存二维码
const saveMpQrcode = function(store_id, goods_id, picData) {
    GoodsQrcode.findAll({
        where:{goods_id: goods_id}
    }).then(function(rows){
        if(rows && rows.length) {
            GoodsQrcode.update({
                store_id:store_id,
                mp_qrcode: picData,
            },{where:{goods_id:goods_id}}).then(function(rows){
                
            })
            return;
        }
        GoodsQrcode.create({
            store_id:store_id,
            goods_id: goods_id,
            mp_qrcode: picData,
        }).then(function(rows){
            
        })
    })
}

router.post('/linmedia/wap/getMPQrcode', function(req, res) {
    const goodsId = req.body.gd || '';
    const storeId = getStoreId(req.body.sd) || '';
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
                    const picData = 'data:image/png;base64,' + body;
                    res.json({
                        result: 'success',
                        data: {
                            url: picData
                        },
                        msg: '查询成功'
                    });

                    saveMpQrcode(storeId, goodsId, picData)
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