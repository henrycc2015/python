<template>
    <div>
        <ul class="circle">
            <li>
                <i></i>
                <span class="bold">我公司2017第四季度综合偿付能力充足率为265.09%，最近一期风险综合评级结果为B，偿付能力充足率达到监管要求。</span>
            </li>
            <li>
                <i></i>
                <span class="link" @click="org">查看分支机构信息</span>
            </li>
            <li>
                <i></i>
                <span>该产品提供电子保单，可在承保后登录“好福利”APP</span>
                <span class="link" @click="download">查看下载</span>
            </li>
            <li>
                <i></i>
                <span>本产品由平安养老保险股份有限公司销售并提供服务。</span>
            </li>
            <li>
                <i></i>
                <span>代投保属于违法行为，若因此造成被保险人或我公司的权益受到损害，我公司将依法追究代投保人的相关责任。</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { orgUrl, downloadUrl } from 'src/constant/url';
import fetch from 'src/utils/fetch';
// import { mapState } from 'vuex';
// import js_open_browser from 'src/hybrids/cell/js_open_browser.js';
// import js_banner_redirect from 'src/hybrids/cell/js_banner_redirect.js';
// import solvencyInfo from '../vuex'
export default {
    // asyncData ({ store, route }) {
    //     store.registerModule('solvencyInfo', solvencyInfo)
    //     return store.dispatch('solvencyInfo/fetchSolvencyInfo')
    // },
    data() {
        return {
            solvencyContent: '',
        }
    },
    mounted() {
        // this.getSolvencyInfo();
    },
    computed: {
        // ...mapState(
        //     ['solvencyInfo']
        // ),
    },
    methods: {
        /**
         * 查看分支机构
         */
        org() {
                window.location.href = orgUrl;
        },
        /**
         * 查看下载
         */
        download() {
            window.location.href = downloadUrl;
        },
        //获取偿付能力文案
        getSolvencyInfo() {
            // let option = {
            //     loadingMsg: null
            // }
            fetch.post('/m/solvency/querySolvencyMessage.dox', {}).then(res => {
                this.solvencyContent = res.content;
                this.solvencyInfo = res.content;
            }).catch(err=>{
                console.log(err);
            });
        }
    },
    // destroyed () {
    //     this.$store.unregisterModule('solvencyInfo')
    // },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
ul {
    padding: 5px 15px;
    font-size: px2rem(24);
    line-height: 2;
    color: #666;
    background-color: #fff;
    li {
        padding-left: 13px;
        i {
            display: inline-block;
            margin-left: -13px;
            vertical-align: middle;
            margin-right: 6px;
        }
        .bold {
            font-weight: bold;
        }
    }
}

.circle li i {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #666;
}

.circle li .link {
    color: $c-high;
}
</style>
