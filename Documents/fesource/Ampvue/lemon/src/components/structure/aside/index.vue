<template>
    <aside class="tetris-aside" :style="{ width }">
        <slot></slot>
    </aside>
</template>

<script>
    export default {
        name: 'TSMain',
        props: {
            width: {
                type: String,
                default: '100px'
            }
        }
    }
</script>