<template>
	<div class="tetris-popup-header" :class="showBottomBorder ? 'tetris-1px-b' : ''">
		<div class="tetris-popup-header-left" @click="$emit('on-click-left')" >
            <slot name="left-text">{{ leftText }}</slot>
        </div>
        <div class="tetris-popup-header-center">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="tetris-popup-header-right" @click="$emit('on-click-right')" >
            <slot name="right-text">{{ rightText }}</slot>
        </div>
	</div>
</template>

<script>
export default {
    name: 'popupHeader',
	props: {
        leftText: String,
        rightText: String,
        title: String,
        showBottomBorder: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.tetris-popup-header {
    position: relative;
    display: flex;
    height: px2rem(100);
    line-height: px2rem(100);    
    background-color: #fff;
    font-size: px2rem(34);
    .tetris-popup-header-left {
        padding-left: 15px;
        color: $c-high ;
    }
    .tetris-popup-header-center {
        flex: 1;
        text-align: center;
        color: #333;
    }
    .tetris-popup-header-right {
        padding-right: 15px;
        color: $c-high ;
    }
}

</style>
