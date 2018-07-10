<template>
	<div class="tetris-empty">
		<img class="tetris-empty-img" src="./image/empty.png" alt="空" />
        <p class="tetris-empty-note"><slot></slot></p>
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
	props: [],
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.tetris-empty {
    .tetris-empty-img {
        display: block;
        width: 40%;
        height: auto;
        margin: px2rem(150) auto px2rem(76);
    }
    .tetris-empty-note {
        line-height: 1.75;
        text-align: center;
        font-size: px2rem(32);
        color: $c-grey;
		padding: 0 15px;
    }
}
</style>
