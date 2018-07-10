<template>
    <div class="tetris-cell tetris-1px-b" :class="{'tetris-1px-t': isNeedTopBorder,'shot-left-tetris-1px-b' : shotleftBottomline}">
        <div class="tetris-cell-hd" :style="styleObject">
            <slot name="header"></slot>
            <label>{{title}}</label>
            <div v-if="iconObject" class="labelIcon">
                <i-icon :name="iconObject.name" :color="iconObject.color" :size="iconObject.size" @click.native="iconClick"></i-icon>
            </div>
        </div>
        <div class="tetris-cell-primary tetris-cell-bd">
            <slot></slot>
        </div>
        <div v-if="isLink" class="tetris-cell-ft" :class="{'tetris-cell-is-link': isLink}">
        </div>
    </div>
</template> 

<script>
import icon from '@components/basic/icon';
export default {
    name: 'cell-display',
    components: {
        'i-icon': icon
    },
    data() {
        return {
        }
    },
    props: {
        isNeedTopBorder: Boolean,
        shotleftBottomline: Boolean,
        onlyDisplay: Boolean,
        title: [String, Number],
        isLink: Boolean,
        styleObject:{
            type: Object
        },
        iconObject: Object,
    },
    computed: {
    },
    methods: {
        iconClick(){
            this.$emit('icon-click');
        }
    },
    created() {
        
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-cell {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    height: px2rem(94);
    box-sizing: border-box;
    padding: px2rem(20) 15px;
    font-size: px2rem(30);
    .tetris-cell-hd {
        display: flex;
        height: 100%;
        min-width: px2rem(200);
        line-height: px2rem(50);
        color: #666;
        label {
            position: relative;
            display: inline-block;
            color: inherit;
            word-wrap: break-word;
            word-break: break-all;
        }
        .labelIcon {
            display: inline-block;
            margin-left: 5px;
        }
    }
    .title {
        height: 100%;
    }
    .tetris-cell-primary {
        flex: 1;
    }
    .tetris-cell-bd{
        text-align: right;
        color: #333;
    }
    .tetris-cell-ft {
        text-align: right;
    }
    &-is-link {
        width: 15px;
        &:after {
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #c1c1c1;
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
        left : 15px !important;
    }
</style>
