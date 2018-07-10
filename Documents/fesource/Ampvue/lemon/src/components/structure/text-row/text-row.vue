<template>
    <row :line="line" :border="border" :short-bottom-border="shortBottomBorder">
        <div class="row-hd">
            <slot name="title"></slot>
        </div>
        <div class="row-ft">
            <slot name="content"></slot>
        </div>
    </row>
</template>

<script>
import row from './row'
export default {
    name: 'text-row',
    components: {
        row
    },
    props: {
        line: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
        shortBottomBorder: {
            type: Boolean,
            default: true
        },
    },
}
</script>

<style lang="scss" scoped>
div {
    display: flex;
    word-break: break-all;
}

.row-hd {
    flex: 4;
    color: #999;
}

.row-ft {
    flex: 6;
    color: #333;
}
</style>
