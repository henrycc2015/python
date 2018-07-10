<template>
    <main class="tetris-main">
        <slot></slot>
    </main>
</template>

<script>
    export default {
        name: 'TSMain'
    }
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.tetris-main {
    overflow: auto;
    flex: 1;
    flex-basis: auto;
}

</style>