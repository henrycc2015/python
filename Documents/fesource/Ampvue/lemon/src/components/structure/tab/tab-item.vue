<template>
	<div 
		class="tetris-tab-item"
		:class="[currentSelected ? activeClass : '', {'tetris-tab-selected': currentSelected, 'tetris-tab-disabled': disabled}]"
		:style="style"
		@click="onItemClick">
		<slot></slot>
	</div>
</template>

<script>
import { childMixin } from 'src/mixins/multi-items'
export default {
	name: 'tab-item',
	mixins: [childMixin],
	data() {
		return {

		}
	},
	props: {
		activeClass: String,
		disabled: Boolean
	},
	computed: {
		style () {
			return {
				borderWidth: this.$parent.barHeight/2 + 'px',
				borderColor: this.$parent.activeClass,
				color: this.currentSelected ? this.$parent.activeClass : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
				border: this.currentSelected ? this.$parent.activeClass : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
				// border: this.$parent.animate ? 'none' : 'auto'
			}
		}
		
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>

</style>
