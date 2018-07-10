<template>
    <div class="tetris-remark" :style='styleObj' v-if="title === ''">
        <v-icon name="hammer" size="60"></v-icon>
        <slot></slot>
    </div>
    <div class="tetris-remark-fail" :style='styleObj' v-else>
        <div class="remark-fail-title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
import icon from '@components/basic/icon';
export default {
    name: 'remark',
    components: {
        'v-icon': icon,

    },
    props: {
        title: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '100'
        }
    },
    data: function () {
        var obj = {};
        this.width  && (obj.width  = this.width  + '%');
        return {
            styleObj: obj
        };
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';

.tetris-remark {
    position: relative;
    border: 1px dashed #c1c1c1;
    padding: 1rem .8rem;
    width: 70%;
    margin: 1rem auto 0;
    border-radius: 4px;
    color: #c1c1c1;
    font-size: px2rem(24);

    & i {
        position: absolute;
        top: -15px;
        left: 50%;
        margin-left: -30px;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #fff;
    }
}
</style>