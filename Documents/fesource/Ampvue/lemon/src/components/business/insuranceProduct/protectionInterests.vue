<template>
    <div class="xuzhi toggleWrapper">
        <orderDetailTopBar :title="'保障利益'" v-on:toggleEvent="showToggle" :hoverClass="isActive"></orderDetailTopBar>
        <template>
            <div class="body toggleCxt" v-bind:style="{ display: isActive ? 'block' : 'none'}">
                <ul class="layout" v-if="orderDroduct.productInfo.optionGroupList">
                    <div v-for="(group, groupIndex) in orderDroduct.productInfo.optionGroupList" :key="groupIndex">
                        <li class="line">
                            <span class="lh38 fl fwb">{{group.groupName}}</span>
                            <div class="clear"></div>
                        </li>

                        <li class="line" v-for="(option, optionIdIndex) in dataList"
                            :key="optionIdIndex" v-if="option.groupId==group.groupId">
                            <span class="lh38 fl">{{option.itemName}}</span>
                            <span class="tar lh38 fr corange">{{option.coverageUnit}}</span>
                            <div class="clear"></div>
                        </li>
                    </div>
                </ul>
                <ul class="layout" v-if="!orderDroduct.productInfo.optionGroupList">
                    <li class="line" v-for="(option, optionIndex) in  dataList" :key="optionIndex">
                        <span class="lh38 fl">{{option.itemName}}</span>
                        <span class="tar lh38 fr corange">{{option.coverageUnit}}</span>
                        <div class="clear"></div>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>
<script>
    import orderDetailTopBar from '@components/business/insuranceProduct/orderDetailTopBar';
    //    import insuranceProductStore from '../../../modules/insurance/product/vuex';
    //    import {
    //        mapState,
    //    } from 'vuex'


    export default {
        components: {
            orderDetailTopBar,
        },
        props: {
            orderDroduct: {
                type: Object,
                required: true
            },
            userInputInIndex: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
//                groups: [
//                    {name: '1', item01: '10', item02: '5', item03: '1'},
//                    {name: '2', item01: '20', item02: '10', item03: '5'}
//                ],
                isActive: false,
                idList: [],
                optionList: [],
                groupList: [],
                dataList: []


            }
        },
//        beforeCreate() {
//            this.$store.registerModule('insuranceProductStore', insuranceProductStore)
//        },
//        computed: {
//            ...mapState('insuranceProductStore', ['product'], ['userInputInIndex']),
//        },
        created() {
            this.idList = this.userInputInIndex.selectOptionIdList;
            this.optionList = this.orderDroduct.productInfo.optionList;
            this.groupList = this.orderDroduct.productInfo.optionGroupList;

            for (let i = 0; i < this.idList.length; i++) {
                for (let j = 0; j < this.optionList.length; j++) {
                    if (this.idList[i] == this.optionList[j].idOption && this.optionList[j].isVisible == 'Y') {
                        this.dataList.push(this.optionList[j]);
                    }

                }
            }
//            console.log(this.dataList, 'dataList');
        },
        methods: {

            showToggle(data){
//                console.log(this.isActive);
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


</style>