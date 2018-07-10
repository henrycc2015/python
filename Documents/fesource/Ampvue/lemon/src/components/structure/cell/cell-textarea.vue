<template>
    <div class="tetris-textarea tetris-1px-b" :class="{'tetris-1px-t': isNeedTopBorder, 'tetris-1px-b-15': shortBottemBorder}">
        <div class="tetris-textarea-hd" v-if="title">
            <label class="">{{title}}</label>
        </div>
        <div class="tetris-textarea-bd">
            <textarea ref="textarea" v-model="currentValue" :placeholder="placeholder" :readonly="readonly" :name="name" :rows="rows" :cols="cols" :style="textareaStyle" :maxlength="max" :autocomplete="autocomplete" :autocapitalize="autocapitalize" :autocorrect="autocorrect" :spellcheck="spellcheck">
            </textarea>
        </div>
    </div>
</template> 

<script>
export default {
    name: 'cell-textarea',
    components: {
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
        placeholder: {
            default: '请输入'
        },
        max: Number,
        name: String,
        readonly: Boolean,
        rows: {
            type: Number,
            default: 3
        },
        cols: {
            type: Number,
            default: 30
        },
        height: Number,
        autocomplete: {
            type: String,
            default: 'off'
        },
        autocapitalize: {
            type: String,
            default: 'off'
        },
        autocorrect: {
            type: String,
            default: 'off'
        },
        spellcheck: {
            type: String,
            default: 'false'
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
            this.$refs.textarea.focus()
        },
        blur() {
            this.$refs.textarea.blur()
        },
        iconClick() {
            console.log('icon-click');
            this.$emit('icon-click');
        }
    },
    watch: {
        currentValue(newVal) {
            this.$emit('input', newVal)
        },
        value(val) {
            this.currentValue = val
        },
    },
    computed: {
        textareaStyle() {
            if (this.height) {
                return {
                    height: (this.height / 40) + 'rem'
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-textarea {
    position: relative;
    display: flex;
    align-items: flex-start;
    background-color: #fff;
    box-sizing: border-box;
    padding: px2rem(20) 15px;
    font-size: px2rem(30); // line-height: 1.5rem;
    .tetris-textarea-hd {
        display: flex;
        height: 100%;
        min-width: px2rem(200);
        max-width: px2rem(300);
        line-height: inherit;
        label {
            position: relative;
            display: inline-block;
            color: #666;
            word-wrap: break-word;
            word-break: break-all;
        }
    }
    .tetris-textarea-bd {
        flex: 1;
        textarea {
            display: block;
            color: #333;
            resize: none;
            width: 100%;
            font-size: px2rem(30);
            line-height: inherit;
            outline: 0;
            text-align: right;
            &::-webkit-input-placeholder {
                color: #c1c1c1;
            }
        }
    }
}
</style>
