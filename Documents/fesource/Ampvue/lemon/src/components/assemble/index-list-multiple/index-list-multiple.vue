<template>
    <div class="tetris-index-list">
        <v-scroll ref="indexList" :listen-scroll="listenScroll" :options="options" :data="data" @scroll="scroll">
            <div class="tetris-index-list-content" ref="content">
                <div v-if="title && customItems.items.length > 0" class="tetris-index-list-custom tetris-1px-b" ref="title">
                    <h6>{{title}}</h6>
                    <button-group type='bgredefine' @click.native="titleClick(item.value)" radius :disabled="!item.selected" v-for="(item,index) in customItems.items"
                        :key="index">{{item.name}}</button-group>
                </div>
                <ul v-show="!showSearchResult">
                    <slot>
                        <index-list-group v-for="(group, index) in data" :key="index" :singleSelect="singleSelect" :mutipleSelect="mutipleSelect"
                            :selectedValue="value" :group="group" @select="selectItem"></index-list-group>
                    </slot>
                </ul>
                <div v-show="showSearchResult">
                    <v-annotation v-if="searchResult.length == 0">未搜索到结果</v-annotation>
                    <ul v-else>
                        <index-list-item v-for="(item, index) in searchResult" :key="index" :item="item" :singleSelect="singleSelect" :mutipleSelect="mutipleSelect"
                            :selectedValue="value" @select="selectItem"></index-list-item>
                    </ul>
                </div>
            </div>
        </v-scroll>
        <div class="tetris-index-list-nav" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" v-show="!showSearchResult">
            <ul class="tetris-index-list-nav-list">
                <li v-for="(item, index) in shortcutList" :data-index="index" class="tetris-index-list-nav-item" :class="{active: currentIndex === index}"
                    :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="tetris-index-list-fixed tetris-index-list-anchor" ref="fixed" v-show="fixedTitle && !showSearchResult">
            {{ fixedTitle }}
        </div>
    </div>
</template>

