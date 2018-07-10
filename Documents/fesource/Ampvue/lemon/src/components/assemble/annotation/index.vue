<template>
    <div class="annotation" :style="{'text-align': tl, 'line-height':lh}" :class="setClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
	name: 'annotation',
	// tl text-align
	// lh line-height
	// padding 设置padding-top 和pading-bottom，参数可为 top, bottom
	props: {
		tl: {
			type: String
		},
		lh: {
			type: String
		},
		position: {
			type: String
		}
	},
	data() {
		return {
			classList: ''
		};
	},
	computed: {
		setClass() {
			if (this.position === 'top') {
				this.classList = 'pt';
			} else if (this.position === 'bottom') {
				this.classList = 'pb';
			}
			return this.classList;
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.annotation {
    background-color: #efefef;
    min-height: px2rem(66);
    line-height: 1.4;
    padding: px2rem(18) 15px;
    font-size: px2rem(24);
    color: #999;
    text-align: center;
}
.pt {
    padding-top: px2rem(14);
}
.pb {
    padding-top: px2rem(26);
	padding-bottom: px2rem(10);
}
</style>
