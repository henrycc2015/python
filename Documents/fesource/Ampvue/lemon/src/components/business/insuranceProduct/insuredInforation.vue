<template>
    <div class="xuzhi toggleWrapper">
        <orderDetailTopBar :title="'被保人信息'" v-on:toggleEvent="showToggle" :hoverClass="isActive"></orderDetailTopBar>
        <template>
            <div class="body toggleCxt" v-bind:style="{ display: isActive ? 'block' : 'none'}">
            <div v-for="(insuran, key, insuranIndex) in orderInsuredList">
                <p class="line lh30">
                    <b>{{insuran.title}}</b>
                </p>
                <ul class="layout">
                    <li><span class="lh30 w_120 nameVerticalAlign">姓&nbsp;&nbsp;名：</span> <span id="insurerName" class="lh30 tar c000 name confirmName">{{insuran.name}}</span></li>
                    <li v-for="(type, typeIndex) in typeList" :key="typeIndex" v-if="type.code==insuran.idType"><span class="lh30 w_120">证件类型：</span> <span id="insurerIdType" class="lh30 tar c000 idtype">{{type.text}}</span></li>
                    <li><span class="lh30 w_120">证件号码：</span> <span id="insurerIdCard" class="lh30 tar c000 idcode">{{insuran.idNo}}</span></li>
                    <li><span class="lh30 w_120">性别：</span> <span id="insurerSex" data-type="3" class="lh30 tar c000 sex">{{insuran.gender=='M'?'男':'女'}}</span></li>
                    <li><span class="lh30 w_120">出生日期：</span> <span id="insurerBirthday" class="lh30 tar c000 birth">{{insuran.birthday}}</span></li>
                    <li><span class="lh30 w_120">职业类别：</span> <span id="occupation" class="lh30 tar c000 occupation">{{insuran.occupation}}</span></li>
                    <li><span class="lh30 w_120">手机号码：</span> <span id="mobile" class="lh30 tar c000 phonecode">{{insuran.mobile}}</span></li>
                </ul>
            </div>
        </div>
        </template>

    </div>
</template>
<script>
    import orderDetailTopBar from '@components/business/insuranceProduct/orderDetailTopBar';


    export default {
        components: {
            orderDetailTopBar,
        },
        props: {
            orderInsuredList:{
                type: Array,
                required: true
            },
            orderDroduct: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                isActive: false,
                typeList:[],
            }
        },
        created() {
            this.typeList=this.orderDroduct.certificateTypeList;
        },
        methods: {

            showToggle(data){
                this.isActive = data;
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
    .line {
        border-bottom: dotted 1px #ddd !important;
    }
    /*.layout li:last-child {*/
        /*border-bottom:none;*/
    /*}*/


</style>