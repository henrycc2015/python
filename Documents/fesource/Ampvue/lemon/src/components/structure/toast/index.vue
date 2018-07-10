<template>
    <div class="toast">
        <div class="mask"></div>
        <div class="toast-wrap">
            <div>
                <i class="icon" v-show="success">&#xe848;</i>
                <i class="icon" v-show="fail">&#xe62d;</i>
            </div>
            <div class="text">
                {{toastMsg}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'toast',
    data () {
        return {

        }
    },
    computed: mapState({
        success: state => state.common.showSuccess,
        fail: state => state.common.showFail,
        toastMsg: state => state.common.toastMsg
    })
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
// @font-face {
//   font-family: 'icon';  /* project id 172436 */
//   src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot');
//   src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot?#iefix') format('embedded-opentype'),
//   url('//at.alicdn.com/t/font_w71lovnj7adobt9.woff') format('woff'),
//   url('//at.alicdn.com/t/font_w71lovnj7adobt9.ttf') format('truetype'),
//   url('//at.alicdn.com/t/font_w71lovnj7adobt9.svg#iconfont') format('svg');
// }
.icon {
    font-family:"icon" !important;
    font-size:18px;
    font-style:normal;
    color: #ffffff;
}
.toast {
    z-index: 100;
    .toast-wrap {
        position: fixed;
        width: px2rem(320);
        height: px2rem(320);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: px2rem(30);
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 1002;
        .icon {
            font-size: px2rem(80);
        }
        .text {
            font-size: 18px;
            color: #fff;
            margin-top: px2rem(40);
        }
    }
    .mask {
        position: fixed;
	    width: 100%;
	    margin: 0 auto;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 1001;
	    background: rgba(0,0,0,.6);
    }
}
</style>