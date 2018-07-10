<template>
    <div class="tetris-icon-search" >
        <div class="tetris-search-input">  
            <label :class="{'focus-pl': focusPl}" for="s" >
                <v-icon name="magnifier" color="#c1c1c1" size="36"></v-icon>
                <span v-show="showMagnifier">{{ placeholder }}</span>
            </label>
            <input id="s" ref="input" type="text"            
            v-model="currentValue" 
            @input="onInput"
            @focus="onFocus"/>
            <v-icon style="margin-left:5px;" v-show="currentValue" name="round-cross" color="#c1c1c1" size="40" @click.native="clear"></v-icon>
        </div>
        <div class="tetris-search-cancel" v-show="currentValue || showCancel" @click="cancel">
            取消
        </div>
    </div>
</template>

<script>
import icon from '@components/basic/icon';
export default {
    name: 'search',
    components: {
        VIcon: icon,

    },
    props: {
        value: [String, Number],
        placeholder: {
            default: '中文/拼音/首字母'
        },
    },
    computed: {

    },
    data () {
        return {
            currentValue: '',
            showCancel: false,
            showMagnifier: true,
            focusPl: false,
        }
    },
    created(){
        this.currentValue = (this.value === undefined || this.value === null) ? '' : this.value
    },
    methods: {
        clear() {
            this.currentValue = '';
            this.showCancel = true;
            this.showMagnifier = true;
            this.focus()
        },
        focus() {
            this.$refs.input.focus()           
            this.onFocus();
        },
        onFocus() {
            this.$emit('on-focus');
            this.focusPl = true;
        },
        blur() {
            this.$refs.input.blur();
            this.$emit('on-blur');
        },
        onInput() {
            this.$emit('on-input', this.currentValue);
            this.showMagnifier = false;
        },
        cancel() {
            this.currentValue = '';
            this.showCancel = false;
            this.showMagnifier = true;
            this.focusPl = false;
        }
    },
    watch: {
        // currentValue(newVal) {
        //     this.$emit('input', newVal)
        // },
        value (val) {
            this.currentValue = val
        },
    }

}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-icon-search {
    display: flex;
    align-items: center;
    width: 100%;
    padding: px2rem(14) 10px;
    background-color: #fff;  
}
.tetris-search-input {
    flex: 1;
    position: relative;
    height: px2rem(60);
    .i-magnifier {
        position: absolute;
        top: px2rem(12);
        left: px2rem(16);
        vertical-align: middle;
    }
    
    input {
        width: 100%;
        height: 100%;
        padding: 0 px2rem(20) 0 px2rem(68) ;
        color: $c-black;
        font-size: px2rem(24);
        vertical-align: middle;
        border-radius: 4px;
        background-color: #efefef;
        &::-webkit-input-placeholder {
            text-align: center;
        }
    }
    label {
        position: absolute;
        left: 30%;
        top: px2rem(12);
        font-size: px2rem(24);
        color: #c1c1c1;
        padding-left: px2rem(50);
        line-height: px2rem(40);
        z-index: 2;
        .i-magnifier {
            position: absolute;
            vertical-align: middle;
            top: -1px;
            left: 0;
        }
    }
    .focus-pl {
        left: px2rem(20);
    }
    .i-round-cross {
        position: absolute;
        right: px2rem(20);
        top: 0;
        height: px2rem(60);
        line-height: px2rem(60);
    }

}
.tetris-search-cancel {
    flex: px2rem(104) 0 0;
    height: 100%;
    justify-content: flex-end;
    font-size: px2rem(34);
    color: $c-high;
    padding-right: px2rem(10);
    text-align: right;
    height: px2rem(60);
    line-height: px2rem(60);
}

</style>
