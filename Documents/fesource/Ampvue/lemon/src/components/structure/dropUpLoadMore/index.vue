<template lang="html">
  <div ref="container" :class="['dropUpLoadMore',cls]" @touchstart="onTouchstart" @touchmove.stop="onTouchmove" @touchend.stop="onTouchend">
    <slot v-show="hasData"></slot>
    <div class="tip" v-show="hasData">
      <i :class="['tetris',spinner?'spinner':'',revert?'revert':'']" v-show="hasMore">{{icon?'&#xe609;':''}}</i>
      <div :style="{color:hasMore?'#666':'#999'}">{{text}}</div>
    </div>
    <empty v-if="!hasData">emptyTxt</empty>
  </div>
</template>

<script>
import Empty from '@components/pages/empty';
const labels = ['上拉加载更多', '松开立即加载', '正在加载...', '暂无更多数据'];
export default {
	props: {
		more: {
			type: Boolean,
			default: true
		},
		cls: {
			type: String,
			default: ''
		},
		hasData: {
			type: Boolean,
			default: false
		},
		emptyTxt: {
			type: String,
			default: '暂时没有相关数据'
		}
	},
	data() {
		return {
			status: 0,
			revert: false,
			icon: true,
			hasMore: true,
			spinner: false
		};
	},
	computed: {
		text() {
			return labels[this.status];
		}
	},
	watch: {
		more() {
			this.status = this.more ? 0 : 3;
		},
		status() {
			switch (this.status) {
				case 0:
					this.hasMore = true;
					this.icon = true;
					this.revert = false;
					this.spinner = false;
					break;
				case 1:
					this.hasMore = true;
					this.icon = true;
					this.revert = true;
					this.spinner = false;
					break;
				case 2:
					this.hasMore = true;
					this.icon = false;
					this.revert = false;
					this.spinner = true;
					break;
				case 3:
					this.hasMore = false;
					break;
			}
		}
	},
	created() {
		this.status = this.more ? 0 : 3;
	},
	methods: {
		onTouchstart(e) {
			if (this.status === 3) return;
			this.startY = e.touches[0].pageY;
			this.lastY = this.startY;
		},
		onTouchmove(e) {
			//当前Y坐标
			let currentY = e.targetTouches[0].pageY;
			//是否上拉
			let isDropUp = this.lastY - currentY > 0;
			this.lastY = currentY;
			let container = this.$refs.container;
			let scrollTop = container.scrollTop;
			let clientHeight = container.clientHeight;
			let scrollHeight = container.scrollHeight;
			if (scrollHeight - scrollTop - clientHeight > 1 || this.status === 3) {
				this.startY = null;
				return;
			}
			if (this.startY === null) {
				this.startY = this.lastY;
			}
			//当前Y坐标轴位移
			let offsetY = this.startY - currentY;
			let transitionY = offsetY * 0.3;
			if (isDropUp || (!isDropUp && offsetY > 0)) {
				e.preventDefault();
			}
			container.style.webkitTransition = '-webkit-transform 0s ease-out';
			container.style.webkitTransform =
				'translate3d(0,' + -transitionY + 'px,0)';
			if (transitionY > 40 && this.status === 0) {
				this.status = 1;
			}
			if (transitionY <= 40 && this.status === 1) {
				this.status = 0;
			}
		},
		onTouchend(e) {
			let container = this.$refs.container;
			container.style.webkitTransition = '-webkit-transform 0.2s ease-out';
			container.style.webkitTransform = 'translate3d(0,0,0)';
			if (this.status === 3) return;
			//如果状态是‘松开立即加载，则执行回掉’
			if (this.status === 1) {
				this.status = 2;
				this.$emit('update');
			}
		}
	},
	components: {
		Empty
	}
};
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin.scss';
  @keyframes loading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
      transform-origin: center center;
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
      transform-origin: center center;
    }
  }
  .dropUpLoadMore{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .tip{
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: center;
      background: #efefef;
      height: 2rem;
      font-size: px2rem(28);
      &>i{
        display: block;
        color:#666;
        transition: transform 0.2s ease-out;
        &.revert{
          transform: rotate(180deg);
        }
      }
      &>div{
        margin-left:3px;
      }
    }
    .spinner{
      display: block;
      width: 1rem;
      height: 1rem;
      transform-origin: 50%;
      animation: loading 1s steps(12,end) infinite;
      background-image: url("data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><line id='l' x1='60' x2='60' y1='7' y2='27' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round'/></defs><g><use xlink:href='%23l' opacity='.27'/><use xlink:href='%23l' opacity='.27' transform='rotate(30 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(60 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(90 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(120 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(150 60,60)'/><use xlink:href='%23l' opacity='.37' transform='rotate(180 60,60)'/><use xlink:href='%23l' opacity='.46' transform='rotate(210 60,60)'/><use xlink:href='%23l' opacity='.56' transform='rotate(240 60,60)'/><use xlink:href='%23l' opacity='.66' transform='rotate(270 60,60)'/><use xlink:href='%23l' opacity='.75' transform='rotate(300 60,60)'/><use xlink:href='%23l' opacity='.85' transform='rotate(330 60,60)'/></g></svg>");
    }
  }
</style>
