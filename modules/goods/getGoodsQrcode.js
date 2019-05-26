const express = require('express');
const router = express.Router();
const request = require('request');
const GoodsQrcode = require('../../models/GoodsQrcode');
const {getStoreId} = require('../../common/getStoreId');

router.post('/linmedia/wap/getStoreGoodsQrcode', function(req, res) {
    const storeId = getStoreId(req.body.sd) || 2;
    if(!storeId) {
        res.json({
			result: 'error',
			data: '',
			msg: '请补充完整参数'
		});
    }
    const sql = {
        order:[['id', 'ASC']],
        where:{store_id: storeId}
    };
    GoodsQrcode.findAll(sql).then(function(rows){
        res.json({
            result: 'success',
            data: rows,
            msg: '查询成功'
        });
    })
});

module.exports = router;