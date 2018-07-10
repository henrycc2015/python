<template>
    <footer class="tetris-footer" :style="{ height}">
        <slot></slot>
    </footer>
</template>

<script>
export default {
    name: 'TSFooter',
    props: {
        height: {
            type: String,
            default: 'auto'
        }
    },
    
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';


</style>