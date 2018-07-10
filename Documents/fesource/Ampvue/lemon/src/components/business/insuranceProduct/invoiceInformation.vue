<template>
    <div class="xuzhi toggleWrapper">
        <orderDetailTopBar :title="'发票信息'" v-on:toggleEvent="showToggle" :hoverClass="isActive"></orderDetailTopBar>
        <div class="body toggleCxt " v-bind:style="{ display: isActive ? 'block' : 'none'}">
            <ul class="layout " style="border: none; padding: 0;">
                <div class="choose-btn">
                    <div><input type="radio" id="one" value="1" v-model="picked"
                                @change="typeDisplay">
                        <label for="one">电子发票</label></div>
                    <div><input type="radio" id="two" value="2" v-model="picked"
                                checked="checked"
                                @change="typeDisplay">
                        <label for="two">纸质发票</label></div>
                </div>

                <li>
                    <span class="w_70 lh24">发票抬头</span> <span class="pl10 lh24">
                        <input id="invoiceHeading" class="name" type="text" v-model="invoiceDtata.invoiceHeading"
                               readonly="readonly">
				    </span>
                </li>

                <div v-bind:style="{display:invoiceType?'block':'none'}">
                    <li>
                        <span class="w_70 lh24">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                        <span class="pl10 lh24">
                            <input id="invoiceRecevieName" data-type="1" class="name"
                                   v-model="invoiceDtata.invoiceRecevieName"
                                   maxlength="50" type="text" @blur="checkNameEvent">
                        </span>
                    </li>
                    <li>
                        <span class="w_70 lh24">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</span>
                        <span class="pl10 lh24">
                            <input id="invoiceRecevieAddr" data-type="9" v-model="invoiceDtata.invoiceRecevieAddr"
                                   class="name" maxlength="100"
                                   type="text" @blur="checkEmptyEvent">
				        </span>
                    </li>
                    <li>
                        <span class="w_70 lh24">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编</span>
                        <span class="pl10 lh24">
                            <input id="invoiceRecevieZipcode" data-type="8" v-model="invoiceDtata.invoiceRecevieZipcode"
                                   class="name" maxlength="6"
                                   type="text" @blur="checkZipcodeEvent">
				        </span>
                    </li>
                    <li>
                        <span class="w_70 lh24">手机号码</span>
                        <span class="pl10 lh24">
                            <input id="invoiceRecevieMobile" data-type="5" v-model="invoiceDtata.invoiceRecevieMobile"
                                   class="name" maxlength="11"
                                   type="tel" @blur="checkMobileEvent">
                        </span>
                    </li>
                    <li>
                        <span class="lh38 notice" id="showInvoiceTip">温馨提示：若需寄送发票，请保存！ </span>
                    </li>
                </div>

                <li>
                        <span class="pl10 lh38 tar">
					        <label id="saveInvoice" class="btn-two" otitle="保存发票按钮" otype="button"
                                   v-on:click="saveInvoice">保存发票</label>
					    </span>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
    import orderDetailTopBar from '@components/business/insuranceProduct/orderDetailTopBar';
    import Validator from 'src/utils/validate';
    import * as _ from 'src/utils/ui.tool';


    export default {
        components: {
            orderDetailTopBar,

        },
        props: {
            invoiceDtata: {
                type: Object,
                required: true
            },

        },
        data() {
            return {
                isActive: true,
                picked: '2',
                invoiceType: true,
                invoiceTypeData: {},
            }
        },
        created() {
        },
        methods: {
            showToggle(data){
                this.isActive = data;
            },
            typeDisplay(){
                this.invoiceType = !this.invoiceType;
            },
//            保存发票信息
            saveInvoice(){
                this.checkNameEvent();
                this.checkEmptyEvent();
                this.checkZipcodeEvent();
                this.checkMobileEvent();
                if (this.picked == '1') {
                    this.invoiceTypeData = {};
                    this.invoiceTypeData.flag = 'saveInvoice';
                    this.invoiceTypeData.invoiceType = this.picked;
                    this.invoiceTypeData.invoiceHeading = this.invoiceDtata.invoiceHeading;
                } else if (this.picked == '2') {
                    this.invoiceTypeData = {};
                    this.invoiceTypeData.flag = 'saveInvoice';
                    this.invoiceTypeData.invoiceType = this.picked;
                    this.invoiceTypeData.invoiceHeading = this.invoiceDtata.invoiceHeading;
                    this.invoiceTypeData.invoiceRecevieName = this.invoiceDtata.invoiceRecevieName;
                    this.invoiceTypeData.invoiceRecevieAddr = this.invoiceDtata.invoiceRecevieAddr;
                    this.invoiceTypeData.invoiceRecevieZipcode = this.invoiceDtata.invoiceRecevieZipcode;
                    this.invoiceTypeData.invoiceRecevieMobile = this.invoiceDtata.invoiceRecevieMobile;
                }

                if (!this.checkNameEvent() && !this.checkEmptyEvent() && !this.checkZipcodeEvent() && !this.checkMobileEvent()) {
                    this.$emit('saveInvoiceEvent', this.invoiceTypeData);
                }
            },
            checkNameEvent(){
                let validator = new Validator();
                validator.add(this.invoiceDtata.invoiceRecevieName, [{
                    strategy: 'userName'
                }]);
                let msg = validator.start();
                _.alert(msg);
                return msg;

            },
            checkEmptyEvent(){
                let msg;
                if (!this.invoiceDtata.invoiceRecevieAddr) {
                    let msg = '请填写邮寄地址';
                    _.alert(msg);
                    return msg;
                }
                return msg;
            },
            checkZipcodeEvent(){
                let msg;
                let pattern = /^\d{6}$/;
                if (!this.invoiceDtata.invoiceRecevieZipcode) {
                    let msg = '请填写邮政编码';
                    _.alert(msg);
                    return msg;
                } else if (!pattern.test(this.invoiceDtata.invoiceRecevieZipcode)) {
                    let msg = '不是正确的邮政编码';
                    _.alert(msg);
                    return msg;
                }
                return msg;
            },
            checkMobileEvent(){
                let validator = new Validator();
                validator.add(this.invoiceDtata.invoiceRecevieMobile, [{
                    strategy: 'telMobile'
                }]);
                let msg = validator.start();
                _.alert(msg);
                return msg;
            }


        }
    }
