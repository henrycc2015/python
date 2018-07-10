<template>
    <li class="tetris-index-list-item" @click="selectItem()">
        <slot>
            <div class="tetris-index-list-item-def tetris-1px-b">
                <div>
                    {{ item.name }}
                </div>
                <div v-if="showSelected">
                    <i-icon name="check-bold" color="#d7ac62" size="50"></i-icon>
                </div>
            </div>
        </slot>
    </li>
</template>

<script>
    import icon from '@components/basic/icon'

    export default {
        name: 'index-list-item',
        components: {
            'i-icon': icon
        },
        props: {
            item: {
                type: Object,
                default () {
                    return {}
                }
            },
            selectedValue: {},
            singleSelect: {
                type: Boolean,
                default: false
            },
            mutipleSelect: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            showSelected: function () {
                let result = false
                if ((this.singleSelect || this.mutipleSelect) && this.selectedValue && this.selectedValue.length >
                    0) {
                    for (let value of this.selectedValue) {
                        if (value == this.item.value) {
                            result = true
                            break
                        }
                    }
                }
                return result
            }
        },
        methods: {
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
        color: $c-black;
        font-size: 0.75rem;
        height: 2.35rem;
        line-height: 2.35rem;
        background-color: $c-white;
        padding-left: 15px;
        padding-right: 2rem;
        display: flex;
        justify-content: space-between;
    }
</style>