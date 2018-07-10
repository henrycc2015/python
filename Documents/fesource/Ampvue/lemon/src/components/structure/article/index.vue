<template>
	<div class="tetris-article">
        <h2>{{ title }}</h2>
		<section><slot></slot></section>
	</div>
</template>

<script>
export default {
	name: 'v-article',
	data() {
		return {

		}
	},
	props: {
		title: {
			type: String
		},
	},

}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.tetris-article {
	padding: 15px 15px px2rem(35);
    width: 100%;
    background-color: #fff;
	h2 {
		@extend %font-h3;
        line-height: px2rem(60);
	}
	section {
		@extend %font-n6;
        line-height: 2;
        text-align:justify;
	}
}


</style>
