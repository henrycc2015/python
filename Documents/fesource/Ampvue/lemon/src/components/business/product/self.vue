<template lang="html">
  <div class="recommand-own" @click="go">
    <img :src="imgUrl" alt="">
    <div>
      <p>{{item.productName}}</p>
      <p>{{item.pointsPrice}}豆</p>
    </div>
  </div>
</template>

<script>
import goWebviewMixin from 'src/mixins/goWebview';
export default {
	mixins: [goWebviewMixin],
	props: {
		item: {
			type: Object,
			default: {}
		}
	},
	computed: {
		imgUrl() {
			return this.item.url.replace(
				'http://ehis.qiniudn.com',
				'https://ohc0dpsgs.qnssl.com'
			);
		},
		linkUrl() {
			const i = this.item;
			return `client.html#entry/store/productDetails/${
				i.moduleId
			}/${i.batchNo || 'empty'}/${i.idProgram}/${
				i.idProduct
			}/${encodeURIComponent(i.moduleName)}/${encodeURIComponent(
				i.programName
			)}`;
		}
	},
	methods: {
		go() {
			this.goWebview(this.linkUrl);
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.recommand-own{
  display: -webkit-box;
  padding:0.6rem 0.5rem;
  background-color: #fff;
  img{
    display: block;
    width: px2rem(180);
    height: px2rem(140);
    border:1px solid #efefef;
  }
  &>div{
    margin-left:0.8rem;
    -webkit-box-flex:1;
    &>p:first-child{
      font-size: px2rem(30);
      color:$c-grey;
      margin-bottom: 0.15rem;
      padding-top: 0.1rem;
      height: 2.3rem;
      word-break: break-all;
    }
    &>p:last-child{
      font-size: px2rem(32);
      color:$c-high;
    }
  }
}
</style>
