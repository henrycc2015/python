<template>
    <div class="tetris-cell-icon" :class="{'tetris-cell-top-border': isNeedTopBorder}" >
        <label>
            {{title}}
        </label>
        <div class="tetris-cell-iconcontent">
            <slot name="iconcontent"></slot>
        </div>
    </div>
</template> 

<script>
export default {
    name: 'cell-icon',
    data() {
        return {
        }
    },
    props: {
        isNeedTopBorder: Boolean,
        title: [String, Number]

    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-cell-icon {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    height: px2rem(94);
    box-sizing: border-box;
    padding: 0 15px;
    font-size: px2rem(30);
    label {
        display: flex;
        flex: 1;
        color: #666;
        word-wrap: break-word;
        word-break: break-all;
    }
    .tetris-cell-iconcontent {
        flex: 0 0 px2rem(350);
        justify-content: flex-end;
        text-align: right;
    }
    &:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #DCDCDC;
        color: #DCDCDC;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }
    
}

.tetris-cell-top-border:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #DCDCDC;
    color: #DCDCDC;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
</style>
