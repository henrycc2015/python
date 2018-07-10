<template lang="html">
  <div :class="['banner',cls]" :style="{height: height}" ref="container">
    <div class="items" @touchstart.stop="onTouchstart" @touchmove.stop="onTouchmove" @touchend.stop="onTouchend">
      <div class="item" v-for="(item,index) in banners" :ref='`bannerItem${index}`'>
        <img :src="item.bannerImagePath" @click="bannerGo(item)" v-if="item.mediaType!=='02'" alt="">
        <div class="video" v-if="item.mediaType==='02'">
          <video preload="auto" webkit-playsinline="true" playsinline="true" :ref="'video'+index" @ended="onVideoEnd()" @playing="onVideoPlaying()" @waiting="onVideoWaiting()">
				     <source :src="item.src" type="video/mp4">
				     <object data="movie.mp4" width="100%" height="100%">
					     <embed src="movie.swf" width="100%" height="100%">
				     </object>
			    </video>
        </div>
      </div>
    </div>
    <div class="dots" v-if="hasDots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script>
import goWebviewMixin from 'src/mixins/goWebview';

export default {
	mixins: [goWebviewMixin],
	props: {
		height: {
			type: String,
			default: '7.5rem'
		},
		hasDots: {
			type: Boolean,
			default: true
		},
		banners: {
			type: Array,
			default: []
		},
		interval: {
			type: Number,
			default: 4000
		},
		autoPlay: {
			type: Boolean,
			default: true
		},
		cls: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			currentPageIndex: 0,
			status: 0
		};
	},
	computed: {
		dots() {
			return new Array(this.banners.length);
		},
		imgWidth() {
			return this.$refs.container.clientWidth;
		}
	},
	created() {
		this.isAndroid = /Android|android/.test(window.navigator.userAgent);
		this.startBanner();
	},
	activated() {
		this.startBanner();
	},
	deactivated() {
		this.stopBanner();
	},
	beforeDestroy() {
		this.stopBanner();
	},
	watch: {
		banners() {
			this.startBanner();
		}
	},
	methods: {
		addEvents() {
			// const video = this.$refs['video' + this.currentPageIndex];
			// if (!video || !video[0]) return;
			var v = document.querySelector('video');
			console.log(v);
			this.eventTester = function(e) {
				v.addEventListener(e, function() {
					console.log(new Date().getTime(), e);
				});
			};
			this.eventTester('loadstart'); //客户端开始请求数据

			this.eventTester('progress'); //客户端正在请求数据

			this.eventTester('suspend'); //延迟下载

			this.eventTester('abort'); //客户端主动终止下载（不是因为错误引起），

			this.eventTester('error'); //请求数据时遇到错误

			this.eventTester('stalled'); //网速失速

			this.eventTester('play'); //play()和autoplay开始播放时触发

			this.eventTester('pause'); //pause()触发

			this.eventTester('loadedmetadata'); //成功获取资源长度

			this.eventTester('loadeddata'); //

			this.eventTester('waiting'); //等待数据，并非错误

			this.eventTester('playing'); //开始回放

			this.eventTester('canplay'); //可以播放，但中途可能因为加载而暂停

			this.eventTester('canplaythrough'); //可以播放，歌曲全部加载完毕

			this.eventTester('seeking'); //寻找中

			this.eventTester('seeked'); //寻找完毕

			this.eventTester('timeupdate'); //播放时间改变

			this.eventTester('ended'); //播放结束

			this.eventTester('ratechange'); //播放速率改变

			this.eventTester('durationchange'); //资源长度改变

			this.eventTester('volumechange'); //音量改变
		},
		bannerGo(item) {
			return this.goWebview({
				adRedirectPathIos: item.bannerRedirectPathIos,
				adRedirectPathAndroid: item.bannerRedirectPathAndroid,
				adType: item.bannerType,
				highLevel: item.highLevel
			});
		},
		/*
    *开启banner轮播－如果当前页是视频，则自动播放
    */
		startBanner() {
			if (this.banners.length < 1) return;
			if (this.status) {
				this.play();
				this.playVideo();
			} else {
				this.status = 1;
				this.$nextTick(() => {
					//this.addEvents();
					this.init();
				});
			}
		},
		/*
    *停止banner轮播－如果当前页是视频，则停止播放
    */
		stopBanner() {
			this.stop();
			this.stopVideo();
		},
		/*
    *停止播放视频
    */
		stopVideo() {
			const video = this.$refs['video' + this.currentPageIndex];
			if (!video || !video[0]) return;
			//停止播放
			video[0].pause();
			//重置播放进度
			video[0].currentTime = 0;
		},
		/*
    *播放视频
    */
		playVideo(reload) {
			const video = this.$refs['video' + this.currentPageIndex];
			if (!video || !video[0]) return;
			//this.stop();
			//const time = video[0].duration || 5;
			//this.playFunc((time + 1) * 1000);
			//reload && video[0].load();
			video[0].play();
		},
		/*
    *视频播放结束时触发，事件顺序 onpause -> onVideoEnd
    */
		onVideoEnd() {
			//视频播放结束，短暂停留后切换下一页,并开启banner轮询
			this.play(300);
		},
		/*
    *视频开始播放，暂停banner切换
    */
		onVideoPlaying() {
			//暂停banner轮播
			this.stop();
		},
		/*
    *视频加载资源而卡住
    */
		onVideoWaiting() {
			//视频卡住－－如果5s后还不播放，自动跳转banner下一页
			this.play(5000);
		},
		//-----------------
		init(idx) {
			this.resetItemPostiion();
			this.currentPageIndex = 0;
			//初始化位置
			this.goIndex(idx || 0, true);
			this.autoPlay && this.play();
			this.playVideo();
		},
		resetItemPostiion() {
			for (let i = 0; i < this.banners.length; i++) {
				let item = this.$refs[`bannerItem${i}`];
				if (item && item[0]) {
					item[0].style.webkitTransition = '-webkit-transform 0s ease-out';
					item[0].style.webkitTransform = `translate(${this.imgWidth}px, 0px)`;
				}
			}
		},
		onTouchstart(e) {
			//android任意门问题影响，走另一套逻辑
			this.isOk = false;
			this.offsetX = 0;
			this.noBubble = false;
			this.noSlide = false;
			this.startTime = new Date() * 1;
			this.startX = e.targetTouches[0].pageX;
			this.startY = e.targetTouches[0].pageY;
			this.stop();
		},
		onTouchmove(e) {
			e.preventDefault();
			if (this.banners.length < 2) return;
			this.offsetX = e.targetTouches[0].pageX - this.startX;
			this.offsetY = e.targetTouches[0].pageY - this.startY;
			if (!this.noBubble && !this.noSlide) {
				if (Math.abs(this.offsetX) >= Math.abs(this.offsetY)) {
					this.noBubble = true;
					//android任意门问题影响，走另一套逻辑
					if (this.isAndroid) {
						this.isOk = true;
						//开启轮播
						this.autoPlay && this.play();
						return this.animation(this.offsetX > 0);
					}
				} else {
					this.noSlide = true;
				}
			}
			//android任意门问题影响，走另一套逻辑
			if (this.isOk) {
				return;
			}
			this.noBubble && e.stopPropagation();
			if (this.noSlide) return;
			let x = this.offsetX - this.currentPageIndex * this.imgWidth;
			if (x > 0) {
				x = 0;
			}
			if (x < -this.imgWidth * (this.banners.length - 1)) {
				x = -this.imgWidth * (this.banners.length - 1);
			}
			if (this.banners.length < 3) return;
			this.goIndex(this.currentPageIndex, true, this.offsetX);
		},
		onTouchend(e) {
			if (this.banners.length < 2 || this.isAndroid) return;
			const endTime = new Date() * 1;
			const offsetTime = endTime - this.startTime;
			if (this.noSlide) return;
			this.noBubble && e.stopPropagation();
			this.offsetX = e.changedTouches[0].pageX - this.startX;
			//开启轮播
			this.autoPlay && this.play();
			if (
				Math.abs(this.offsetX) > this.imgWidth * 0.25 ||
				(offsetTime < 200 && Math.abs(this.offsetX) > 30)
			) {
				//切换bannr页面
				this.animation(this.offsetX > 0);
			} else {
				//距离不够，释放返回原页
				this.goIndex(this.currentPageIndex, false, null, this.offsetX < 0);
			}
		},
		/*
  	*开始自动切换
  	*/
		play(delay) {
			if (!this.autoPlay || this.banners.length < 2) return;
			this.playFunc(delay);
		},
		playFunc(time) {
			this.stop();
			this.timer = setTimeout(() => {
				this.playFunc();
				this.animation();
			}, time || this.interval);
		},
		/*
  	*停止自动切换
  	*/
		stop() {
			clearTimeout(this.timer);
		},
		/*
  	isReverse:是否后退
  	isRestore:是否还原－－滑动距离过短释放页面返回原位
  	*/
		animation(isReverse, isRestore) {
			//滑动距离过短释放还原
			if (isRestore) {
				this.goIndex(this.currentPageIndex);
			} else if (isReverse) {
				this.goIndex(this.currentPageIndex - 1);
			} else {
				this.goIndex(this.currentPageIndex + 1);
			}
		},
		dealIndex(i) {
			const max = this.banners.length;
			if (i >= max) {
				i = 0;
			} else if (i < 0) {
				i = max - 1;
			}
			return i;
		},
		/*
  	n:前往的索引
  	noAnimate:不需要动画效果
  	offset:偏移距离，只有手动滑动时传入
  	orientLeft:是否向左切换－－页面切换动画只有两张图需要，以此一句判断决定第三张图无动画变换
  	*/
		goIndex: function(n, noAnimate, offset, orientLeft) {
			if (this.banners.length === 2) {
				noAnimate = true;
			}
			if (n !== this.currentPageIndex) {
				//停止所有视屏播放
				this.stopVideo();
			}
			if (orientLeft === undefined) {
				orientLeft = offset > 0 || n < this.currentPageIndex;
			}
			const refs = this.$refs;
			n = this.dealIndex(n);
			let nleft = this.dealIndex(n - 1);
			let nright = this.dealIndex(n + 1);
			const item = refs[`bannerItem${n}`];
			item &&
				item[0] &&
				(item[0].style.webkitTransition = `-webkit-transform ${
					noAnimate ? '0' : '0.5'
				}s ease-out`);
			item &&
				item[0] &&
				(item[0].style.webkitTransform = `translate(${offset || 0}px, 0px)`);
			if (nleft !== n) {
				const iteml = refs[`bannerItem${nleft}`];
				iteml &&
					iteml[0] &&
					(iteml[0].style.webkitTransition = `-webkit-transform ${
						noAnimate || orientLeft ? '0' : '0.5'
					}s ease-out`);
				iteml &&
					iteml[0] &&
					(iteml[0].style.webkitTransform = `translate(-${
						offset ? this.imgWidth - offset : this.imgWidth
					}px, 0px)`);
			}
			if (nright !== n && nright !== nleft) {
				const itemr = refs[`bannerItem${nright}`];
				//改变过渡的方式，从无动画变为有动画
				itemr &&
					itemr[0] &&
					(itemr[0].style.webkitTransition = `-webkit-transform ${
						noAnimate || !orientLeft ? '0' : '0.5'
					}s ease-out`);
				//改变动画后所应该的位移值
				itemr &&
					itemr[0] &&
					(itemr[0].style.webkitTransform = `translate(${
						offset ? this.imgWidth + offset : this.imgWidth
					}px, 0px)`);
			}
			//如果索引有变化执行自定义回调函数
			if (this.currentPageIndex !== n) {
				this.stopVideo();
				this.currentPageIndex = n;
				this.playVideo();
			}
			//保留当前索引值
			this.currentPageIndex = n;
		}
	}
};
</script>

