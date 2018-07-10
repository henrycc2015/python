<template>
    <div class="app">
        <div class="entry-List" v-for="(item,index) in prdList" :key="index">
            <div class="MC_price">
                <p class="title">
                   <span>{{item.title}}</span><span class="tag">{{item.tag}}</span>
                </p>
                <p >
                    <span v-if="item.status == '01'" style="padding-right:1rem" class="number tetris-1px-r">剩余<em  style="padding:0 2px; font-size: .7rem">{{item.productNum}}</em>份</span>
                    <span v-if="item.status == '05' || item.status == '04'" style="padding-right:1rem" class="number"><em style="font-weight:500;">今日售罄</em></span>
                    <span v-if="item.status == '02'" style="padding-right:1rem" class="number tetris-1px-r"><em class="time_color">{{item.startDate}}</em></span>
                    <countDown class="number time_count" :currentDate='currentDate' :contentBefore='item.contentBefore' v-if="item.status == '02'|| item.status == '01'" :targetDate="item.targetDate" :callback="countDownCallback" endText="00:00:00">
                    </countDown>
                    <span class="number tetris-1px-l" v-if="item.status == '04'" style="padding-left:1rem"><em class="time_color">明天{{item.latestTime}}</em> 继续开始</span>
                    <span class="number" v-if="item.status == '03'"><em class="time_color">{{item.startDate}}</em> 开始</span>
                    <span class="number" v-if="item.status == '06'">活动结束<em></em></span>
                </p>
            </div>
            <div class="Price_new">
                <span class="price"><em class="price_n">{{'￥'+item.priceNew}}</em> 起 <s>{{'￥'+item.priceOld}}</s></span>
            </div>

            <button-group @click.native="goUrl(item.idSalesActivity,item.idSalesProduct)"  class="btn" size="mini" radius type="transparent">{{item.status == '01' ?'去秒杀' :'查看详情'}}</button-group>
        </div>
    </div>
    
</template>

<script>
import countDown from '@components/structure/count-down'
import buttonGroup from '@components/basic/button/button-group';
import dataCollect from 'src/utils/dataCollect';
export default {
  props: {
    prdList: Array,
    countDownCallback: {
      type: Function
    },
    currentDate: [Date]
  },
  components: {
    'countDown':countDown,
    'button-group': buttonGroup,
  },
  data() {
    return {};
  },
  methods: {
    goUrl(idSalesActivity, idSalesProduct) {
      dataCollect({
            eventID: '秒杀活动产品列表',
            eventLabel: '按钮点击'
        });
      this.$router.push({
        path:'/activity/marketingCampaign/mcPrd/'+ idSalesActivity+'/'+idSalesProduct,
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin.scss";
.entry-List {
  padding: px2rem(42) px2rem(30);
  width: 100%;
  background-color: #fff;
  position: relative;
  margin-bottom:px2rem(14);
  &:last-child {
    margin-bottom:0;
  }
  .title {
    font-size: px2rem(30);
    margin-bottom: px2rem(20);
    position: relative;
  }
  em {
    color: #e5654a;
    font-style: normal;
    font-weight: 700;
  }
  .MC_price {
    width: 100%;
    .tag {
      background: $c-high ;
      display: inline-block;
      font-size: px2rem(20);
      margin-left: px2rem(10);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: px2rem(3);
      color: #ffffff;
      padding: px2rem(2) px2rem(10);
    }

    .number {
      font-size: px2rem(28);
      margin-bottom: px2rem(3);
      color: #999;
      
    }
  }
  em.time_color {
    font-style: normal;
    color: $c-high ;
    font-weight: 500;
  }
  .time_count {
    margin-left: .66rem;
  }
  .price {
    color: #999;
    font-size: px2rem(30);
    .price_n {
      font-size: px2rem(40);
    }
  }
  .Price_new {
      margin-top:px2rem(50);
  }
  .btn {
    position: absolute;
    right: px2rem(32);
    bottom: px2rem(50);
    width: px2rem(160);
    height: px2rem(54);
  }
  
}
.margin-r-px2rem14 {
  margin-right: px2rem(14);
}
</style>

