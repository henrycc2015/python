<template>
    <div v-if="types=='1'">
        <div class="marketingCampaign-numb">
            <div class="MC_price">
                <span class="tag">{{tag}}</span>
                <span class="price"><em class="price_n">{{'￥'+priceNew}}</em> 起 <del>{{'￥'+priceOld}}</del></span>
                <span v-if="status == '01'" class="number">剩余<em  style="padding:0 2px;">{{productNum}}</em>份</span>
                <span v-if="status == '05'|| status == '04'" class="number"><em>今日售罄</em></span>
            </div>
            <div class="MC_time">
                <!-- <countDown :currentDate='currentDate' :contentBefore='contentBefore' v-if="status == '02' || status == '01' || status == '03'" :targetDate="targetDate" :callback="countDownCallback" endText="00:00:00">
                </countDown> -->
                <countDown :currentDate='currentDate' :contentBefore='contentBefore' v-if="status == '02' || status == '01'" :targetDate="targetDate" :callback="countDownCallback" endText="00:00:00">
                </countDown>
                <span class="number" v-if="status == '03'"><em class="time_color">{{startDate}}</em> 开始</span>
                <span v-if="status == '04'"><em>明天{{startDate}}</em> 继续开始</span>
                <span v-if="status == '06'"><em class="time_color">活动已结束</em></span>
            </div>
        </div>
        <div class="tips .tetris-1px-t">
            <slot name='tip_left'></slot>
            <div v-show="isShow" class="border-l"  @click="shareFuc">
                <v-icon  color='#999' name='share' size='55' style="float:right;"></v-icon>
            </div>
        </div>
            
    </div>
</template>

<script>
import countDown from '@components/structure/count-down';
import icon from '@components/basic/icon';

export default {
    props: {
        tag: [String, Number],
        types: [String,Number],
        tips: [String],
        status: [String,Number],
        priceNew: [String,Number],
        priceOld: [String,Number],
        targetDate: [String,Number],
        productNum: [String,Number],
        startDate: [String,Number],
        currentDate: [Date,String,Number],
        contentBefore: {
            type: [String,Number],
            default: '距结束'
        },
        countDownCallback: {
            type: Function
        },
        shareFuc: {
            type: [Function],
            default: function(){}
        },
        isShow: {
            type: [Boolean],
            default: true
        },

    },
    components: {
        countDown,
        'v-icon': icon
    },
    data() {
        return {
            
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';
    .marketingCampaign-numb {
        padding: px2rem(30) px2rem(30);
        width: 100%;
        background-color: #fff;
        .MC_price {
            width: 100%;
            em {
                color: #e5654a;
                font-style:normal;
                font-weight: 700;
            }
            .tag {
                background: $c-high ;
                display: inline-block;
                font-size: px2rem(20);
                float: left;
                transform: translateY(50%);
                border-radius: px2rem(3);
                color: #ffffff;
                padding: px2rem(2) px2rem(10);
            }
            .price {
                color:#999;
                font-size: px2rem(28);
                .price_n {
                    font-size: px2rem(46);
                }
            }
            .number {
                float: right;
                font-size: px2rem(28);
                margin-top: px2rem(16);
                color:#999;
            }
            
        }
        .MC_time {
            span {
                color: #666;
                font-size: px2rem(28);
            }
            em {
                font-style: normal;
                color:$c-high 
            }
        }
    }

.tips {
    width: 100%;
    padding: px2rem(32) px2rem(30);
    font-size: px2rem(24);
    color: #666;
    background-color: #fff; 
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='1'><rect fill='#ccc' x='0' y='0' height='0.5' width='100%'/></svg>");
    background-repeat: no-repeat;
    background-position: top;
    position: relative;
    }
.border-l {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='100%'><rect fill='#c1c1c1' x='0' y='6' width='0.5' height='80%'/></svg>");
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: left;
    width: px2rem(70);
    position: absolute;
    right: px2rem(30);
    top: 50%;
    transform: translateY(-60%);
}
    em.time_color {
    font-style: normal;
    color: $c-high ;
    font-weight: 500;
  }
</style>

