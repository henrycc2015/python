<template lang="html">
  <div :class="raiseEnd=='Y'?'recommand-finance fundClose':'recommand-finance'" @click="goFinance()">
    <h3 :class="fundCode==='CF1001'||fundCode==='LU1001'&&'margin-center'" >{{productName}}</h3>
    <h5 v-if="BK1001">2016年最高涨幅</h5>
		<h5 v-if="productType === '0' && productChannel === '01'">预期年化收益率</h5>

    <h4 v-if="fundCode!=='CF1001'&&fundCode!=='LU1001'" :class="{'lastSeven':showYield}">
      <i class="yield" v-if="showYield">过去七日<br/>年化收益率</i>
      <span class="pre">{{productYield.substr(0, 1)}}</span><span class="las">{{productYield.substr(1)}}</span><span class="percent">%</span>
    </h4>
		<h4 v-else class="sold-out">
    </h4>
    <aside v-if="fundCode!=='CF1001'&&fundCode!=='LU1001'">
      <p>{{isExpectedProduct?'起购金额':'首购金额'}}&nbsp;<span>{{productAmount}}</span><label>{{isExpectedProduct?'元':'元起'}}</label></p>
      <p v-if="showTerm">投资期限&nbsp;<span>{{productTerm}}</span><label>天起</label></p>
			<p v-if="isExpectedProduct">
				{{item.raiseEnd === 'Y'? '本次募集已结束':'募集期至&nbsp;'}}<span class="font-size-24">{{item.raiseEnd === 'Y'? '': raiseEndTime}}</span>
			</p>



      <p v-if="showft">复投金额&nbsp;<span>0.01</span><label>元起</label></p>
      <p v-if="BK1001">可兑换实物金</p>
    </aside>

		<aside class='txt-center' v-else>
			<p>资产查询</p>
    </aside>
  </div>


</template>

