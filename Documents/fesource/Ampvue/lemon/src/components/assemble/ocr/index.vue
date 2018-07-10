<template>
    <i-icon class="ocr" name="scan-card" color="#999" size="40" v-if="isShow && isUse" @click.native="getCardData">
    </i-icon>
</template>

<script>
import icon from '@components/basic/icon';
import platform from 'src/utils/platform.js';
import js_id_card_ocr from 'src/hybrids/cell/js_id_card_ocr';
import js_bank_card_ocr from 'src/hybrids/cell/js_bank_card_ocr';
import js_ios_app_version from 'src/hybrids/cell/js_ios_app_version';

export default {
    components: {
        'i-icon': icon
    },
    props: {
        // 根据传参，判断是调用扫描身份证还是扫描银行卡功能
        idCard: {
            type: Boolean,
            default: false
        },
        bankCard: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    computed: {
        isUse() {
            return this.idCard || this.bankCard;
        }
    },
    created() {
        // 判断环境，不是app，或者build版本过低，就不能使用ocr功能
        let _this = this;
        if(typeof window == undefined || !window.isApp) {
            this.isShow = false;
        } else if (platform.ios) {
            js_ios_app_version(function(res) {
                let iosVersion = parseInt(res.iosBundleVersion);
                _this.isShow = iosVersion > 841;
            })
        } else if (platform.android) {
            if (window.healthAppObj) {
                let androidVersion = window.healthAppObj.getAppVersionCode();
                this.isShow = androidVersion > 187;
            }
       }
    },
    methods: {
        getCardData() {
            // 点击调起nativeSDK
            let _this = this;
            if (this.idCard) {
                // 扫描身份证
                js_id_card_ocr(function(data) {
                    // nameame 姓名
                    // gender 性别
                    // nation 名族
                    // birth 生日
                    // address 地址
                    // code 身份证号
                    let idCardData = typeof data === 'string' ? JSON.parse(data) : data;
                    _this.$emit('getCardData', idCardData.code);
                })
            } else if (this.bankCard) {
                // 扫描银行卡
                js_bank_card_ocr(function(data) {
                    // bankName 银行卡
                    // cardName 卡名称
                    // cardType 卡类型
                    // cardNum 卡号
                    // validDate 有效期
                    let bankCardData = typeof data === 'string' ? JSON.parse(data) : data;
                    _this.$emit('getCardData', bankCardData.cardNum);
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';
.ocr {
    padding: 5px 0 5px 5px;
}
</style>

