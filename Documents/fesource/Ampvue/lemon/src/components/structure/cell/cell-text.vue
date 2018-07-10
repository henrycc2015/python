<template>
    <div @click="clickFn" class="tetris-cell-text tetris-1px-b" :class="{'tetris-cell-top-border': isNeedTopBorder, 'shot-left-tetris-1px-b' : shotleftBottomline}" ref="trigger">
        <div class="tetris-cell-hd" :style="{color: titleColor}">
            {{ title }}
            <slot name="head"></slot>
        </div>
        <div class="tetris-cell-bd" :class="{'tetris-cell-ellipsis': ellipsis}" :style="{color: contentColor,width: rightWidth}" >
            {{ content }}
            <slot name="content"></slot>
        </div>
        <div :class="{'tetris-cell-text-is-link': isLink}"></div>
    </div>
</template>

<script>
export default {
    name: 'cell-text',
    data() {
        return {
        }
    },
    props: {
        isNeedTopBorder: Boolean,
        shotleftBottomline : Boolean,
        title: [String, Number],
        rightWidth: String,
        content: [String, Number],
        titleColor: {
            type: String
        },
        contentColor: {
            type: String
        },
        isLink: Boolean,
        ellipsis: Boolean
    },
    watch: {
    },
    methods: {
        clickFn() {
            this.$emit('click');
        }
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-cell-text {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    min-height: px2rem(94);
    box-sizing: border-box;
    padding: px2rem(20) 15px;
    font-size: px2rem(30);

    .tetris-cell-bd {
        color: #333;
        justify-content: flex-end;
        text-align: right;
    }
    .tetris-cell-ellipsis {
        max-width: 60%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .tetris-cell-hd {
        color: #666;
        flex: 1;
    }
    &-is-link {
        width: 15px;
        &:after {
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            position: absolute;
            top: 50%;
            margin-top: -4px;
            right: 15px;
        }
    }

}
.shot-left-tetris-1px-b:after{
    left : 15px;
}
</style>
