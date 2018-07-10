<template>
    <div class="tetris-1px-b" v-if="items.length > 0">
        <div class="slidenav" ref="nav" >
            <nav ref="slidenav" :class="{'slidenav-scrollable': scrollable}">
                <div class="item" v-for="item in items" :data-type="item.index" :class="{active: current == item.index}" @click="tab" :key="item.index" >
                    {{ item.title }}
                </div>
            </nav>
            <div class="line" :style="{left: left }" ref="line"></div>
        </div>
    </div>
</template>

<script>
export default {
    //组件名字，可选
    name: 'slidenav',

    //混合对象
    mixins: [],

    //注册组件
    components: {

    },

    //组件入参
    props: {
        active: {
            type: String,
        },
        itemData: {
            type: Array,
            default: function(){
                return []
            }
        },
        scrollable: {
			type: Boolean,
			default: false
		},
    },

    //组件响应式数据
    data() {
        return {
            // scrollable: false,
            current: this.active,
            // items: ['乐乐', '李乐乐', '李子乐乐', '乐乐李', '李子', '乐李李', '乐李李', '李子李乐', '乐李乐李'],
            items: this.itemData,
            left: 6,
            textLen: [],
            clientW: 0,
            navLeft: '0',
            widthArr: [],
        }
    },

    //el 和 data 并未初始化 
    beforeCeate(){

    },

    //完成了 data 数据的初始化，el没有
    created() {
        this.current = this.active || this.itemData[0].index;
        console.log('created ', this.current);
    },

    mounted () {
        this.clientW = document.body.clientWidth;
        this.calLen();
        // const itemChildren = this.$refs.slidenav.children;
        // for(let obj of itemChildren){
        //     this.widthArr.push(obj.offsetWidth);
        // }
        // console.log('widthARR' + this.widthArr);
    },
    //组件内部方法
    methods: {
        calLen() {
            this.items.forEach((item) => {
                this.textLen.push(item.title.length);
            });
            this.lineLeft();
        },
        tab(e) {
            const el = e.target;
            const n = el.getAttribute('data-type');
            this.current = n;
            const index = this.itemData.findIndex(i => {
                return i.index == this.current;
            })
            // line 移动距离
            this.lineLeft();
                       
            // item 移动距离
            let osl = el.offsetLeft,
                osw = el.offsetWidth;
            this.navLeft = osl + osw / 2 - this.clientW / 2;
            this.$refs.nav.scrollLeft = this.navLeft;
            
            this.$emit('on-click', this.items[index]);
        },
        // line 移动距离
        lineLeft() {
            let l = this.itemData.findIndex(i => {
                return i.index == this.current;
            })
            if (!this.scrollable) {
                l = parseInt(l);
                let itemLen = this.items.length;
                let newLeft = 0
                newLeft = this.clientW * (0.5 + l) / itemLen - 20;
                this.left = newLeft + 'px';
            } else {
                let textSum = 0;
                for(let i=0; i<this.textLen.length; i++) {                
                    if(i == l) break;
                    textSum += this.textLen[i];
                }   
                // let newLeft = 0.8 * textSum + 1.25 * l + (0.8 * parseFloat(this.textLen[l])) / 2 + 0.1;    // line width => px2rem(32)
                let newLeft = 0.8 * textSum + 1.25 * l + (0.8 * parseFloat(this.textLen[l])+ 1) / 2 - 1;
                this.left = newLeft + 'rem';
            }

        }
    },
    watch: {
        active(val){
            this.current = val;
            this.lineLeft();
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
$easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
$duration: .3s;
.slidenav {
    position: relative;
    width: 100%;
    height: px2rem(88);
    overflow: auto;
    background-color: $c-white;
    &::-webkit-scrollbar {
        display:none;
    }
    nav {
        position: relative;
        background-color: $c-white;
        display: flex;
        align-items: center;
    }
    .item {   
        padding: px2rem(26) 0 px2rem(18);
        flex: 1;
        // margin-right: px2rem(10);
        font-size: px2rem(32);
        color: $c-black;
        text-align: center;
    }
    .item.active {
        color: $c-high;
    }
    .item:last-child {
        margin-right: 0;
    }


    .slidenav-scrollable {
        .item {
            flex: none;  // flex: none;  将禁止flex属性
            padding: px2rem(26) px2rem(20) px2rem(18);
            margin-right: px2rem(10);
        }
    }

    .line {
        position: absolute;
        bottom: 0;
        left: 0;
        width: px2rem(80);
        height: px2rem(4);
        background: $c-high;
        z-index: 10;
        transition: left $duration $easing-in-out;
    }
}

</style>
