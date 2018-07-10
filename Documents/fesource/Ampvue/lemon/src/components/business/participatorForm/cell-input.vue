<template>
    <li class="layout_li">
        <span :class="titleClass" v-html="titleStr"></span>
        <span class="pl10">
            <input v-if="inputType == 'number'" v-model="currentValue" :placeholder="placeholder" type="number" ref="input" :readonly="readonly"
                :disabled="disabled" @blur="onBlur" />
            <input v-else-if="inputType == 'tel'" v-model="currentValue" :placeholder="placeholder" type="tel" ref="input" :maxlength="maxLength"
                :readonly="readonly" :disabled="disabled" @blur="onBlur" />
            <input v-else v-model="currentValue" :placeholder="placeholder" type="text" @keyup="keyup($event)" ref="input" :maxlength="maxLength"
                :readonly="readonly" :disabled="disabled" @blur="onBlur" />
        </span>
        <div class="tetris-cell-ft" :class="{'is-link': isLink}">
            <i-icon style="vertical-align: middle;" v-show="needClear && currentValue && !disabled && !readonly" name="round-cross" color="#c1c1c1"
                size="40" @click.native="clear"></i-icon>
            <ocr style="vertical-align: middle;" v-if="idCard || bankCard" :id-card="idCard" :bank-card="bankCard" @getCardData="getCardNo"></ocr>
        </div>
        <slot></slot>
    </li>
</template>
<script>
    import icon from '@components/basic/icon';
    import ocr from '@components/assemble/ocr';
    export default {
        name: 'cell-input',
        components: {
            'i-icon': icon,
            ocr
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
        data() {
            return {
                currentValue: '',
            }
        },
        props: {
            value: [String, Number],
            isNeedTopBorder: Boolean,
            shortBottemBorder: Boolean,
            title: [String, Number],
            inputType: String,
            placeholder: {
                default: '请输入'
            },
            isLink: Boolean,
            maxLength: {
                type: Number
            },
            iconObject: Object,
            needClear: {
                type: Boolean,
                default: true
            },
            readonly: Boolean,
            disabled: Boolean,
            idCard: {
                type: Boolean,
                default: false
            },
            bankCard: {
                type: Boolean,
                default: false
            },
            required: [Boolean]
        },
        created() {
            this.currentValue = (this.value === undefined || this.value === null) ? '' : this.value
        },
        methods: {
            clear() {
                this.currentValue = ''
                this.focus()
            },
            focus() {
                this.$refs.input.focus();
                // setTimeout(() => {this.onResize()});
            },
            blur() {
                this.$refs.input.blur()
            },
            iconClick() {
                this.$emit('icon-click');
            },
            onBlur() {
                this.$emit('blur', this.currentValue);
            },
            keyup(e) {
                this.$emit('keyup', e);
            },
            getCardNo(val) {
                this.currentValue = val
            },
            onResize() {
                let el = document.activeElement,
                    curH = document.body.scrollHeight;
                document.body.scrollTop = curH;
                el.scrollIntoView(true);
                el.scrollIntoViewIfNeeded();
            }
        },
        watch: {
            currentValue(newVal) {
                this.$emit('input', newVal)
            },
            value(val) {
                this.currentValue = val
            },
        }
    }
</script>
<style scoped src="./main.scss"></style>