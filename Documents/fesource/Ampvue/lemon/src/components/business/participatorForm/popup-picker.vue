<template>
    <li class="layout_li" @click="onClick">
        <span :class="titleClass" v-html="titleStr"></span>
        <span class="pl10" style="text-align: right;">
            <span class="span_text" v-if="!displayFormat && !showName && value.length">{{value | array2string}}</span>
            <span class="span_text" v-if="!displayFormat && showName && value.length">{{value | value2name(data)}}</span>
            <span class="span_text_placeholder" v-if="!value.length && placeholder" v-text="placeholder"></span>
        </span>
        <span class="tar w_10">
            <b class="r-arrow"></b>
        </span>
        <div v-transfer-dom>
            <v-popup v-model="showValue" class="tetris-popup-picker" :id="`tetris-popup-picker-${uuid}`" @on-hide="onPopupHide" @on-show="onPopupShow"
                :popup-stype="popupStyle">
                <div class="tetris-popup-picker-section">
                    <div class="tetris-popup-picker-header tetris-1px-b" @touchmove.prevent>
                        <v-flexbox>
                            <v-flexbox-item class="tetris-popup-picker-left" @click.native="onHide(false)" v-if="icon">
                                <v-icon name="cross" size="44" color="#666"></v-icon>
                            </v-flexbox-item>
                            <v-flexbox-item class="tetris-popup-picker-left" @click.native="onHide(false)" v-else>{{ cancelText || '取消'}}</v-flexbox-item>
                            <v-flexbox-item class="tetris-popup-picker-center">{{ popTitle}}</v-flexbox-item>
                            <v-flexbox-item class="tetris-popup-picker-right" @click.native="onHide(true)" v-if="icon"></v-flexbox-item>
                            <v-flexbox-item class="tetris-popup-picker-right" @click.native="onHide(true)" v-else>{{ confirmText || '确定'}}</v-flexbox-item>
                        </v-flexbox>
                    </div>
                    <v-picker :data="data" v-model="tempValue" @on-change="onPickerChange" :columns="columns" :fixed-columns="fixedColumns" :column-width="columnWidth"
                        :container="`#tetris-popup-picker-${uuid}`"></v-picker>
                </div>
            </v-popup>
        </div>
    </li>
