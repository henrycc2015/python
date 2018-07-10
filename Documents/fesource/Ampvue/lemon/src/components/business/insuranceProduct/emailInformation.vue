<template>
    <div class="xuzhi toggleWrapper">
        <orderDetailTopBar :title="'电子邮箱信息'" v-on:toggleEvent="showToggle" :hoverClass="isActive"></orderDetailTopBar>
        <div class="body toggleCxt " v-bind:style="{ display: isActive ? 'block' : 'none'}">
            <ul class="layout xbox" style="border: none; padding: 0;">
                <li><span class="w_70 lh24">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</span>
                    <span class="pl10 lh24">
				<input id="email" data-type="6" type="text" v-model="appEmail" @blur="checkEmailEvent"/></span>
                </li>

                <li>
                    <span class=" notice" id="showEmailTip">温馨提示：邮箱用来接收电子保单等信息，您也可以通过平安好福利平台的“保单信息”查询您的保单信息！ </span>
                </li>

                <li>
			    <span class="pl10 lh38 tar">
			        <label id="saveEmail" class="btn-two" otitle="保存电子邮箱按钮" otype="button"
                           v-on:click="saveEmail">保存电子邮箱</label>
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
        props: {},
        data() {
            return {
                isActive: false,
                appEmail: '',


            }
        },
        created() {

        },
        methods: {
            showToggle(data){
                this.isActive = data;
            },
            saveEmail(){
                this.checkEmailEvent();
                if(!this.checkEmailEvent()){
                    this.$emit('saveEmailEvent', this.appEmail)
                }

            },
            checkEmailEvent: function () {
                let validator = new Validator();
                validator.add(this.appEmail, [{
                    strategy: 'checkEmail'
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
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
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

</style>