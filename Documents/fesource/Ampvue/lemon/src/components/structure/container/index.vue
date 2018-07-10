<template>
  <section class="tetris-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script>
export default {
    name: 'TSContainer',
    props: {
        direction: String
    },
    computed: {
        isVertical() {
            if (this.direction === 'vertical') {
                return true;
            } else if (this.direction === 'horizontal') {
                return false;
            }
            return this.$slots && this.$slots.default && this.$slots.default.some(vnode => {
                const tag = vnode.componentOptions && vnode.componentOptions.tag;
                return tag === 'ts-header' || tag === 'ts-footer';
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.tetris-container {
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    min-width: 0;
    &.is-vertical {
        flex-direction: column;
    }
}

</style>