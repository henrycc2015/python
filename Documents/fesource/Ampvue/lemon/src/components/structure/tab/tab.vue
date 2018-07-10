<template>
	<div class="tetris-1px-b">
		<div class="tetris-tab" ref="tab" :class="{'tetris-tab-scrollable': scrollable,'tetris-tab-no-animate': !animate}">
		<!--<div class="scroll">-->
			<slot>
				<tab-item v-if="itemData.length>0" v-for="(item, index) in itemData" :selected=item.selected :key="index">{{item.name}}</tab-item>
			</slot>
			<!--
			<div v-if="animate" class="tetris-tab-bar" :class="barClass" :style="barStyle">
				<span class="tetris-tab-bar-inner" :style="innerBarStyle" 
				></span>
			</div>
			-->
		</div>
	</div>
</template>


<script>
import { parentMixin } from 'src/mixins/multi-items';
import tabItem from '@components/structure/tab/tab-item';

export default {
	name: 'tab',
	mixins: [parentMixin],
	components: {
        tabItem,
    },
	data() {
		return {
			direction: 'forward',
			right: '100%',
			hasReady: false
		}
	},
	props: {
		itemData: {
			type: Array,
			default: function(){
				return []
			}
		},
		animate: {
			type: Boolean,
			default: true
		},
		barHeight: {
			type: Number,
			default: 4
		},
		activeColor: {
			type: String,
			default: '#d7ac62'
		},
		barActiveColor: {
			type: String,
			default: '#d7ac62'
		},
		scrollable: {
			type: Boolean,
			default: false
		},
		defaultColor: String,
		// customBarWidth: [Function, String],
		// preventDefault: Boolean
		
	},
	mounted () {
		this.$nextTick(() => {
			// let itemArr = Object.keys(this.$refs.tab.children);
			// let len = itemArr.length;
			// this.scrollable = len > 4 ? true : false;
			setTimeout(() => {
				this.hasReady = true
			}, 0)
		})
	},
	computed: {
		barLeft () {
			return `${this.currentIndex * (100 / this.number)}%`
		},
		barRight () {
			return `${(this.number - this.currentIndex - 1) * (100 / this.number)}%`
		},
		innerBarStyle () {
			return {
				// width: typeof this.customBarWidth === 'function' ? this.customBarWidth(this.currentIndex) : this.customBarWidth,
				backgroundColor: this.barActiveColor || this.activeColor
			}
		},
		barStyle () {
			const commonStyle = {
				left: this.barLeft,
				right: this.barRight,
				display: 'block',
				height: this.barHeight/2 + 'px',
				transition: !this.hasReady ? 'none' : null
			}
				
			commonStyle.backgroundColor = this.barActiveColor || this.activeColor
			
			return commonStyle
		},
		barClass () {
			return {
				'tetris-tab-bar-transition-forward': this.direction === 'forward',
				'tetris-tab-bar-transition-backward': this.direction === 'backward'
			}
		}
	},
	watch: {
		currentIndex (newIndex, oldIndex) {
			// new > old 向右滑 反之 向左
			this.direction = newIndex > oldIndex ? 'forward' : 'backward';
			this.$emit('on-index-change', newIndex, oldIndex)
		}
	},
	created() {
		
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';

$tab-text-default-color: #333;
$tab-text-active-color: $c-high;
$easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
$duration: .3s;


.tetris-tab {
	position: relative;
	display: flex;
	background-color: $c-white;
	height: px2rem(88);
	width: 100%;
}
// .scroll {
// 	width: auto;
// 	position: relative;
// 	display: flex;
// 	overflow-x: auto;
// }
.tetris-tab-bar {
	position: absolute;
	left: 0;
	bottom: 0;
	height: 2px;
	background-color: $tab-text-active-color;
	text-align: center;
	&-transition-forward {
		transition: right $duration $easing-in-out,
		left $duration $easing-in-out;
	}
	&-transition-backward {
		transition: right $duration $easing-in-out ,
		left $duration $easing-in-out;
	}
}
.tetris-tab-item {
	display: block;
	flex: 1;
	width: 100%;
	height: 100%;
	font-size: px2rem(32);
	text-align: center;
	line-height: px2rem(88);
	color: $tab-text-default-color;
	border-bottom: px2rem(4) solid transparent;

	&.tetris-tab-selected {
		color: $tab-text-active-color;
		border-bottom: px2rem(4) solid $tab-text-active-color;
		border-bottom-style: solid;
		border-bottom-width: px2rem(4);
	}
	&.tetris-tab-disabled {
		color: $c-lightgrey;
	}
}
.tetris-tab.tetris-tab-no-animate .tetris-tab.tetris-tab-selected {
	background: 0 0;
}
.tetris-tab-inner {
	display: block;
	background-color: $tab-text-active-color;
	margin: auto;
	height: 100%;
	transition: width 0.3s $easing-in-out;
}
.tetris-tab-scrollable {
	overflow-y: hidden;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: content-box;
	&::-webkit-scrollbar {
		display: none;
	}
	.tetris-tab-item {
		display: inline-block;
		width: auto;
		padding: 0 px2rem(30);
		flex: none;
	}
}
</style>
