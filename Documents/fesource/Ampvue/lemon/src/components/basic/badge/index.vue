<template>
	<span class="tetri-badge">
		<slot></slot>
	</span>
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

<style lang="scss">
@import 'src/style/mixin.scss';
.tetri-badge {
    padding: 2px 4px;
    background-color: $c-high ;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
}
</style>