<script>
    import buttonGroup from '@components/basic/button/button-group'
    import VScroll from '@components/assemble/scroll'
    import indexListGroup from './index-list-group'
    import indexListItem from './index-list-item'
    import Annotation from '@components/assemble/annotation'

    import {
        getData,
        getRect,
        prefixStyle
    } from 'src/utils/dom';

    const ANCHOR_HEIGHT = 18;
    const transformStyleKey = prefixStyle('tranform');

    export default {
        name: 'index-list',
        components: {
            buttonGroup,
            indexListGroup,
            VScroll,
            indexListItem,
            'v-annotation': Annotation,
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            custom: {
                type: Object,
                default () {
                    return {}
                }
            },
            speed: {
                type: Number,
                default: 0
            },
            singleSelect: {
                type: Boolean,
                default: false
            },
            mutipleSelect: {
                type: Boolean,
                default: false
            },
            value: {},
            showSearchResult: {
                type: Boolean,
                default: false
            },
            searchResult: {
                type: Array,
                default: []
            },
        },
        data() {
            return {
                scrollY: -1,
                diff: -1,
                options: {
                    probeType: 3
                },
                currentIndex: 0,
                titleHeight: null,
            };
        },
        created() {
            this.listenScroll = true;
            this.groupList = [];
            this.listHeight = [];
            this.subTitleHeight = 0;
            this.touch = {};
        },
        mounted() {
            this.$nextTick(() => {
                this.titleHeight =
                    this.title && this.$refs.title ? getRect(this.$refs.title).height : 0;
                this._calculateHeight();
            });
        },
        computed: {
            customItems() {
                let result = {items:[]}
                for (let item of this.custom.items) {
                    if (this.showSearchResult) {
                        for (let searchResultItem of this.searchResult) {
                            if (item.value == searchResultItem.value) {
                                result.items.push(item)
                                break
                            }
                        }
                    }
                    else {
                        result.items.push(item)
                    }
                }
                if (result && result.items && result.items.length > 0) {
                    for (let item of result.items) {
                        item.selected = false
                    }
                    if (this.value && this.value.length > 0) {
                        for (let item of result.items) {
                            for (let valueStr of this.value) {
                                if (item.value == valueStr) {
                                    item.selected = true
                                    break
                                }
                            }
                        }
                    }
                }
                return result
            },
            fixedTitle() {
                if (this.titleHeight === null || this.scrollY > -this.titleHeight) {
                    return '';
                }

                return this.data[this.currentIndex] ? this.data[this.currentIndex].name : '';
            },
            shortcutList() {
                return this.data.map(group => {
                    return group ? group.shortcut || group.name.substr(0, 1) : '';
                });
            }
        },
        methods: {
            selectItem(item) {
                if (this.mutipleSelect) {
                    let result = [...this.value]
                    let selectedIndex = -1
                    for (let i = 0; i < result.length; i++) {
                        if (result[i] == item.value) {
                            selectedIndex = i
                            break
                        }
                    }
                    //原来已选中
                    if (selectedIndex >= 0) {
                        result.splice(selectedIndex, 1)
                    } else {
                        //原来未选中
                        result.push(item.value)
                    }
                    this.$emit('input', result)
                } else {
                    this.$emit('input', [item.value])
                }
            },
            scroll(pos) {
                this.scrollY = pos.y;
            },
            titleClick(val) {
                this.selectItem({
                    value: val
                })
            },
            onShortcutTouchStart(e) {
                // nav touch event
                let anchorIndex = getData(e.target, 'index');
                let firstTouch = e.touches[0];
                this.touch.y1 = firstTouch.pageY;
                this.touch.anchorIndex = anchorIndex;

                this._scrollTo(anchorIndex);
            },
            onShortcutTouchMove(e) {
                // nav touch event move
                let firstTouch = e.touches[0];
                this.touch.y2 = firstTouch.pageY;
                let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta;

                this._scrollTo(anchorIndex);
            },
            _calculateHeight() {
                this.groupList = this.$el.getElementsByClassName('tetris-index-list-group');
                const subTitleEl = this.$el.getElementsByClassName('tetris-index-list-anchor')[0];
                this.subTitleHeight = subTitleEl ? getRect(subTitleEl).height : 0;
                this.listHeight = [];

                if (!this.groupList) {
                    return;
                }

                let height = this.titleHeight;
                this.listHeight.push(height);
                for (let i = 0; i < this.groupList.length; i++) {
                    let item = this.groupList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            _scrollTo(index) {
                if (index < 0) {
                    index = 0;
                } else if (index > this.listHeight - 2) {
                    index = this.listHeight.length - 2;
                }
                this.$refs.indexList.scrollToElement(this.groupList[index], this.speed);
                this.scrollY = this.$refs.indexList.scroll.y;
            }
        },
        watch: {
            data() {
                this.$nextTick(() => {
                    this._calculateHeight();
                });
            },
            title(newVal) {
                this.$nextTick(() => {
                    this.titleHeight = newVal && this.$refs.title ? getRect(this.$refs.title).height : 0;
                    this._calculateHeight();
                });
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < this.subTitleHeight) ? newVal - this.subTitleHeight : 0;
                if (this.fixedTop === fixedTop) {
                    return;
                }
                this.fixedTop = fixedTop;
                this.$refs.fixed.style[transformStyleKey] = `translate3d(0,${fixedTop}px,0`;
            },
            scrollY(newY) {
                const listHeight = this.listHeight;
                // top
                if (newY > -this.titleHeight) {
                    this.currentIndex = 0;
                    return;
                }

                // mid
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return;
                    }
                }

                // bottom
                this.currentIndex = listHeight.length - 2;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "src/style/mixin";

    .tetris-index-list {
        position: relative;
        height: 100%;
        overflow: hidden;
    }

    .tetris-index-list-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden; //   transition: all
    }

    .tetris-index-list-content {
        /* background: #efefef; */
        height: 100%;
        overflow: auto;
    }

    .tetris-index-list-title {
        padding: 15px;
        font-size: px2rem(30);
        color: #666;
        background: #fff;
    }

    .tetris-index-list-custom {
        width: 100%;
        padding: 15px;
        background-color: #fff;
        h6 {
            color: #333;
            font-size: px2rem(26);
        }
        button {
            margin-top: px2rem(30);
            margin-right: px2rem(20);
            padding: 0 px2rem(20);
            font-size: px2rem(28);
        }
    }

    .tetris-index-list-anchor {
        padding: 6px 15px;
        line-height: 1;
        font-size: px2rem(20);
        background-color: #f7f7f7;
    }

    .tetris-index-list-fixed {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
    }

    .tetris-index-list-nav {
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 5;
        transform: translateY(-50%);
        >ul {
            padding: 0;
            margin: 0;
            >li {
                padding: 6px 16px 0 16px;
                line-height: 1;
                font-size: px2rem(24);
                text-align: center;
                color: #007aff;
                background: transparent;
                &.active {
                    color: #f40;
                }
            }
        }
    }
</style>