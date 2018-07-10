<template>
    <nav class="tetris-native-bar">
        <div class="back" >
            <v-icon @click.native="back" v-if="leftBack" name="angle-left" color="#333" size="40"></v-icon>
            <slot v-else name="left"></slot>
        </div>
        <div class="center">{{ title }}</div>
        <div class="close" >
            <v-icon @click.native="close" v-if="rightClose" name="cross" color="#333" size="40"></v-icon>
            <slot v-else name="right"></slot>
        </div>
    </nav>
</template>

<script>
import VIcon from '@components/basic/icon';

export default {
    //组件名字，可选
    name: 'nativeBar',

    //注册组件
    components: {
        VIcon
    },

    //组件入参
    props: {
        title: [String,Number],
        rightClose: {
            type: Boolean,
            default: false
        },
        leftBack: {
            type: Boolean,
            default: true
        },
    },

    //组件响应式数据
    data() {
        return {

        }
    },

    //完成了 data 数据的初始化，el没有
    created() {

    },

    //组件内部方法
    methods: {
        back () {
            this.$emit('on-back');
            console.log('native-bar >> go back' )
        },
        close () {
            this.$emit('on-close');
            console.log('native-bar >> close webview' )
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.tetris-native-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: px2rem(88);
    width: 100%;
    border-bottom: 1px solid $c-lightgrey;
    background-color: $c-white;
    padding: 0 15px;
    font-size: px2rem(36);
    color: $c-black;

    & > div {
        flex: 1;
    }
    .back {
        text-align: left;
    }
    .center {
        flex: 2;
        text-align: center;
    }
    .close {
        text-align: right;
    }
}



</style>
