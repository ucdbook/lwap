var express = require('express');
var request = require('request');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const {childAppFile} = require('./utils');

const componentMockApi = (req, res) => {
	try{
		let data = fs.readFileSync(childAppFile, "utf-8");
		data = JSON.parse(data || []);
		let referer = req.headers.referer;
		referer = referer.replace(req.headers.origin, '');
		let base = `/${referer}/`;
		base = base.replace(/\/+/g, '/');
		base = `/${base.split('/')[1]}/`;
		
		let appUrl = '';
		data.map(item => {
			if(item.base === base) {
				appUrl = item.entry;
			}
		})
		//const referer = req.query._r_referer || req.headers.referer;
		
		const mockUrl = `${appUrl}mock.js`;

		request.get({url:mockUrl}, function (error, response, body) {
			try{
				const mocks = eval(body);
				let key;
				const mockApiUrl = req.url.replace('/componentMock','');
				for(key in mocks) {
					let newKey = key.replace(/\s+/g, ' ');
					const reg = new RegExp('^(POST|GET) ' + mockApiUrl + '$', 'gim');
					if(newKey.match(reg)) {
						mocks[newKey](req, res);
					}
				}
			}catch(err) {
				res.json({
					code: '-1',
					result: 'error',
					data: '',
					msg: '获取mock数据时报错:'+err
				});
			}	
		});

	}catch(err) {
		res.json({
			code: '-1',
			result: 'error',
			data: '',
			msg: '获取mock数据时报错:'+err
		});
	}	
}

router.post('/componentMock/*', function(req, res) {
	componentMockApi(req, res);
});
router.get('/componentMock/*', function(req, res) {
	componentMockApi(req, res);
});

module.exports = router;
