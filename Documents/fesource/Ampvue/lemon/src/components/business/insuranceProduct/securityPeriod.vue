<template>
    <div class="xuzhi toggleWrapper">
        <orderDetailTopBar :title="'保障期间'" v-on:toggleEvent="showToggle" :hoverClass="isActive"></orderDetailTopBar>
        <div class="body toggleCxt pd10 lh30" v-bind:style="{ display: isActive ? 'block' : 'none'}">
            <p>自：<span class="corange">{{userInputInIndex.effDate}}</span>&nbsp;<span class="c000">零时起</span></p>
            <p>至：<span class="corange">{{userInputInIndex.endDate}}</span>&nbsp;<span class="c000">二十四时止。</span></p>
            <p>共：<span class="corange creditPeriod">12</span>&nbsp;<span class="c000 creditPeriodUnit">个月</span></p>
        </div>
    </div>
</template>
<script>
    import orderDetailTopBar from '@components/business/insuranceProduct/orderDetailTopBar';


    export default {
        components: {
            orderDetailTopBar,
        },
        props: {
            userInputInIndex: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                isActive: false,
            }
        },
        created() {
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
    .pd10{
        padding: 10px!important;
    }

    .corange {
        color: #ee5c3f;
    }


</style>