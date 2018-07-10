<template>
	<div class="tetris-net-error">
		<img class="tetris-net-error-img" src="./image/leaf.png" alt="网络无法链接" />
        <p class="tetris-net-error-note"><slot></slot></p>
        <slot name="content"></slot>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {

		}
	},
	props: []
}
</script>

<style lang="scss">
@import 'src/style/mixin';
.tetris-net-error {
    .tetris-net-error-img {
        display: block;
        width: 40%;
        height: auto;
        margin: px2rem(150) auto px2rem(76);
    }
    .tetris-net-error-note {
        line-height: 1.75;
        text-align: center;
        font-size: px2rem(32);
        color: $c-grey;
        padding: 0 15px;
    }
}
</style>
