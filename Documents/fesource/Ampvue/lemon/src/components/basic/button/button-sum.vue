<template>
    <div class="tetris-sbtn tetris-1px-t">
        <div class="choose-all" v-if="hascheckbox">
            <checkbox :value="value" @on-change="allChoose"></checkbox>
            全选
        </div>
        <div class="flex-sum" :class="sumclass">
            <span class="sum">{{ title }}:  </span>
            {{ total }}元
        </div>
        <div class="commit-btn" @click="_onCommit" :class="classes">   
            <slot></slot>
        </div>
    </div>
</template>

<script>
import checkbox from '@components/basic/checkbox';
export default {
    name: 'button-sum',
    components: {
        checkbox
    },
    data() {
        return {

        }
    },
    /**********
    * props 说明
    * disabled: Boolean，默认为false，即按钮为不可点击状态
    * showTotal: Boolean，默认为true，即显示合计金额
    * value: Boolean，默认为false，即全选按钮为非选中状态
    * hascheckbox: Boolean，默认为false，即无全选按钮
    * total: [String, Number],合计的金额值
    * title: String,合计的金额钱
    ***********/
    props: {
        disabled: Boolean,
        showTotal: {
            type: Boolean,
            default: true
        },
        value: {
            type: Boolean,
            default: false
        },
        hascheckbox: {
            type: Boolean,
            default: false
        },
        total: [String, Number],
        title: String  
    },
    computed: {
        classes () {
            return [
                {
                    'tetris-commit-btn_disabled': this.disabled
                }
            ]
        },
        sumclass () {
            return this.showTotal ? '' : 'flex-sum_hide';
        }
    },
    methods: {
        _onCommit () {
            if(!this.disabled){
                this.$emit('on-commit');
            }
        },
        allChoose(){
            this.$emit('update:value', !this.value);
            this.$emit('choose-all', !this.value)
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';

.tetris-sbtn {
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem(120);
    // line-height: px2rem(120);
    background-color: rgba(255, 255, 255, 0.9);
    font-size: px2rem(34);
    
    & > div {
        display: flex;
        align-items: center;
    }
    .choose-all {
        flex: 3;
        justify-content: center;
        color: #333;
    }
    .flex-sum {
        flex: 5;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: $c-high;
        padding-right: px2rem(20);
        .sum {
            font-size: px2rem(24);
            margin-right: 5px;
        }
    }
    .flex-sum_hide {
        opacity: 0;
    }
    .commit-btn {
        flex: 4;
        height: 100%;
        background-color: $c-high;
        color: $c-white;
        text-align: center;
        justify-content: center;
        &:not(.tetris-commit-btn_disabled):active {
            background-color: $c-tapping;
        }
        &.tetris-commit-btn_disabled,
        &.tetris-commit-btn_disabled:active {
            background-color: $c-lightgrey!important;
        }
    }
}
</style>
