var express = require('express');
var router = express.Router();

const Goods = require('../../models/Goods');

// 查询商品
router.post('/linmedia/wap/getGoods', function(req, res) {
	try{
        Goods.findAll({where:{status:1}}).then(function(rows){
            res.json({
                result: 'success',
                data: rows,
                msg: '查询成功'
            });
        })
	}catch(e) {
		res.json({
			result: 'error',
			data: '',
			msg: '查询失败'
		});
	}	
});



module.exports = router;