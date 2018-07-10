<template>
  <header class="tetris-header" :style="{ height}">
    <slot></slot>
  </header>
</template>

<script>
export default {
    name: 'TSHeader',
    props: {
        height: {
            type: String,
            default: 'auto'
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.tetris-header {
    flex-shrink: 0;
}

</style>