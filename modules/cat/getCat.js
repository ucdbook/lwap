const express = require('express');
const router = express.Router();
const request = require('request');
const Cat = require('../../models/Cat');

router.post('/linmedia/wap/getCat', function(req, res) {
    const storeId = req.body.sd || '';
    if(!storeId) {
        res.json({
			result: 'error',
			data: '',
			msg: '请补充完整参数'
		});
    }
    const sql = {
        order:[['sort', 'ASC']],
		where:{store_id: storeId}
    };
    Cat.findAll(sql).then(function(rows){
        res.json({
            result: 'success',
            data: rows,
            msg: '查询成功'
        });
    })
});

module.exports = router;