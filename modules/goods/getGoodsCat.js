const express = require('express');
const router = express.Router();
const request = require('request');
const GoodsCat = require('../../models/GoodsCat');
const {getStoreId} = require('../../common/getStoreId');

router.post('/linmedia/wap/getGoodsCat', function(req, res) {
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
    GoodsCat.findAll(sql).then(function(rows){
        res.json({
            result: 'success',
            data: rows,
            msg: '查询成功'
        });
    })
});

module.exports = router;