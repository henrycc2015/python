<template>
    <div class="alert" v-show="showAlert">
        <div class="alert-wrap">
            <div class="text">
                {{alertMsg}}
            </div>
        </div>
    </div>
</template>

<script>
/**********
* 使用 说明
* 运用alert 需要import该文件src/utils/ui.tool内的alert方法 
***********/
    import { mapState } from 'vuex'
    export default {
        name: 'alert',
        data() {
            return {

            }
        },
        computed: mapState({
            alertMsg: state => state.common.alertMsg,
            showAlert: state => state.common.showAlert
        })
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin.scss';
    .alert {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 10000;
        .alert-wrap {
            padding: 12px 15px;
            // position: fixed;
            // width: px2rem(500);
            max-width: px2rem(580);
            // z-index: 10000;
            // line-height: 1.2;
            text-align: center;
            // left: 50%;
            // top: 50%;
            // transform: translate(-50%, -50%);
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.6);
            .text {
                font-size: px2rem(34);
                // letter-spacing: 1px;
                color: #fff;
            }
        }
    }
</style>