<style lang="scss" scoped>
  .banner{
    position: relative;
    overflow: hidden;
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="451 950 100 100"><path fill="#DFDFDF" d="M526.739,1022.604c0.684,0.16,1.053-0.326-0.16-0.625c-4.572-1.127-14.07-1.857-18.217-2.07c-7.82-0.398-24.556-0.076-33.551,1.803c0,0,1.217,1.4,1.688,2.606c1.947-0.816,9.037-3.098,26.215-3.717C508.719,1020.383,519.424,1020.904,526.739,1022.604"/><path fill="#DFDFDF" d="M518.19,989.19c0,0.144-0.134,0.264-0.3,0.264h-4.385c-0.164,0-0.299-0.119-0.299-0.264v-3.877c0-0.146,0.135-0.266,0.299-0.266h4.385c0.166,0,0.3,0.119,0.3,0.266V989.19z"/><path fill="#DFDFDF" d="M507.803,989.281c-0.597,0-3.679,0-4.015,0c-0.197,0-0.389-0.102-0.211-0.356c0.41-0.592,8.451-12.088,9.436-13.496c0.064-0.092,0.123-0.141,0.277-0.141h4.054c0.202,0,0.28,0.068,0.36,0.184c0.826,1.166,10.39,13.853,10.498,13.98c0.203,0.236,0.143,0.412-0.129,0.412c-0.41,0.002-3.205,0-4.008,0c-0.193,0-0.252-0.049-0.316-0.139c-0.855-1.207-8.025-10.383-8.221-10.606c-0.143-0.16-0.348-0.17-0.48,0.002c-0.256,0.328-6.67,9.535-6.932,9.942C508.017,989.219,508.014,989.281,507.803,989.281"/><path fill="#DFDFDF" d="M511.567,975.289c-0.447,0-20.652-0.074-22.806-0.074c-0.108,0-0.228,0.045-0.268,0.148c-0.238,0.576-2.885,3.617-5.858,6.938c-4.05,4.52-8.711,9.555-8.733,9.586c-0.392,0.553,0.105,0.486,0.524,0.492c0,0,3.628-0.01,3.7-0.006c0.193,0.006,0.223-0.098,0.332-0.236c0.027-0.033,2.945-2.855,2.945-2.855h19.859c0.248,0.002,0.85,0,1.207-0.477c0.236-0.316,9.146-12.959,9.305-13.193C511.931,975.385,511.829,975.289,511.567,975.289"/><path fill="#DFDFDF" d="M478.454,997.666c0.129-0.471,0.426-0.685,0.891-0.637c0.463,0.047,0.629,0.307,0.5,0.777c-0.106,0.33-0.232,0.779-0.379,1.346c-0.153,0.33-0.246,0.59-0.279,0.777h2.193c0.953-0.045,1.334,0.33,1.146,1.133c-0.739,3.396-1.982,6.156-3.724,8.279c0.787,0.615,1.398,1.158,1.836,1.629c0.271,0.33,0.287,0.637,0.05,0.92c-0.341,0.33-0.681,0.377-1.017,0.143c-0.086-0.049-0.254-0.166-0.504-0.356c-0.531-0.471-0.982-0.848-1.357-1.133c-0.524,0.568-1.627,1.463-3.306,2.691c-0.103,0.045-0.183,0.094-0.237,0.141c-0.482,0.33-0.857,0.307-1.12-0.07c-0.246-0.473-0.129-0.875,0.354-1.205c0.971-0.424,2.058-1.225,3.256-2.404c-0.319-0.33-0.748-0.707-1.287-1.133c-0.779-0.66-1.129-1.086-1.049-1.273c0.041-0.236,0.233-0.66,0.578-1.275c0.824-1.461,1.598-3.043,2.322-4.74h-1.556c-0.38,0-0.554-0.213-0.525-0.637c0.121-0.426,0.375-0.662,0.763-0.709h1.697C477.968,999.223,478.218,998.469,478.454,997.666M480.79,1001.275h-2.053c-0.63,1.697-1.417,3.35-2.359,4.953c-0.256,0.379-0.392,0.613-0.408,0.707c-0.016,0.096,0.225,0.332,0.725,0.709c0.499,0.377,0.85,0.66,1.053,0.85c1.512-1.887,2.588-4.105,3.227-6.652C481.048,1001.416,480.986,1001.229,480.79,1001.275 M483.771,998.019h6.865c0.66,0,1.031,0.166,1.115,0.494c0.035,0.332-0.225,0.734-0.779,1.203c-2.408,1.889-3.621,2.879-3.637,2.973c-0.018,0.096,0.028,0.236,0.137,0.426c0.285,0.52,0.496,1.061,0.634,1.629h3.397c0.367,0.047,0.51,0.305,0.428,0.777c-0.122,0.426-0.395,0.637-0.819,0.637h-2.69c-0.004,1.086-0.107,2.219-0.315,3.396c-0.863,3.822-3.033,5.025-6.511,3.609c-0.43-0.236-0.537-0.566-0.32-0.99c0.254-0.377,0.605-0.496,1.053-0.354c2.365,1.037,3.799,0.258,4.305-2.336c0.293-1.133,0.371-2.24,0.233-3.326h-4.741c-0.466-0.047-0.66-0.283-0.584-0.707c0.129-0.473,0.432-0.707,0.903-0.707h4.104c-0.092-0.285-0.246-0.613-0.463-0.992c-0.316-0.613-0.431-1.037-0.342-1.275c0.026-0.141,0.454-0.565,1.287-1.272c0.871-0.662,1.588-1.25,2.15-1.77h-5.59c-0.379,0-0.549-0.236-0.512-0.709C483.153,998.303,483.384,998.068,483.771,998.019"/><path fill="#DFDFDF" d="M497.021,997.523c0.177,0.33,0.231,0.424,0.162,0.283c0.315,0.613,0.505,1.016,0.565,1.203c0.113,0.426,0.033,0.756-0.246,0.992h0.639c1.157-0.143,1.348,0.519,0.57,1.98c-0.387,0.85-0.877,1.627-1.473,2.336c0.252-0.094,0.496,0,0.729,0.283c0.482,0.471,0.785,0.896,0.908,1.273c0.262,0.379,0.199,0.732-0.189,1.062c-0.42,0.236-0.761,0.164-1.024-0.213c-0.295-0.471-0.597-0.896-0.908-1.273c-0.077-0.096-0.111-0.166-0.102-0.213l-1.425,8.068c-0.065,0.377-0.315,0.588-0.748,0.637c-0.464-0.049-0.663-0.26-0.596-0.637l1.21-6.865c-0.104,0.047-0.241,0.166-0.416,0.354c-0.697,0.473-1.153,0.777-1.365,0.92c-0.475,0.283-0.828,0.283-1.062,0c-0.17-0.377-0.037-0.73,0.4-1.062c2.443-1.557,4.049-3.158,4.812-4.81c0.207-0.377,0.074-0.566-0.397-0.566h-2.902c-0.416-0.047-0.59-0.26-0.523-0.637c0.075-0.426,0.324-0.637,0.749-0.637h2.123c0.008-0.047-0.009-0.096-0.046-0.143c-0.039-0.047-0.055-0.094-0.047-0.143c-0.398-0.943-0.618-1.438-0.657-1.486c-0.17-0.377-0.04-0.707,0.387-0.988C496.514,997.053,496.805,997.146,497.021,997.523M500.648,1005.451h7.077c0.85,0,1.189,0.471,1.023,1.416l-0.91,5.164c-0.12,0.943-0.647,1.393-1.581,1.346h-7.077c-0.905,0.047-1.255-0.377-1.051-1.275l0.912-5.164C499.217,1005.945,499.751,1005.451,500.648,1005.451 M499.825,1010.123l-0.275,1.555c-0.049,0.283,0.113,0.424,0.492,0.424h2.334l0.351-1.979H499.825z M503.325,1006.725h-2.406c-0.282,0-0.477,0.166-0.582,0.494l-0.287,1.629h2.902L503.325,1006.725z M502.15,1000.143h6.017c0.761-0.047,1.049,0.33,0.861,1.133l-0.337,1.91c-0.056,0.85-0.504,1.25-1.345,1.203h-5.874c-0.804,0-1.132-0.4-0.991-1.203l0.338-1.91C500.952,1000.521,501.396,1000.143,502.15,1000.143 M501.372,997.736h8.422c0.425,0,0.646,0.211,0.666,0.637c-0.123,0.424-0.4,0.662-0.832,0.709h-8.422c-0.426,0-0.648-0.213-0.668-0.639C500.661,998.019,500.939,997.783,501.372,997.736M507.374,1001.416h-4.953c-0.229-0.045-0.366,0.07-0.416,0.353l-0.15,0.85c-0.059,0.332,0.03,0.496,0.268,0.496h4.953c0.285,0,0.426-0.142,0.43-0.426l0.162-0.92C507.763,1001.486,507.667,1001.371,507.374,1001.416 M506.831,1010.123h-2.76l-0.35,1.979h2.264c0.33,0,0.522-0.141,0.571-0.424L506.831,1010.123z M504.671,1006.725l-0.375,2.123h2.761l0.299-1.699c0.104-0.33-0.036-0.471-0.421-0.424H504.671z"/><path fill="#DFDFDF" d="M520.671,997.453c0.386-0.047,0.613,0.141,0.68,0.566c-0.066,0.379-0.302,0.637-0.704,0.777c-0.639,0.143-1.631,0.283-2.976,0.426l-0.463,2.617h3.185c0.425,0,0.646,0.215,0.666,0.639c-0.122,0.424-0.399,0.662-0.832,0.707h-3.255l-0.162,0.92c1.287,0.992,2.318,2.1,3.094,3.328c0.301,0.424,0.258,0.801-0.129,1.131c-0.475,0.283-0.841,0.213-1.096-0.213c-0.541-0.943-1.262-1.816-2.156-2.617l-1.311,7.43c-0.075,0.426-0.354,0.66-0.832,0.709c-0.465-0.049-0.658-0.283-0.583-0.709l1.36-7.713c-1.166,1.793-2.447,3.303-3.842,4.529c-0.39,0.33-0.752,0.377-1.088,0.141c-0.271-0.33-0.232-0.682,0.116-1.061c2.095-1.982,3.69-3.939,4.788-5.875h-3.044c-0.425,0-0.624-0.211-0.597-0.637c0.076-0.424,0.33-0.66,0.763-0.709h3.538l0.438-2.475c-0.527,0.047-1.48,0.094-2.855,0.141c-0.424,0-0.625-0.213-0.596-0.637c0.074-0.426,0.328-0.66,0.762-0.709C515.805,998.16,518.182,997.926,520.671,997.453 M526.745,998.727c0.101-0.566,0.394-0.895,0.883-0.99c0.417,0.047,0.598,0.353,0.546,0.92l-2.321,13.164c-0.316,1.793-2.052,2.264-5.203,1.416c-0.4-0.143-0.535-0.449-0.404-0.92c0.207-0.379,0.539-0.52,0.994-0.426c1.953,0.426,3.032,0.328,3.235-0.283L526.745,998.727z M523.761,998.797l-1.872,10.617c-0.083,0.471-0.362,0.707-0.832,0.707c-0.474,0-0.666-0.236-0.583-0.707l1.872-10.617c0.083-0.471,0.364-0.73,0.845-0.777C523.653,998.066,523.844,998.326,523.761,998.797"/></svg>');
    background-repeat: no-repeat;
    background-position: center center;
    .dots{
      position: absolute;
      left: 0.5rem;
      bottom: 0.4rem;
      font-size: 0;
      .dot{
        display: inline-block;
        margin: 0 3px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        &.active{
          background: rgb(255, 255, 255)
        }
      }
    }
    .item{
      width: 100%;
      position: absolute;
      left:0;
      top:0;
      -webkit-backface-visibility: hidden;
      -webkit-transform-style: preserve-3d;
      transform: translate(100%,0);
      img{
        width: 100%;
      }
      video{
        width: 100%;
      }
    }
  }
</style>
