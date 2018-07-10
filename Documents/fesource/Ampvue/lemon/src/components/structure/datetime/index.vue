<template>
    <div class="tetris-cell-date tetris-1px-b" :class="{'tetris-1px-t': isNeedTopBorder, 'tetris-1px-b-15': shortBottemBorder}" data-cancel-text="取消" data-confirm-text="确定">
        <div class="tetris-cell-hd">
            <label>{{title}}</label>
            <slot name="head"></slot>
        </div>
        <div class="tetris-cell-bd tetris-cell-primary" :style="styleObject">
            {{_value || placeholder}}
        </div>
        <div class="tetris-cell-ft tetris-cell-date-is-link">
        </div>
    </div>
</template>
<script>
import Picker from './datetimepicker'
import format from './format'

export default {
    name: 'datetime',
    components: {
    },
    props: {
        isNeedTopBorder: Boolean,
        shortBottemBorder: Boolean,
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        title: String,
        value: {
            type: String,
            default: ''
        },
        inlineDesc: String,
        placeholder: {
            type: String,
            default: '请选择'
        },
        minYear: Number,
        maxYear: Number,
        confirmText: String,
        cancelText: String,
        clearText: String,
        customText:String,
        yearRow: {
            type: String,
            default: '{value}'
        },
        monthRow: {
            type: String,
            default: '{value}'
        },
        dayRow: {
            type: String,
            default: '{value}'
        },
        hourRow: {
            type: String,
            default: '{value}'
        },
        minuteRow: {
            type: String,
            default: '{value}'
        },
        required: {
            type: Boolean,
            default: false
        },
        minHour: {
            type: Number,
            default: 0
        },
        maxHour: {
            type: Number,
            default: 23
        },
        startDate: {
            type: String,
            validator(val) {
                if (process.env.NODE_ENV === 'development' && val && val.length !== 10) {
                    console.error('[VUX] Datetime prop:start-date 必须为 YYYY-MM-DD 格式')
                }
                return val ? val.length === 10 : true
            }
        },
        endDate: {
            type: String,
            validator(val) {
                if (process.env.NODE_ENV === 'development' && val && val.length !== 10) {
                    console.error('[VUX] Datetime prop:end-date 必须为 YYYY-MM-DD 格式')
                }
                return val ? val.length === 10 : true
            }
        },
        valueTextAlign: String,
        displayFormat: Function,
        readonly: Boolean,
        hourList: Array,
        minuteList: Array,
        show: Boolean,
        defaultSelectedValue: String,
        computeHoursFunction: Function
    },
    created() {
        this.isFirstSetValue = false;
        this.currentValue = this.value;
        this.uuid = Math.random().toString(36).substring(3, 8);
    },
    data() {
        return {
            currentValue: null,
            valid: true,
            errors: {}
        }
    },
    mounted() {
        const uuid = this.uuid;
        this.$el.setAttribute('id', `tetris-datetime-${uuid}`)
        if (!this.readonly) {
            this.$nextTick(() => {
                this.render()
            })
        }
    },
    computed: {
        _value() {
            if (!this.currentValue) {
                return this.placeholder || ''
            } else {
                return this.displayFormat ? this.displayFormat(this.currentValue) : this.currentValue
            }
        },
        pickerOptions() {
            const _this = this
            const options = {
                trigger: '#tetris-datetime-' + this.uuid,
                format: this.format,
                value: this.currentValue,
                output: '.tetris-datetime-value',
                confirmText: _this.getButtonText('confirm'),
                cancelText: _this.getButtonText('cancel'),
                clearText: _this.clearText,
                customText: _this.customText,
                yearRow: this.yearRow,
                monthRow: this.monthRow,
                dayRow: this.dayRow,
                hourRow: this.hourRow,
                minuteRow: this.minuteRow,
                minHour: this.minHour,
                maxHour: this.maxHour,
                startDate: this.startDate,
                endDate: this.endDate,
                hourList: this.hourList,
                minuteList: this.minuteList,
                defaultSelectedValue: this.defaultSelectedValue,
                computeHoursFunction: this.computeHoursFunction,
                onSelect(type, val, wholeValue) {
                    if (_this.picker && _this.picker.config.renderInline) {
                        _this.$emit('input', wholeValue)
                        _this.$emit('on-change', wholeValue)
                    }
                },
                onConfirm(value) {
                    _this.currentValue = value
                },
                onCustomText(value) {
                    _this.currentValue = value
                },
                onClear(value) {
                    _this.$emit('on-clear', value)
                },
                onHide() {
                    _this.$emit('update:show', false)
                    _this.validate()
                    _this.$emit('on-hide')
                },
                onShow() {
                    _this.$emit('update:show', true)
                    _this.$emit('on-show')
                }
            }
            if (this.minYear) {
                options.minYear = this.minYear
            }
            if (this.maxYear) {
                options.maxYear = this.maxYear
            }
            return options
        },
        firstError() {
            let key = Object.keys(this.errors)[0]
            return this.errors[key]
        },
        labelClass() {
            return {
                'vux-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
            }
        },
        styleObject() {
            return {
                color: this.value ? '#333' : '#c1c1c1'
            }
        }
    },
    methods: {
        getButtonText(type) {
            if (type === 'cancel' && this.cancelText) {
                return this.cancelText
            } else if (type === 'confirm' && this.confirmText) {
                return this.confirmText
            }
            return this.$el.getAttribute(`data-${type}-text`)
        },
        render() {
            this.$nextTick(() => {
                this.picker && this.picker.destroy()
                this.picker = new Picker(this.pickerOptions)
            })
        },
        validate() {
            if (!this.currentValue && this.required) {
                this.valid = false
                this.errors.required = '必填'
                return
            }
            this.valid = true
            this.errors = {}
        }
    },
    watch: {
        readonly(val) {
            if (val) {
                this.picker && this.picker.destroy()
            } else {
                this.render()
            }
        },
        show(val) {
            if (val) {
                this.picker && this.picker.show(this.currentValue)
            } else {
                this.picker && this.picker.hide(this.currentValue)
            }
        },
        currentValue(val, oldVal) {
            this.$emit('input', val)
            if (!this.isFirstSetValue) {
                this.isFirstSetValue = true
                oldVal && this.$emit('on-change', val)
            } else {
                this.$emit('on-change', val)
            }
            this.validate()
        },
        startDate() {
            this.render()
        },
        endDate() {
            this.render()
        },
        format(val) {
            if (this.currentValue) {
                this.currentValue = format(this.currentValue, val)
            }
            this.render()
        },
        value(val) {
            // do not force render when renderInline is true
            if (this.picker && this.picker.config.renderInline) {
                this.currentValue = val
                return
            }
            if (this.currentValue !== val) {
                this.currentValue = val
                this.render()
            }
        }
    },
    beforeDestroy() {
        this.picker && this.picker.destroy()
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import './style.scss';
.tetris-cell-date {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    height: px2rem(90);
    box-sizing: border-box;
    padding: 0 15px;
    font-size: px2rem(30);
    line-height: 1.5;
    .tetris-cell-bd {
        color: #333;
        text-align: right;
        margin-right: 15px;
    }
    .tetris-cell-hd {
        display: flex;
        align-items: center;
        width: 50%;
    }
    label {
        display: inline-block;
        color: #666;
        // width: px2rem(300);
        word-wrap: break-word;
        word-break: break-all;
    }
    .title {
        height: 100%;
    }
    .tetris-cell-primary {
        flex: 1;
    }
    .tetris-cell-ft {
        text-align: right;
    }
    // &:after {
    //     content: " ";
    //     position: absolute;
    //     left: 0;
    //     bottom: 0;
    //     right: 0;
    //     height: 1px;
    //     border-bottom: 1px solid #DCDCDC;
    //     color: #DCDCDC;
    //     transform-origin: 0 100%;
    //     transform: scaleY(0.5);
    // }
    &-is-link:after {
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
    // &-top-border:before {
    //     content: " ";
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     right: 0;
    //     height: 1px;
    //     border-top: 1px solid #DCDCDC;
    //     color: #DCDCDC;
    //     transform-origin: 0 0;
    //     transform: scaleY(0.5);
    // }
}
// .tetris-cell-date-b-15 {
// 	&:after {
// 		left: 15px;
// 	}
// }
</style>
