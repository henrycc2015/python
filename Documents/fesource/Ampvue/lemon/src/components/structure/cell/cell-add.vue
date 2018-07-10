<template>
    <div class="tetris-cell-add tetris-1px-b" :class="{'tetris-1px-t': isNeedTopBorder}" @click="clickEvent">
        <v-icon name="plus" size="30" color="#d7ac62"></v-icon>
        <slot></slot>
    </div>
</template> 

<script>
import icon from '@components/basic/icon';
    /**********
    * 使用 说明
    * 单行cell 文字居中，且有加号这个icon，多运用于添加银行卡
    * isNeedTopBorder  Boolean值，是否显示上边框
    ***********/
export default {
    name: 'cell-add',
    components: {
        'v-icon': icon,
    },
    data() {
        return {
        }
    },
    props: {
        isNeedTopBorder: Boolean,

    },
    methods: {
        clickEvent() {
            this.$emit('click-event');
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-cell-add {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: px2rem(94);
    box-sizing: border-box;
    padding: 0 15px;
    font-size: px2rem(30);
    color: $c-high ;
    &:active {
        color: #b38f47;
    }
    i {
        margin-right: 10px;
    }
}
</style>