</template>
<script>
    import icon from '@components/basic/icon';
    import popup from '@components/structure/popup/popup.vue';
    import picker from '@components/structure/picker';
    import Flexbox from '@components/structure/flexbox/flexbox';
    import FlexboxItem from '@components/structure/flexbox/flexbox-item';
    import array2string from 'src/filters/array2String';
    import value2name from 'src/filters/value2name';
    import TransferDom from 'src/directives/transfer-dom';
    const getObject = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    export default {
        name: 'popup-picker',
        directives: {
            TransferDom
        },
        components: {
            'v-popup': popup,
            'v-picker': picker,
            'v-flexbox': Flexbox,
            'v-flexbox-item': FlexboxItem,
            'v-icon': icon
        },
        filters: {
            array2string,
            value2name
        },
        data() {
            return {
                onShowProcess: false,
                tempValue: getObject(this.value),
                closeType: false,
                currentData: JSON.stringify(this.data),
                showValue: false,
                currentValue: this.value
            }
        },
        props: {
            disable: {
                type: Boolean,
                default: false
            },
            // valueTextAlign: {
            //     type: String,
            //     default: 'right'
            // },
            title: String,
            popTitle: String,
            cancelText: String,
            confirmText: String,
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            columns: {
                type: Number,
                default: 0
            },
            fixedColumns: {
                type: Number,
                default: 0
            },
            columnWidth: Array,
            value: {
                type: Array,
                default () {
                    return []
                }
            },
            icon: Boolean,
            show: Boolean,
            displayFormat: Function,
            showName: Boolean,
            showCell: {
                type: Boolean,
                default: true
            },
            popupStyle: Object,
            leftShortline: Boolean,
            required: [Boolean],
        },
        computed: {
            titleStr() {
                let result = this.title
                if (this.required) {
                    result += '<span style="color: #d7a162;" v-if="required">*</span>'
                }
                return result
            },
            titleClass() {
                return {
                    'w_70': !this.title || this.title.length <= 4,
                    'w_110': this.title && this.title.length > 4
                }
            }
        },
        created() {
            this.uuid = Math.random().toString(36).substring(3, 8);
        },
        methods: {
            value2name,
            onClick() {
                this.$emit('before-click');
                this.$nextTick(() => {
                    if (!this.disable) {
                        // this.showValue = true;
                        setTimeout(() => {
                            this.showValue = true;
                            //this.resetZIndex();
                        }, 200)
                    }
                })
            },
            onHide(type) {
                this.showValue = false;
                if (type) {
                    this.closeType = true;
                    this.currentValue = getObject(this.tempValue);
                }
                if (!type) {
                    this.closeType = false;
                    if (this.value.length > 0) {
                        this.tempValue = getObject(this.currentValue);
                    }
                }
            },
            onPopupShow() {
                this.closeType = false;
                this.$emit('on-show');
            },
            onPopupHide(val) {
                if (this.value.length > 0) {
                    this.tempValue = getObject(this.currentValue);
                }
                this.$emit('on-hide', this.closeType, value2name(this.currentValue, this.data).split(' '));
            },
            onPickerChange(val) {
                if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
                    if (this.value.length) {
                        let nowData = JSON.stringify(this.data);
                        if (nowData !== this.currentData && this.currentData !== '[]') {
                            this.tempValue = getObject(val);
                        }
                        this.currentData = nowData;
                    }
                }
                const _val = getObject(val);
                this.$emit('on-shadow-change', _val, value2name(_val, this.data).split(' '));
            },
            resetZIndex() {
                setTimeout(() => {
                    document.querySelector(`#tetris-popup-picker-${this.uuid} .scroller-mask`).style.zIndex = 0;
                    document.querySelector(`#tetris-popup-picker-${this.uuid} .scroller-mask`).style.zIndex = 3;
                }, 500);
            }
        },
        watch: {
            value(val) {
                if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
                    this.tempValue = getObject(val);
                    this.currentValue = getObject(val);
                }
            },
            currentValue(val) {
                this.$emit('input', getObject(val));
                this.$emit('on-change', getObject(val), value2name(val, this.data).split(' '));
            },
            show(val) {
                this.showValue = val;
            }
        }
    }
</script>
<style scoped src="./main.scss"></style>
<style lang="scss" scoped>
    @import 'src/style/mixin.scss';
    .tetris-picker-box {
        .tetris-cell-select {
            position: relative;
            display: flex;
            align-items: center;
            background-color: #fff;
            height: px2rem(90);
            box-sizing: border-box;
            padding: 0 15px;
            font-size: px2rem(30);
            .tetris-cell-hd {
                min-width: px2rem(240);
                label {
                    display: block;
                    color: #666;
                    word-wrap: break-word;
                    word-break: break-all;
                }
            }
            .tetris-cell-bd {
                color: #333;
                text-align: right;
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
        .tetris-popup-picker-placeholder {
            color: #c1c1c1;
        }
        .shortName {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .tetris-popup-picker {
        .tetris-popup-picker-header {
            height: px2rem(100);
            color: $c-high ;
            background-color: #fff;
            font-size: px2rem(34);
            position: relative;
        }
        .tetris-popup-picker-left {
            padding-left: 15px;
        }
        .tetris-popup-picker-right {
            text-align: right;
            padding-right: 15px;
        }
        .tetris-popup-picker-center {
            text-align: center;
            color: #333;
        }
    }

    .span_text{
        background-color: $c-white;
        text-align: right;
        border-radius: 5px;
        padding: 4px;
        height: 34px;
        line-height: 24px;
        color: $c-black;
    }

    .span_text_placeholder {
        background-color: $c-white;
        text-align: right;
        border-radius: 5px;
        padding: 4px;
        height: 34px;
        line-height: 24px;
        color: $c-lightgrey;
    }
</style>