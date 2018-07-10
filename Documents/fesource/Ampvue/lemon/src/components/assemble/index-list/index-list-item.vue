<template>
    <li 
        class="tetris-index-list-item"
        @touchstart="addActiveCls"
        @touchend="removeActiveCls"
        @click="selectItem()">
        <slot>
            <div class="tetris-index-list-item-def tetris-1px-b">{{ item.name }}</div>
        </slot>
    </li>
</template>

<script>

import {
    addClass,
    removeClass
} from 'src/utils/dom'

const ACTIVE_CLS = 'cube-index-list-item_active'

export default {
    name: 'index-list-item',
    props: {
        item: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        addActiveCls(e) {
            addClass(e.currentTarget, ACTIVE_CLS)
        },
        removeActiveCls(e) {
            removeClass(e.currentTarget, ACTIVE_CLS)
        },
        selectItem() {
            this.$emit('select', this.item);
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.tetris-index-list-item-def {
    position: relative;
    color: #333;
    font-size: 0.75rem;
    height: 2.35rem;
    line-height: 2.35rem;
    background-color: #fff;
    padding-left: 15px;
}
// .tetris-index-list-item_active {

// }
</style>