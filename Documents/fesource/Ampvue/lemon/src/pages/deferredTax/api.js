import fetch from 'src/utils/fetch';

export default {
    //立即投保-获取用户企业信息
    buyNow(data) {
        return fetch.post('/m/multipleClick/insure/taxDeferred/buyNow.do', data,{ errorCallback: true });
    },
    // 确认投保
    taxSubmit(data) {
        return fetch.post('/m/multipleClick/insure/taxDeferred/submit.dox', data)
    },
    // 订单接口
    orderDetail(data) {
        return fetch.post('/m/toOrderDetail.do', data)
    },
    // 订单接口--短信短连接
    orderDetailFromMsg(data) {
        return fetch.post('/m/toOrderDetailFromMsg.dox', data)
    },

    //----------------------old-start
    // 客户信息验证接口
    verifyCustomer(data = {}) {
        return fetch.post('/m/tax/verifyCustomer.dox', data);
    },
    //下一步接口
    insuranceNext(data = {}) {
        return fetch.post('/m/multipleClick/insure/taxDeferred/insuranceNext.dox', data, { alertTime: 5000 })
    },
    /**
     * 查询总行
     */
    queryBankList(data = {}) {
        return fetch.get('/m/app/onlineDraw/queryBankList.cap', data);
    },
    /**
     * 查询分行
     */
    querySubBankList(data = {}) {
        return fetch.get('/m/app/onlineDraw/querySubBankList.cap', data);
    },
    // 税延投保接口
    taxInsurenceSubmit(data = {}) {
        return fetch.post('/m/tax/taxInsurenceSubmit.do', data);
    },
    // 税延核保接口
    taxIssuringSubmit(data = {}) {
        return fetch.post('/m/tax/taxIssuringSubmit.do', data);
    },
    // 获取用户五项信息
    getUserForInsurer(data = {}) {
        return fetch.post('/m/do/insurer/getUserForInsurer', data);
    },
    // 保单信息查询接口
    queryPolicy(data = {}) {
        return fetch.post('/m/tax/queryPolicy.do', data, {
            errorCallback: true
        });
    },
    // 电子发票信息查询接口
    queryVoucherDetail(data) {
        return fetch.post('/m/voucher/queryVoucherDetail.doh', data)
    },
    // 查看电子保单接口
    queryTaxDeferredElecPolicy(data) {
        return fetch.post('/m/insure/tax/queryTaxDeferredElecPolicy.doh', data)
    },
    // 保存风险测评结果
    saveTestRiskResult(data) {
        return fetch.post('/m/multipleClick/insure/taxDeferred/appraisalSubmit.dox', data)
    },
    // 支付接口
    taxDeferredCashier(data) {
        return fetch.post('/m/multipleClick/cashierDesk/taxDeferred/pay4H5.dox', data)
    },
    // 取消订单
    cancelOrder(data) {
        return fetch.post('/m/multipleClick/insure/taxDeferred/cancel.do', data)
    },
    // 获取分享配置
    getSharePattern(data) {
        return fetch.post('/m/getSharePattern.dox', data)
    },
    queryElecRep(data) {
        return fetch.post('/m/insure/taxDeferred/verifySubmit.dox', data)
    },
    receiptSubmit(data) {
        return fetch.post('/m/insure/taxDeferred/receiptSubmit.dox', data)
    },
    // 查询是否已签约
    querySignStatus(data) {
        return fetch.post('/m/taxDefer/querySignStatus.dox', data)
    },
    // 发送验证码
    sendSignCode(data) {
        return fetch.post('/m/taxDefer/sendSignCode.dox', data, {errorCallback: true})
    },
    //支付接口
    pay4Quick(data) {
        return fetch.post('/m/multipleClick/cashierDesk/taxDeferred/pay4Quick.dox', data, {loadingMsg: false, errorCallback: true})
    },
    //查询订单状态接口
    queryTaxDeferOrderStatus(data) {
        return fetch.post('/m/queryTaxDeferOrderStatus.dox', data, {loadingMsg: false, errorCallback: true});
    }
}