<template lang="html">
  <div :class="['recommand-insure',cls]"
  :style="{height: height,backgroundImage:backgroundImage}"
  @click="goInsurance" :lazy-background="lazy?`${backgroundImage},url('${product.picLink}')`:''">
    <h3>{{product.productName}}</h3>
    <div class="descText">
      <div>适用人群：{{product.crowd}}</div>
      <div></div>
    </div>
    <div class="descText">
      <div>保险期间：{{product.period}}</div>
      <div></div>
    </div>
    <div class="priceLabel">{{product.memberPrice}}{{product.give?'':'元起'}}</div>
  </div>
</template>

<script>
import * as fetch from 'src/utils/fetch';
import js_open_browser from 'src/hybrids/cell/js_open_browser';
import js_html_viewer from 'src/hybrids/cellb/js_html_viewer';
import goWebviewMixin from 'src/mixins/goWebview';
import getInsureProduct from 'src/utils/insuranceProducts';
const layer = '-webkit-linear-gradient(top, rgba(0,0,0,0.2),rgba(0,0,0,0.5))';
const defaultImg =
	'https://home.pingan.com.cn/m/insurance_release/fastPublish/images/idefault_big.jpg';
export default {
	mixins: [goWebviewMixin],
	data() {
		return {
			backgroundImage: layer
		};
	},
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
		isEnterprise: {
			type: Boolean,
			default: false
		},
		height: {
			type: String,
			default: ''
		},
		cls: {
			type: String,
			default: ''
		},
		lazy: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		product() {
			let obj = Object.assign({}, this.item);
			obj.idCsspProduct = obj.idCsspProduct || obj.productId;
			obj.productName = obj.productName || obj.name;
			obj.picLink = obj.picLink || obj.img;
			obj.crowd = obj.crowd || obj.shiyongrenqun;
			obj.memberPrice = obj.memberPrice || obj.payPremium;
			return getInsureProduct(obj, this.isEnterprise);
		}
	},
	created() {
		if (!this.lazy) {
			var bgimg = new Image();
			bgimg.onerror = () => {
				this.backgroundImage = `${layer},url('${defaultImg}')`;
			};
			bgimg.onload = () => {
				this.backgroundImage = `${layer},url('${this.product.picLink}')`;
			};
			bgimg.src = this.product.picLink;
		}
	},
	methods: {
		showConfirm() {
			this.$tetris.confirm.show({
				titleText: '温馨提示',
				content: '请升级至最新版本的好福利APP，购买"关爱一生"产品',
				confirmText: '确定',
				closeOnConfirm: false,
				onConfirm() {
					js_open_browser(location.origin + '/m/');
				}
			});
		},
		/*保险产品点击跳转*/
		goInsurance() {
			const idInsureProduct = this.product.idCsspProduct;
			const productName = this.product.productName;
			this.dataCollect(
				Object.assign(
					{},
					{
						eventID: '保险产品',
						eventLabel: `${
							this.isEnterprise ? '企业专属' : '公共'
						}_${idInsureProduct}_${productName}`
					},
					this.eventObj
				)
			);
			//关爱一生跳转－－特殊处理
			if (['PE000023', 'PE000012'].indexOf(idInsureProduct) !== -1) {
				const ios = /iPhone|iPad/i.test(navigator.userAgent);
				if (window.isApp) {
					if (
						(ios && window.iosBundleVersion <= 879) ||
						(!ios && window.healthAppObj.getAppVersionCode() <= 193)
					) {
						return this.showConfirm();
					}
				}
				fetch
					.post('/m/insure/getThirdPartyProductDetailUrl.doh', {
						idInsureProduct
					})
					.then(res => {
						let redirectURL = res.productAddressURL;
						redirectURL = redirectURL.replace('http://', 'https://');
						if (window.isApp) {
							const param = {
								title: '关爱一生',
								url: redirectURL,
								safariOpen: [
									'http://yl.pingan.com/px/informationDisclosure/gfgsxx.shtml',
									'http://yl.pingan.com/px/publicInfoDisclosure/infoDisclosure/solvencyInfo.shtml'
								]
							};
							return js_html_viewer(param);
						} else {
							return (location.href = redirectURL);
						}
					});
			} else {
				this.goWebview(this.product.url);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin.scss";
.recommand-insure {
  position: relative;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #fff;
  padding-bottom: px2rem(20);
  padding-left: px2rem(24);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-pack: end;
  height: 8.75rem;
  h3 {
    font-size: px2rem(34);
    margin-bottom: 0.25rem;
  }
  & > .descText{
    display: -webkit-box;
    font-size: px2rem(22);
    &>div:last-child{
      width: 5.2rem;
    }
    &>div:first-child{
      -webkit-box-flex:1;
    }
  }
  & > .priceLabel {
    position: absolute;
    z-index: 200;
    right: 0;
    bottom: px2rem(20);
    background-color: transparent;
    font-size: px2rem(30);
    width: 4.8rem;
    height: px2rem(50);
    line-height: px2rem(50);
    white-space: nowrap;
    padding-right: px2rem(16);
    text-align: right;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    z-index: 100;
    right: 0;
    bottom: px2rem(20);
    // vertical-align: top;
    border-top-width: px2rem(25);
    border-bottom-width: px2rem(25);
    border-right-width: 4.8rem;
    border-color: $c-high;
    border-style: solid;
    border-left: px2rem(12) solid transparent;
  }
}
</style>