</script>
<style lang="scss" scoped>
    .xuzhi .header {
        background: #efefef;
        padding: 10px 0 10px 10px;
        border-radius: 5px;
        color: #555;
        position: relative;
        z-index: 101;
    }

    .hover .arrow {
        border-top: 0;
        border-bottom: 8px solid #ddd;
    }

    .arrow {
        width: 0;
        padding: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 8px solid #ddd;
        font-size: 0;
        display: inline-block;
    }

    .clear {
        width: 100%;
        clear: both;
    }

    .xuzhi .body {
        padding: 0 6px;
        background: #fff;
        border: solid 1px #ebebeb;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        position: relative;
        z-index: 100;
        top: -1px;
        margin: 0 4px;
    }

    .layout li > span {
        display: table-cell;
        line-height: 36px;
    }

    .layout li {
        width: 100%;
        display: table;
        border-bottom: solid 1px #ededed;
        position: relative;
    }

    li {
        list-style: none;
    }

    .c000 {
        color: #000;
    }

    .tar {
        text-align: right;
    }

    .toggleCxt {
        transform-origin: 0px 0px 0px;
        opacity: 1;
        transform: scale(1, 1);
        position: relative;
        visibility: visible;
        overflow: hidden;
        /*height: 216px;*/
        margin-top: 0px;
        margin-bottom: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .corange {
        color: #ee5c3f;
    }

    .xbox {
        border: solid 1px #efefef;
        padding: 0 10px;
        background: #fff;
        border-radius: 5px;
        border-right-color: #ddd;
        border-bottom-color: #ddd;
    }

    .w_70 {
        width: 70px;
    }

    .lh24 {
        line-height: 24px !important;
    }

    .pl10 {
        padding-left: 10px;
    }

    .lh24 {
        line-height: 24px !important;
    }

    .layout li > span input {
        border-color: #fff;
        padding: 4px 4px 4px 10px;
        text-align: right;
        width: 100%;
        height: 34px;
        line-height: 24px;
        border-radius: 5px;
        /*padding: 4px;*/
        background-color: #fff;
        box-sizing: border-box;
        /*appearance: none;*/
        /*-webkit-appearance: none;*/
        /*-moz-appearance: none;*/
        font-size: 14px;
    }

    .notice {
        font-size: 12px;
        color: #ee5c3f;
        line-height: 16px !important;
    }

    .lh38 {
        line-height: 38px !important;
    }

    .btn-two {
        border: solid 1px #efefef;
        border-radius: 5px;
        color: #ee5c3f;
        padding: 5px;
    }

    .layout li:last-child {
        border: none;
    }

    .choose-btn {
        line-height: 37px;
        display: flex !important;
        flex-wrap: nowrap !important;
        justify-content: space-around !important;
        border-bottom: solid 1px #efefef;

    }

    .choose-btn input[type="radio"] {
        width: inherit;
        height: inherit;
        line-height: inherit;
        -webkit-appearance: radio;
    }


</style>