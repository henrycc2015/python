<template>
    <span class="tetris-checkbox" :class="{'tetris-checkbox-active': value}" @click="updateValue">
        <i-icon name="check-bold" color="#fff" size="35" v-show="value"></i-icon>
    </span>
</template>

<script>
import icon from '@components/basic/icon';
export default {
    name: 'checkbox',
    components: {
        'i-icon': icon
    },
    /**********
    * props 说明
    * value true选中，false不选中
    ***********/
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        updateValue() {
            this.$emit('update:value', !this.value)
            this.$emit('on-change',this.value);
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
@import 'src/style/variables.scss';
.tetris-checkbox {
    position: relative;
    display: inline-block;
    width: px2rem(40);
    height: px2rem(40);
    line-height: px2rem(40);
    border: 1px solid #dcdcdc;
    border-radius: 50%;
    background-color: transparent;
    margin-right: px2rem(20);
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
}

.tetris-checkbox-active {
    border-color: $c-high;
    background-color: $c-high;
}
</style>