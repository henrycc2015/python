<template>
    <div class="tetris-password">
        <ul ref="pwd" class="pwd" @click="focus">
            <li v-for="item in 6" :key="item"></li>
        </ul>  
        <div class="note" @click="setPwd">
            <slot name="note"></slot>
        </div>
        <div class="btn">
            <v-button size="lg" radius :disabled="disable" @click.native="next" >{{ btnText }}</v-button>
        </div>
        <transition name="popup-animate-bottom">
            <div v-show="showKbd" class="kbd" >
                <div class="ok" @click='finish'>完成</div>
                <div class="buttons">
                    <ul>
                        <li v-for="n in pwdList" :key="n"><button class="num" @touchend='input'>{{n}}</button></li>
                        <li class="blank"></li>
                        <li><button class="num" @touchend='input'>{{pwdLast}}</button></li>
                        <li class="blank"><button @touchend='remove'><v-icon name="delete" size="50" color="#020202"></v-icon></button></li>
                    </ul>
                </div>
            </div> 
        </transition>
    </div>
</template>

<script>

import JSEncrypt from './JSEncrypt';
import popup from '@components/structure/popup/popup.vue';
import buttonGroup from '@components/basic/button/button-group';
import VIcon from '@components/basic/icon';
import js_pwd_keyboard from 'src/hybrids/cellb/js_pwd_keyboard';

const PUBKEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCf/Cc5SwJB8+Zpfc0WBE+piQGZVoGyReO+RmA7GuSEmVqVAF3ZmxA4yKlwrJLP8tKMc2oI1rgs7KxBUqw6QzZyF52VB2obl2duVfQL5X7EjzKKa2V423CpQgp84ZSLXuv7FWNKCMVkepqkO97/aEdovlryivH6JhsIcFCmexiR/QIDAQAB';

