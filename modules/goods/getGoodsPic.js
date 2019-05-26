const express = require('express');
const router = express.Router();
const request = require('request');
const GoodsPic = require('../../models/GoodsPic');
const {getStoreId} = require('../../common/getStoreId');

router.post('/linmedia/wap/getGoodsPic', function(req, res) {
    const goodsId = req.body.gd || '';
    if(!goodsId) {
        res.json({
			result: 'error',
			data: '',
			msg: '请补充完整参数'
		});
    }
    const sql = {
        order:[['id', 'ASC']],
		where:{goods_id: goodsId}
    };
    GoodsPic.findAll(sql).then(function(rows){
        res.json({
            result: 'success',
            data: rows,
            msg: '查询成功'
        });
    })
});

router.post('/linmedia/wap/getAllGoodsPic', function(req, res) {
    let goodsId = req.body.gd || '';
    if(!goodsId) {
        res.json({
			result: 'error',
			data: '',
			msg: '请补充完整参数'
		});
    }
    const sql = {
		where:{goods_id: {
            in: [goodsId.split(',')]
        }}
    };
    GoodsPic.findAll(sql).then(function(rows){
        res.json({
            result: 'success',
            data: rows,
            msg: '查询成功'
        });
    })
});

module.exports = router;