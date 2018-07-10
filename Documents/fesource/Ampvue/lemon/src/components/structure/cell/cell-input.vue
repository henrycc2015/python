<template>
    <div class="tetris-cell tetris-1px-b" :class="{'tetris-1px-t': isNeedTopBorder, 'tetris-1px-b-15': shortBottemBorder}">
        <div class="tetris-cell-hd">
            <slot name="head"></slot>
            <label class="">{{title}}</label>
            <div v-if="iconObject" class="labelIcon">
                <i-icon :name="iconObject.name" :color="iconObject.color" :size="iconObject.size" @click.native.stop="iconClick"></i-icon>
            </div>
        </div>
        <div class="tetris-cell-primary">
            <input :class="greyColor ?'colorC1' :''" v-if="inputType == 'number'" v-model="currentValue" :placeholder="placeholder" 
                type="number" ref="input" :readonly="readonly" :disabled="disabled" @focus="onFocus" @blur="onBlur" />
            <input :class="greyColor ?'colorC1' :''" v-else-if="inputType == 'tel'" v-model="currentValue" :placeholder="placeholder" 
                type="tel" ref="input" :maxlength="maxLength" :readonly="readonly" :disabled="disabled" @focus="onFocus" @blur="onBlur"/>
            <input v-else v-model="currentValue" :placeholder="placeholder" :type="inputType" @keyup="keyup($event)"
                ref="input" :class="greyColor ?'colorC1' :''" :maxlength="maxLength" :readonly="readonly" :disabled="disabled" @focus="onFocus" @blur="onBlur"/>
        </div>
        <div class="tetris-cell-ft" :class="{'tetris-cell-is-link': isLink}">
            <i-icon style="margin-left:5px;" v-show="!isLink && needClear && currentValue && !disabled && !readonly" name="round-cross" color="#c1c1c1" size="40" @click.native="clear"></i-icon>
            <slot></slot>
            <ocr v-if="idCard || bankCard" :id-card="idCard" :bank-card="bankCard" @getCardData="getCardNo"></ocr>
        </div>
    </div>
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
    data() {
        return {
            currentValue: ''
        }
    },
    props: {
        value: [String, Number],
        isNeedTopBorder: Boolean,
        shortBottemBorder: Boolean,
        title: [String, Number],
        inputType: {
            type: String,
            default: 'text'
        },
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
        greyColor: {
            type: Boolean,
            default: false
        },
        idCard: {
            type: Boolean,
            default: false
        },
        bankCard: {
            type: Boolean,
            default: false
        },
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
            // setTimeout(() => {this.onResize()},10);
        },
        blur() {
            this.$refs.input.blur()
        },
        iconClick() {
            this.$emit('icon-click');
        },
        onFocus() {
            if(this.readonly) {
                this.$refs.input.blur();
            }
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
            this.$refs.input.scrollIntoView(true);
            this.$refs.input.scrollIntoViewIfNeeded();
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

<style lang="scss" scoped>
@import "src/style/mixin.scss";
.tetris-cell {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  height: px2rem(94);
  box-sizing: border-box;
  padding: px2rem(20) 15px;
  font-size: px2rem(30);
  line-height: px2rem(54);
  .tetris-cell-hd {
    display: flex;
    align-items: center;
    height: 100%;
    min-width: px2rem(200);
    max-width: px2rem(300);
  }
  .colorC1 {
    color: #C1C1C1;
  }
  label {
    position: relative;
    display: inline-block;
    color: #666;
    word-wrap: break-word;
    word-break: break-all;
  }
  .labelIcon {
    display: inline-block;
    margin-left: 5px;
  }
  .tetris-cell-primary {
    flex: 1;
  }
  .tetris-cell-ft {
    height: 100%;
    text-align: right;
  }
  input {
    height: inherit;
    width: 100%;
    text-align: right;
    color: #333;
    font-size: px2rem(30);
    &::-webkit-input-placeholder {
      color: #c1c1c1;
    }
    background-color: #fff;
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
</style>
