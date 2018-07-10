<template>
    <div class="tetris-flow" :class="{'tetris-flow_vertical': orientation === 'vertical'}" >
        <div class="tetris-flow_bd">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'flow',
    props: {
        orientation: {
            type: String,
            default: 'horizontal'
        }
    },

}
</script>

<style lang="scss" >
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';
.tetris-flow {
    padding: px2rem(40) px2rem(80) px2rem(90);
    background-color: $c-white;
}
.tetris-flow_bd {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tetris-flow_li {
    position: relative;
    width: 14px;
    height: 14px;
    z-index: 2;
    
}
.tetris-flow_state {
    position: absolute;
    left: 0;
    top: 0;
    width: 14px;
    height: 14px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: $c-lightgrey;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $c-lightgrey;
}
.tetris-flow_state:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    transform: translate(-3px,-3px);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: transparent;
}
.tetris-flow_line {
    flex: 1;
    background-color: $c-lightgrey;
    height: 2px;
    position: relative;
}
.tetris-flow_process {
    display: none;
    background-color: $c-high;
    height: 2px;
    position: relative;
    .tetris-flow_line_ing & {
        width: 50%;
    }
    .tetris-flow_line_done & {
        display: block;
    }
}

[class^="tetris-flow_title-"],[class*=" tetris-flow_title-"] {
    position: absolute;
    color: $c-grey;
    font-size: 14px;
    font-weight: normal;
    white-space: nowrap;
    text-align: center;
}
.time {
    font-size: 12px;
}
.tetris-flow_title-bottom {
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0);
}
.tetris-flow_li_done {
    .tetris-flow_state{
        background-color: $c-high;
    }
    .tetris-flow_state:after {
        background-color: rgba(239, 194, 111, 0.5);
    }
    [class^="tetris-flow_title-"],[class*=" tetris-flow_title-"] {
        color: $c-high;
    }
}
.mlf {
    margin: 0 3px;
}
.mtb {
    margin: 3px 0;
}
.tetris-flow_line_done {
    background-color: $c-high;
} 
.tetris-flow_vertical {
    padding: 20px 15px 40px;
    .tetris-flow_bd {
        flex-direction: column;
        align-items: flex-start;
        height: 100%;
        box-sizing: border-box;
    }
    .tetris-flow_line {
        margin-left: 6px;
        height: px2rem(100);
        width: 2px;
    }
    [class^="tetris-flow_title-"],[class*=" tetris-flow_title-"] {
        top: -2px;
        left: 30px;
        text-align: left;
    }
}
</style>
