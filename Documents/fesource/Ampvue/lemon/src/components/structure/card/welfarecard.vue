<template>
	<div class="tetris-welfarecard" :class="{'tetris-welfarecard-disable': disabled}">
		<div class="head">
			<slot></slot>
		</div>
		<div class="btn" @click="doNext">
			{{ btnText }}
		</div>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {

		}
	},
	props: {
		btnText: {
			type: String,
			default: '立即领取'
		},
		disabled: {
			type: Boolean
		}
	},
	methods: {
		doNext() {
			this.$emit('on-click')
		}
	},
}
</script>

<style lang="scss">
@import 'src/style/mixin';
.tetris-welfarecard {
	width: px2rem(710);
	height: auto;
	overflow: hidden;
	margin: 0 auto;
	.head {
		position: relative;
		padding: px2rem(30) px2rem(30) px2rem(26);
		border-bottom: 1px dashed #dcdcdc;
		background: #fff;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		&:before,&:after{
			position: absolute;
			bottom: px2rem(-10);
			content: '';
			width: px2rem(20);
			height: px2rem(20);
			border-radius: 50%;
			background-color: #efefef;
		}
		&:before {
			left: px2rem(-10);
		}
		&:after {
			right: px2rem(-10);
		}
	}
	.btn {
		width: 100%;
		height: px2rem(72);
		text-align: center;
		color: $c-high ;
		font-size: px2rem(28);
		line-height: px2rem(72);
		background: #fff;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		&:active {
			color: #b38f47;
		}
	}
}
.tetris-welfarecard-disabled .head,
.tetris-welfarecard-disabled .btn,
.tetris-welfarecard-disabled .btn:active{
	color: #999;
}

</style>
