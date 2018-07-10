<template>
    <label :class="wrapClasses">
        <span :class="radioClasses">
            <span :class="innerClasses">
                <v-icon name="radio-checked" v-if="currentValue" color="#d7ac62" size="32"></v-icon>
            </span>
            <input type="radio" :class="inputClasses" :disabled="disabled" :checked="currentValue" :name="radioName" @change="change">
        </span>
        <slot>{{ label }}</slot>
    </label>
</template>

<script>
import icon from '@components/basic/icon';

const prefixCls = 'tetris-radio';
module.exports = {
    /**********
    * props 说明
    * value true选中，false不选中
    * label [String, Number]，单选的备注文案
    * disabled 默认为false，禁止状态
    * radioName 一组按钮时的name
    ***********/
    props: {
        value: {
            type: Boolean,
            default: false
        },
        label: {
            type: [String, Number]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        radioName: {
            type: String
        }
    },
    data: function() {
        return {
            currentValue: this.value,
            group: false,
            parent: false
        }
    },
    components: {
        'v-icon': icon
    },
    computed: {
        wrapClasses: function() {
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-group-item`]: this.group || false,
                    [`${prefixCls}-wrapper-checked`]: this.currentValue,
                    [`${prefixCls}-wrapper-disabled`]: this.disabled
                }
            ]
        },
        radioClasses: function() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.currentValue,
                    [`${prefixCls}-disabled`]: this.disabled
                }
            ]
        },
        innerClasses: function() {
            return `${prefixCls}-inner`;
        },
        inputClasses: function() {
            return `${prefixCls}-input`;
        }
    },
    mounted: function() {
        if (this.parent) this.group = true;
        if (!this.group) {
            this.updateValue();
        }
    },

    methods: {
        change: function(event) {
            if (this.disabled) {
                return false;
            }
            var checked = event.target.checked;
            this.currentValue = checked;
            this.$emit('input', checked);

            if (!this.group) {
                this.$emit('on-change', checked);
            }
        },
        updateValue: function() {
            this.currentValue = this.value;
        }
    },
    watch: {
        value: function() {
            this.updateValue();
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';
$radio-prefix-cls: 'tetris-radio';

.#{$radio-prefix-cls}-wrapper {
    font-size: 16px;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    margin-right: 8px;
}

// 基础样式
.#{$radio-prefix-cls} {
    display: inline-block;
    margin-right: 4px;
    white-space: nowrap;
    outline: none;
    position: relative;
    line-height: 1;
    vertical-align: middle;

    &-inner {
        display: inline-block;
        width: 16px;
        height: 16px;
        position: relative;
        top: 0;
        left: 0;
        background-color: $c-transparent;
        border: 1px solid $c-lightgrey;
        border-radius: 50%;

        & i {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }
    }
    &-input {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        opacity: 0;
    }
}

//选中
.#{$radio-prefix-cls}-checked {
    .#{$radio-prefix-cls}-inner {
        border-color: $c-transparent;
        & i {
            opacity: 1;
        }
    }
}
</style>