<script>
import goWebviewMixin from 'src/mixins/goWebview';
import js_cfb_open from 'src/hybrids/cellb/js_cfb_open';
import js_anydoor_open from 'src/hybrids/cellb/js_anydoor_open';
const financeList = [
	'PA9003', //工资宝
	'PA9007', //富盈7号
	'CF0001', //聚财宝
	'LU1001', //陆金所
	'CF1001', //财富宝
	'BK1001' //黄金认购
];
export default {
	mixins: [goWebviewMixin],
	props: {
		item: {
			type: Object,
			default() {
				return {};
			}
		},
		eventObj: {
			type: Object,
			default() {
				return {};
			}
		},
		source: {
			type: String,
			default: ''
		}
	},
	computed: {
		/*产品名称*/
		productName() {
			return this.fundCode === 'BK1001'
				? '黄金认购'
				: this.initParam('seriesName', 'productName');
		},
		/*七日年化收益率*/
		productYield() {
			return this.initParam('seriesYield', 'productYield');
		},
		/*首购金额*/
		productAmount() {
			return this.initParam('seriesAmount', 'productAmount');
		},
		/*投资期限*/
		productTerm() {
			return this.initParam('inverstTerm', 'productTerm');
		},
		/*产品类型*/
		productType() {
			return this.initParam('productType', 'productType');
		},
		/*预期收益型募集期*/
		raiseEndTime() {
			return this.initParam('raiseEndTime', 'raiseEndTime').substr(0, 10);
		},
		/*01养老险自由产品 否则第三方产品*/
		productChannel() {
			return this.initParam('productChannel', 'productChannel');
		},
		/*是否预期收益型产品*/
		isExpectedProduct() {
			return this.productType === '0' && this.productChannel === '01';
		},
		/*是否募集期有效*/
		raiseEnd() {
			return this.initParam('raiseEnd', 'raiseEnd');
		},
		// item.productList[0].productChannel
		// /*是否显示七日年化收益率*/
		showYield() {
			//新增预期收益型逻辑)
			if (
				this.initParam('productType', 'productType') === '0' &&
				this.initParam('productChannel', 'productChannel') === '01'
			)
				return false;
			else
				return (
					(['PA9007', 'PA9003', 'CF0001'].indexOf(this.fundCode) !== -1 ||
						this.otherProduct) &&
					this.item.productList.length === 1
				); //原有逻辑
		},
		/*是否显示投资期限*/
		showTerm() {
			if (
				this.initParam('productType', 'productType') === '0' &&
				this.initParam('productChannel', 'productChannel') === '01'
			)
				return false;
			else
				return (
					this.item.productList.length > 1 ||
					['PA9007', 'LU1001', 'CF1001'].indexOf(this.fundCode) !== -1 ||
					this.item.linkUrl ||
					this.otherProduct
				);
			// &&(this.initParam('productType', 'productType') !== '0' && this.initParam('productChannel', 'productChannel') !== '01');//新增预期收益型逻辑;
		},
		showft() {
			return this.fundCode === 'PA9003' && this.item.productList.length < 2;
		},
		otherProduct() {
			return (
				this.item.productList.length === 1 &&
				financeList.indexOf(this.fundCode) === -1
			);
		},
		fundCode() {
			const productList = this.item.productList;
			if (productList && productList.length > 0) {
				return productList[0].fundCode;
			}
			return '';
		},
		BK1001() {
			return this.fundCode === 'BK1001';
		}
	},
	methods: {
		initParam(a, b) {
			if (this.item.productList.length > 1) {
				return this.item[a];
			} else if (this.item.productList.length === 1) {
				return this.item.productList[0][b];
			}
		},
		/*理财产品点击跳转*/
		goFinance() {
			const pl = this.item.productList;
			const idProductSeries = this.item.idProductSeries;
			this.dataCollect(
				Object.assign(
					{},
					{
						eventID: '理财产品',
						eventLabel: `${idProductSeries}_${this.productName}`
					},
					this.eventObj
				)
			);
			if (this.fundCode === 'LU1001') {
				//陆金所
				return js_anydoor_open({
					pluginId: 'PA02500000000_02_YLXSZBZB'
				});
			} else if (this.fundCode === 'CF1001') {
				//财富宝
				return js_cfb_open();
			}
			if (pl.length < 1) return;
			// if (this.isWechatMall) {
			// 	// let url = `http://localhost:8080/insurance_unlogin/${link}`;

			// 	this.goWebview(
			//
			// 	)
			// } else
			// let link =	`client.html#finance/mall/listDetail/${idProductSeries}?source=04`;
			// location.href = `http://localhost:8080/insurance_unlogin/${link}`
			if (pl[0].linkUrl) {
				this.goWebview(pl[0].linkUrl);
			} else {
				this.goWebview(
					`client.html#finance/mall/listDetail/${idProductSeries}${
						this.source ? '?source=04' : ''
					}`
				);
			}
			// }
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.recommand-finance{
  background-color: #fff;
  padding:0.7rem;
  .yield{
    text-align: left;
    padding-left: 0.9rem;
    padding-top: 0.1rem;
    line-height: 1.3;
    position: absolute;
    left: 50%;
    top:-1rem;
    width: 4.5rem;
    height: 2.5rem;
    background-size: 100%;
    font-size: px2rem(24);
  	background-repeat: no-repeat;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 164.2 100" style="enable-background:new 0 0 164.2 100;" xml:space="preserve"><path fill="#D1A861" class="st0" d="M4.1,86.9V46.2c0-12.4,10.1-22.5,22.5-22.5v1c-11.9,0-21.5,9.6-21.5,21.5v37.4 c2.6-3.5,10.6-12.9,21.5-12.9h111c11.9,0,21.5-9.6,21.5-21.5v-3c0-11.9-9.6-21.5-21.5-21.5v-1c12.4,0,22.5,10.1,22.5,22.5v3 c0,12.4-10.1,22.5-22.5,22.5h-111C13.9,71.7,5.1,85.3,5,85.4L4.1,86.9z"/></svg>');
  }
  h3{
    color:$c-black;
    font-size: px2rem(34);
    margin-bottom: 0.8rem;
    &.mb0{
      margin-bottom:0;
    }
	}
	h3.margin-center{
		margin-bottom: 0;

	}
  h4{
    position: relative;
    line-height: 1.1;
    color:$c-high;
    text-align: center;
    &>.pre,&>.las{
      font-size: px2rem(100);
    }
    &>.percent{
      font-size: px2rem(74);
      margin-left: 0.1rem;
    }
    &.lastSeven{
      &>.pre{
        font-size: px2rem(140);
      }
      &>.las,&>.percent{
        font-size: px2rem(74);
      }
    }
	}
	h4.sold-out{
		height: 3.125rem;
		margin-top: .525rem;
		text-align: center;
		background-repeat: no-repeat;
		background-position: center;
		background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-495 320.9 200 200" style="enable-background:new -495 320.9 200 200;" xml:space="preserve"><circle style="fill:#FAF5EC;" cx="-395.1" cy="420.9" r="100"/><path style="fill:#D7AC62;" d="M-357.6,382.7h-75c-5,0-9.1,4.1-9.1,9.1v9.3h93.1v-9.3C-348.6,386.8-352.6,382.7-357.6,382.7z"/><path style="fill:#D7AC62;" d="M-381.5,442c0-11.1,9-20.1,20.1-20.1c4.9,0,9.4,1.8,12.9,4.7v-17h-93.1v40.3c0,5,4.1,9.1,9.1,9.1h60.5C-377.8,455.4-381.5,449.1-381.5,442z M-428.4,421h25.3c1,0,1.8,0.8,1.8,1.8c0,1-0.8,1.8-1.8,1.8h-25.3c-1,0-1.8-0.8-1.8-1.8C-430.2,421.8-429.4,421-428.4,421z M-395.8,437.6H-428c-1.3,0-2.3-0.8-2.3-1.8c0-1,1-1.8,2.3-1.8h32.2c1.3,0,2.3,0.8,2.3,1.8C-393.5,436.8-394.5,437.6-395.8,437.6z"/><path style="fill:#D1A861;" d="M-361.5,430.3c6.4,0,11.7,5.2,11.7,11.7s-5.2,11.7-11.7,11.7s-11.7-5.2-11.7-11.7S-367.9,430.3-361.5,430.3M-361.5,425.7c-9,0-16.3,7.3-16.3,16.3s7.3,16.3,16.3,16.3s16.3-7.3,16.3-16.3S-352.4,425.7-361.5,425.7L-361.5,425.7z"/><line style="fill:none;stroke:#D1A861;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;" x1="-348.9" y1="450.4" x2="-341.5" y2="454.3"/></svg>');
	}
  h5{
    text-align: center;
    font-size: px2rem(24);
    color:$c-grey;
  }
  aside{
    display: -webkit-box;
    -webkit-box-align:end;
    padding-top: 0.25rem;
    p{
      -webkit-box-flex:1;
      font-size: px2rem(24);
      color:$c-light;
      text-align: left;
      padding-left: 1rem;
      span{
        font-size: px2rem(38);
        color:$c-grey;
        line-height: 1;
      }
      label{
        color:$c-grey;
      }
			.font-size-24{
				font-size: px2rem(28);
				color: $c-high;
			}
		}

	}
	aside.txt-center{
		padding-top: .525rem;
		p{
			text-align: center;
			padding: 0;
			font-size: px2rem(30);
		}
	}

}
.fundClose{
    background-image: url(https://ohc0dpsgs.qnssl.com/finance/images/finance_mall_close.png);
    background-repeat: no-repeat;
    background-size: 4rem;
    background-position-x: 13.4rem;
    background-position-y: .55rem;

	}

</style>