export default {
    name: 'password',
    components: {
        VIcon,
        'v-popup': popup,
        'v-button': buttonGroup,
    },
    props: {
        show: Boolean,
        value: {
            type: String,
            default: ''
        },
        disabled: Boolean,
        btnText: {
            type: String,
            default: '下一步'
        }
    },
    created (){
        //清空之前输入的密码
        // window.pwdKbdCallback({ maskCodes: '', encryptedContent: '' });
        // //隐藏,清空保存的
        // this.callNative(0);
        // //显示键盘
        // setTimeout(function() {
        //     this.callNative(1)
        // }, 10);
        // setTimeout(function() {
        //     //任意点击,返回和关闭时都要隐藏键盘. 先off避免重复绑定
        //     aop.offOn('tap,native_back,native_quit,page_out', hideKbd, 0, 1);
        // }, 300);
        this.focus();
        
    },
    data: function () {
        return {
            showKbd: false,
            pwdVal: this.value,
            count: 0,
            pwdObj: [0,1, 2, 3, 4, 5, 6, 7, 8, 9],
            pwdList: [],
            pwdLast:''
        };
    },
    computed: {
        disable () {
            return (this.pwdVal.length < 6) ? true : false;
        }
    },
    methods: {
        randomsort(a, b) {
            return Math.random()- 0.5 ;
        },
        showPwd () {
            // let ctrl = this.$refs.pwd.children;
            // if(len == orginal){
            //     return;
            // }else if(len > orginal){
            //     ctrl[orginal].innerHTML = '&#9679;';
            // }else{
            //     ctrl[len].innerHTML = '';

            // }
            let ctrl = this.$refs.pwd.children,
            len = this.pwdVal.length;
            
            for ( let i = 0; i < len; i++ ) {
                ctrl[i].innerHTML = '&#9679;';
            }
            for ( let i = len; i < 6; i++ ) {
                ctrl[i].innerHTML = '';
            }
            // for ( let i = 0; i < len; i++ ) {
            //     ctrl[i].innerHTML = '&#9679;';
            // }
            // for ( let i = len; i < 6; i++ ) {
            //     ctrl[i].innerHTML = '';
            // }
        },
        focus () {
            this.pwdObj.sort(this.randomsort);
            this.pwdList = this.pwdObj.slice(0,9);
            this.pwdLast = this.pwdObj.slice(-1)[0];
            this.showKbd = true;
        },
        input (e) {
            let c = e.target.innerHTML,
                l = this.pwdVal.length,
                v = l < 6 ? this.pwdVal + c : this.pwdVal;
                console.log(c);
            let _this = this;
            this.pwdVal = v;
            setTimeout(function(){
                _this.showPwd();

            },1)

            // this.$emit('input', v);
            
        },

        finish (e) {
            this.showKbd = false;
        },
        
        remove (e) {
            let l = this.pwdVal.length,
                v = l > 0 ? this.pwdVal.substr(0, l - 1) : '';
            this.pwdVal = v;
            this.showPwd();

            this.$emit('input', v);

        },
        removeAll(){
            let ctrl = this.$refs.pwd.children;
            for ( let i = 0; i < 6; i++ ) {
                ctrl[i].innerHTML = '';
            }
            this.pwdVal = '';
        },
        next () {
            this.showKbd = false;
            let encryptCode = this.encrypt(this.pwdVal);
            //传入参数1，未加密密码；参数2 加密密码
            this.$emit('on-nextbtn',this.pwdVal,encryptCode);
        },
        setPwd () {
            this.showKbd = false;
            this.$emit('on-setpwd',this.pwdVal);
        },
        encrypt (pwd) {
            const ENCRYPT = new JSEncrypt();
            ENCRYPT.setPublicKey(PUBKEY);
            return ENCRYPT.encrypt(pwd);
        },
        registerNativeCallback(){
            var _this = this;
            window.pwdKbdCallback = function(r) {
                // r.isSubmitted = r.isSubmitted == '1';
                // var inputLen = r.maskCodes.length;
                // var list = $(pwdUl).toggleClass('highlight', inputLen == 6).find('li');
                // list.each(function(li, i) {
                //     li.innerHTML = i < inputLen ? '&#9679;' : '';
                // });
                // $(nextButton).attr('disabled', inputLen < 6);
                // if (inputLen == 6) {
                //     if (r.isSubmitted) hideKbd(); //隐藏键盘
                //     fnOk(r.encryptedContent, r.hashCode, r.isSubmitted);
                // }

                this.pwdVal = r.maskCodes;
                if (r.maskCodes.length == 6) {
                    // if (r.isSubmitted) hideKbd(); //隐藏键盘
                    // fnOk(r.encryptedContent, r.hashCode, r.isSubmitted);
                    _this.showKbd = false;
                    _this.$emit('on-nextbtn',r.maskCodes,r.encryptedContent);
                }
            };
        },

        callNative(enabled) {
            var paramObj = {
                enabled: enabled ? '1' : '0',
                publicKey: PUBKEY || '',
                updateFunc: 'pwdKbdCallback',
                length: '6'
            };

            js_pwd_keyboard && js_pwd_keyboard(paramObj);

            
        }
    
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-password {
    .pwd {
        margin: 40px auto 10px;
        background-color: #fff;
        width: px2rem(688);
        height: px2rem(114);
        border: 1px solid #dcdcdc;
        box-sizing: border-box;
        border-radius: px2rem(5);

        li {
            float: left;
            color: #333;
            height: px2rem(114);
            width: px2rem(114);
            line-height: px2rem(110);
            font-size: px2rem(26);
            box-sizing: border-box;
            text-align: center;
            border-right: 1px solid #dcdcdc;
        }
        li:last-child {
            width: px2rem(113);
            border: none;
        }
    }
    .kbd {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #e5e5e5;
        transform: translate3d(0, 0, 0);
        transition-property: all;
        transition-duration: 300ms;
        .ok {
            float: right;
            color: #2588ea;
            width: 100%;
            text-align: right;
            padding-right: 10px;
            font-size: px2rem(34);
            height: px2rem(90);
            line-height: px2rem(90);
        }
        .buttons {
            width: 100%;
            float: left;
            background: #fff;
        }
        ul {
            width: 100%;
            float: left;
            background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' y='100%'><rect fill='#e5e5e5' x='0' y='50%' width='100%' height='0.5'/><rect fill='#e5e5e5' x='0' y='75%' width='100%' height='0.5'/><rect fill='#e5e5e5' x='0' y='25%' width='100%' height='0.5'/><rect fill='#e5e5e5' x='33.33%' y='0' height='100%' width='0.5'/><rect fill='#e5e5e5' x='66.66%' y='0' height='100%' width='0.5'/></svg>");
        }
        li {
            float: left;
            width: 33.33%;
            height: px2rem(128);
        }
        li:active {
            background-color: #c0c4c7;
        }
        li.blank {
            background: #c0c4c7;
        }
        li button {
            width: 100%;
            height: 100%;
            font-size: px2rem(50);
            text-align: center;
            border-radius: 0;
            color: #020202;
            background-color: transparent;
        }
        li button:active {
            background-color: #c0c4c7;
        }
        .remove {
            background: url();
        }
    }
    .note {
        float: right;
        color: $c-high ;
        font-size: px2rem(24);
        text-align: right;
        margin-right: 15px;
    }
    .btn {
        text-align: center;
        width: 100%;
        margin: 40px auto;
    }

    .popup-animate-bottom-enter, .popup-animate-bottom-leave-active {
        transform: translate3d(0, 100%, 0);
    }
}

</style>