<template>
    <span class="tetris-toggle" @click="tap" :class="{isopen: currentValue}">
    </span>
</template>

<script>
export default {
    name: 'toggle',
    /**********
    * props 说明
    * value true选中，false不选中
    ***********/
    props: {
        value: {
            type: Boolean,
            default: false
        },
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    methods: {
        tap: function () {
            this.currentValue = !this.currentValue;
        }
    }, 
    watch: {
        currentValue(val) {
            this.$emit('input', val)
            this.$emit('on-change', val)
        },
        value(val) {
            this.currentValue = val
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';
.tetris-toggle {
    position: relative;
    display: inline-block;
    margin-top: 4px;
    width: 50px;
    height: 30px;
    background-color: $c-offwhite;
    border: 1px solid $c-stonegrey;
    border-radius: 16px;
    box-sizing: border-box;
    -webkit-transition: background-color 0.1s, border 0.1s;
    transition: background-color 0.1s, border 0.1s;

    &:before {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        width: 46px;
        height: 28px;
        border-radius: 14px;
        background-color: $c-offwhite;
        -webkit-transition: -webkit-transform 0.35s ease-in-out;
        transition: transform 0.35s ease-in-out;
    }
    &:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid rgba(229, 229, 229, .5);
        background-color: $c-white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        -webkit-transition: -webkit-transform 0.35s ease-in-out;
        transition: transform 0.35s ease-in-out;
    }
    &.isopen {
        background-color: $c-high;
        border-color: $c-high;
        &:before {
            transform: scale(0);
        }
        &:after {
            transform: translateX(20px);
        }
    }
}
</style>