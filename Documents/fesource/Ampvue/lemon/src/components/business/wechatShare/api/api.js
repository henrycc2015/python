import * as fetch from 'src/utils/fetch';

// 接口地址
let urlsObj = {
	saveShareNote: '/m/saveShareNote.dox', // 生成shareID
	getGCodeAction: '/m/checkGCodeAction.dox', //校验G代码
	getSharePattem: '/m/getSharePattern.dox', //获取分享模版（老保险产品）
	getInsureSharePattem: '/m/multipleClick/insure/getInsureSharePattern.dox', //获取分享模版（保险拆分产品）
	checkInsureGCodeAction:
		'/m/multipleClick/insure/checkInsureGCodeShareNote.dox', //校验G代码（保险拆分产品）
	saveInsureShareNote: '/m/multipleClick/insure/saveInsureShareNote.dox' // 生成shareID（保险拆分产品）
};

export default {
	// 微信分享生成ShareID
	saveShareNote(data) {
		return fetch.post(urlsObj.saveShareNote, data);
	},
	// 微信分享G代码转换
	getGCodeAction(data) {
		return fetch.post(urlsObj.getGCodeAction, data);
	},
	// 获取产品分享类型
	getSharePattem(data) {
		return fetch.post(urlsObj.getSharePattem, data);
	},
	// 获取产品分享类型（保险拆分产品）
	getInsureSharePattem(data) {
		return fetch.post(urlsObj.getInsureSharePattem, data);
	},
	// 微信分享检查业务员代码（保险拆分产品）
	checkInsureGCodeAction(data) {
		return fetch.post(urlsObj.checkInsureGCodeAction, data);
	},
	// 微信分享生成ShareID（保险拆分产品）
	saveInsureShareNote(data, oldApi) {
		return fetch.post(
			oldApi ? urlsObj.saveShareNote : urlsObj.saveInsureShareNote,
			data
		);
	}
};
