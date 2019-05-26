var express = require('express');
var router = express.Router();
const {getStoreId} = require('../../common/getStoreId');

const Goods = require('../../models/Goods');

// 查询商品
router.post('/linmedia/wap/getGoods', function(req, res) {
	const limit = parseInt(req.body.pageSize) || 10000;
	const offset = parseInt(req.body.skipCount) || 0;
	const storeId = getStoreId(req.body.sd) || 2;
	const catId = parseInt(req.body.cd);
	const keyword = req.body.keyword;
	const sql = {
		limit:limit,
		offset:offset,
		order:[['id', 'DESC']],
		where:{status:1, store_id: storeId, is_delete: 0}//, 
	};
	if(keyword) {
		sql.where.name = {$like:('%'+keyword+'%')};
	}
	if(catId) {
		sql.where.cat_id = catId;
	}
	try{
        Goods.findAll(sql).then(function(rows){
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