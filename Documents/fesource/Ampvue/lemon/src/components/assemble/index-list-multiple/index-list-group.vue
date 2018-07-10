<template>
    <li class="tetris-index-list-group">
        <h2 class="tetris-index-list-anchor">{{ group.name }}</h2>
        <ul>
            <slot>
                <index-list-item v-for="(item, index) in group.items" :key="index" :item="item" :singleSelect="singleSelect" :mutipleSelect="mutipleSelect" :selectedValue="selectedValue" @select="selectItem"></index-list-item>
            </slot>
        </ul>
    </li>
</template>

<script>
    import indexListItem from './index-list-item';

    export default {
        name: 'index-list-group',
        components: {
            indexListItem
        },
        props: {
            group: {
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
        methods: {
            selectItem(item) {
                this.$emit('select', item);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .tetris-index-list-anchor {
        padding: 6px 15px;
        line-height: 1;
        font-size: px2rem(20);
        background-color: #f7f7f7;
    }

    // .tetris-index-list-nav {
    //     position: absolute;
    //     top: 50%;
    //     right: 0;
    //     z-index: 10;
    //     transform: translateY(-50%);
    //     > ul {
    //         padding: 0;
    //         margin: 0;
    //         > li {
    //             padding: 6px 16px 0 16px;
    //             line-height: 1;
    //             font-size: px2rem(24);
    //             text-align: center;
    //             color: #007aff;
    //             background: transparent;
    //             &.active {
    //                 color: #f40;
    //             }
    //         }
    //     }
    // }
</style>