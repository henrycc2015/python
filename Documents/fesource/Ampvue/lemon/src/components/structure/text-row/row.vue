<template>
    <div class="tetirs-row" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
export default {
	name: 'row',
    props: {
        line: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
        shortBottomBorder: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        classes () { 
            return [{
                'row-pd': this.line,
                'tetris-1px-b': this.line && this.border,
                'tetris-1px-b-15': this.shortBottomBorder,
            }]
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetirs-row {
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0px 15px;
    background-color: #fff;
    line-height: 1.85;
    font-size: px2rem(30);
    &.row-pd {
        line-height: 1.75;
        padding: 10px 15px;
    }
    // &.tetris-1px-b:after {
    //     left: 15px;
    // }
}
</style>
