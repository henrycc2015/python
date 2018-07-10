<template>
  <div ref="wrapper" class="tetris-scroll-wrapper">
    <div class="tetris-scroll-content">
      <div ref="listWrapper" class="tetris-scroll-list-wrapper">
        <slot>
          <!--
          <ul class="tetris-scroll-list">
            <li @click="clickItem(item)" class="tetris-scroll-item tetris-1px-b" v-for="(item ,index) in data" :key="index">{{item}}</li>
          </ul>
          -->
        </slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="tetris-pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{ pullUpTxt }}</span>
          </div>
          <div class="after-trigger" v-else>
            <!--<loading></loading>-->

          </div>
        </div>
      </slot>
    </div>
    <!-- 辅助loading层样式 -->
    <slot
        name="pulldown"
        :pullDownRefresh="pullDownRefresh"
        :pullDownStyle="pullDownStyle"
        :beforePullDown="beforePullDown"
        :isPullingDown="isPullingDown"
        :bubbleY="bubbleY">
      <div class="tetris-pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <!-- <bubble :y="bubbleY"></bubble> -->
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <!-- <loading></loading> -->
          </div>
          <div v-else><span>{{ refreshTxt }}</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script >
  import BScroll from './bscroll'
//   import Loading from '../loading/loading.vue'
//   import Bubble from '../bubble/bubble.vue'
  import { getRect } from 'src/utils/dom'

  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'
  const DEFAULT_REFRESH_TXT = 'Refresh success'

  const EVENT_SCROLL = 'scroll'
  const EVENT_BEFORE_SCROLL_START = 'before-scroll-start'
  const EVENT_CLICK = 'click'
  const EVENT_PULLING_DOWN = 'pulling-down'
  const EVENT_PULLING_UP = 'pulling-up'

  const DEFAULT_OPTIONS = {
    observeDOM: true,
    /**
      * 点击列表是否派发click事件
      */
    click: true,
    /**
      * 1 滚动的时候会派发scroll事件，会截流。
      * 2 滚动的时候实时派发scroll事件，不会截流。
      * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
      */
    probeType: 1,
    scrollbar: false,
    pullDownRefresh: true,
    pullUpLoad: true
  }

  export default {
    name: 'scroll',
    props: {
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default() {
          return []
        }
      },
      options: {
        type: Object,
        default() {
          return {}
        }
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      },
      listRef: {
        type: String,
        default: 'list'
      }
    },
    data() {
      return {
        beforePullDown: true,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        bubbleY: 0,
        pullDownStyle: ''
      }
    },
    computed: {
      pullUpLoad() {
        return this.options.pullUpLoad
      },
      pullDownRefresh() {
        return this.options.pullDownRefresh
      },
      pullUpTxt() {
        const pullUpLoad = this.pullUpLoad
        const txt = pullUpLoad && pullUpLoad.txt
        const moreTxt = txt && txt.more || ''
        const noMoreTxt = txt && txt.noMore || ''

        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        const pullDownRefresh = this.pullDownRefresh
        return pullDownRefresh && pullDownRefresh.txt || DEFAULT_REFRESH_TXT
      }
    },
    created() {
      this.pullDownInitTop = -50
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this._calculateMinHeight()

        let options = Object.assign({}, DEFAULT_OPTIONS, {
          scrollY: this.direction === DIRECTION_V,
          /**
            * 是否开启横向滚动
            */
          scrollX: this.direction === DIRECTION_H
        }, this.options)
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, options)

        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit(EVENT_SCROLL, pos)
          })
        }

        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit(EVENT_BEFORE_SCROLL_START)
          })
        }
        // 下拉刷新
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
        // 上拉加载
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this._calculateMinHeight()
        this.scroll && this.scroll.refresh()
      },
      destroy() {
        this.scroll.destroy()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      clickItem(item) {
        this.$emit(EVENT_CLICK, item)
      },
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown(dirty)
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          dirty && this.refresh()
        } else {
          dirty && this.refresh()
        }
      },
      _calculateMinHeight() {
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }
      },
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit(EVENT_PULLING_DOWN)
        })

        this.scroll.on('scroll', (pos) => {
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            this.bubbleY = 0
            this.pullDownStyle = `top:${Math.min(pos.y - 30, 10)}px`
          }
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true
          this.$emit(EVENT_PULLING_UP)
        })
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.scroll.finishPullDown()
            this.isPullingDown = false
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown(dirty) {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          dirty && this.refresh()
        }, this.scroll.options.bounceTime)
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    },
    components: {
    //   Loading,
    //   Bubble
    }
  }

</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.tetris-scroll-wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
}    

.tetris-pulldown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    .after-trigger {
        margin-top: 5px;
    }
}   

.tetris-pullup-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .before-trigger {
        padding: 22px 0;
        min-height: 1em;   
    }
    .after-trigger {
        padding: 19px 0
    }
}    
    
.tetris-scroll-content {
    position: relative;
    z-index: 2;
}

.tetris-scroll-item {
    height: 60px;
    line-height: 60px;
    font-size: px2rem(60);
    padding-left: 20px;
}   

</style>

