<template>
    <table class="tetris-table">
        <slot></slot>
    </table>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import 'src/style/1px';
@import 'src/style/mixin';
.tetris-table{
    position: relative;
    border-collapse: collapse;
    width: 100%;
    &:before {
        @include setLeftLine();
    }
    &:after {
        @include setTopLine();
    }
    td, th {
        position:relative;
        border-right: 0;
        border-bottom: 0;
        font-weight:normal;
        &:before {
            @include setBottomLine();
        }
        &:after {
            @include setRightLine();
        }
    }
}
</style>
