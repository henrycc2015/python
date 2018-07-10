<template>
    <button :class="classes" :style="styles"><slot>{{ text }}</slot></button>
</template>

<script>
export default {
    name: 'button-group',
    data() {
        return {

        }
    },
    /**********
    * props 说明
    * size: 默认值--对应值：default -- 490*80, 可选参数：mini -- 140*54, sm -- 260*60， mid -- 340*80,  lg -- 690*88, max -- 100%*120
    * type: 默认值是default,default -- 有bg,  可选参数：transparent -- 镂空按钮,  redefine -- 自定义宽高有背景色的，bgredefine  -- 自定义宽高无背景色的
    * radius: Boolean，默认为false，即无圆角
    * disabled: Boolean，默认为false，即按钮为不可点击状态
    * style: Object,传入自定义button的属性
    ***********/

    props: {
        type: {  
            default: 'default'
        },
        disabled: Boolean,
        text: String,
        size: String,
        radius: Boolean,
        styles: {
            type: Object,
            default: function () {
                return {}
            }
        }    
    },
    computed: {
        classes() {
            let sizeName = '';
            this.size == undefined ? sizeName='' : (sizeName = `tetris-gbtn_${this.size}`);
            
            return [
                `tetris-gbtn_${this.type}`,
                `${sizeName}`,
                {
                    'tetris-gbtn_radius': this.radius,
                    'tetris-gbtn_disabled': this.disabled
                }
                
            ]
        }
    },
    created() {

    }
}
</script>

<style lang="scss">
@import 'src/style/mixin.scss';
.tetris-gbtn_default, .tetris-gbtn_redefine {
    color: $c-white;
    background-color: $c-high;
    &:not(.tetris-btn_disabled):active {
        background-color: $c-tapping;
    }
    &.tetris-btn_disabled:active {
        background-color: $c-lightgrey !important;
    }
}
.tetris-gbtn_default {
    width: px2rem(490);
    height: px2rem(80);
    line-height: px2rem(80);
    font-size: px2rem(34);
}
.tetris-gbtn_redefine {
    min-width: px2rem(140);
    min-height: px2rem(54);
    font-size: px2rem(30);
    padding: 0 px2rem(30);
}
.tetris-gbtn_bgredefine {
    min-width: px2rem(140);
    min-height: px2rem(54);
    font-size: px2rem(30);
    padding: 0 px2rem(30);
    color: $c-high;
    background-color: $c-transparent;
    border:1px solid $c-high;
    &:not(.tetris-btn_disabled):active {
        color: #e0c89d;
        border-color: #e0c89d;
        background-color: $c-transparent;
    }
}
.tetris-gbtn_transparent {
    color: $c-high;
    background-color: $c-transparent;
    border:1px solid $c-high;
    font-size: px2rem(34);
    &:not(.tetris-btn_disabled):active {
        color: #e0c89d;
        border-color: #e0c89d;
        background-color: $c-transparent;
    }
}
.tetris-gbtn_radius {
    border-radius: 4px;
}
.tetris-gbtn_disabled,
.tetris-btn_disabled:active{
    background-color: $c-lightgrey !important;
}
.tetris-gbtn_transparent.tetris-gbtn_disabled,.tetris-gbtn_bgredefine.tetris-gbtn_disabled {
    color: $c-lightgrey !important;
    border-color: $c-lightgrey !important;
    background-color: $c-transparent !important;
} 
.tetris-gbtn_mini {
    width: px2rem(140);
    height: px2rem(54);
    line-height: px2rem(54);
    font-size: px2rem(30);
}
.tetris-gbtn_sm {
    width: px2rem(260);
    height: px2rem(60);
    line-height: px2rem(60);
    font-size: px2rem(28);
}
.tetris-gbtn_mid {
    width: px2rem(340);
    height: px2rem(80); 
    line-height: px2rem(80); 
    letter-spacing: 2px;
}
.tetris-gbtn_lg {
    width: px2rem(690);
    height: px2rem(88); 
    line-height: px2rem(88); 
    letter-spacing: 2px;
}
.tetris-gbtn_max {
    width: 100%;
    height: px2rem(120); 
    line-height: px2rem(120); 
    letter-spacing: 2px;
}
</style>
