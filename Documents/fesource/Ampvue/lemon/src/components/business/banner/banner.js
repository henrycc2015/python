function BannerHelper(opts) {
	if (!opts) return;
	var container = document.querySelector(opts.el);
	if (!container) return;
	this.container = container;
	this.items = container.children;
	this.bannerLen = this.items.length;
	this.init(opts);
}
BannerHelper.prototype = {
	init(opts) {
		var container = this.container;
		this.currentPageIndex = 0;
		this.imgWidth = window.innerWidth;
		this.callback = opts.callback;
		this.interval = opts.interval;
		this.videos = container.querySelectorAll('video');
		this.autoPlay = opts.autoPlay;
		//初始化位置
		this.goIndex(0, true);
		this.autoPlay && this.play();
		var startX = 0;
		var startY = 0;
		var offsetX = 0;
		var noBubble = false;
		var noSlide = false;
		var startTime = new Date() * 1;
		container.addEventListener(
			'touchstart',
			function(e) {
				startTime = new Date() * 1;
				startX = e.targetTouches[0].pageX;
				startY = e.targetTouches[0].pageY;
				this.stop();
				noBubble = false;
				noSlide = false;
			}.bind(this)
		);
		container.addEventListener(
			'touchmove',
			function(e) {
				e.preventDefault();
				offsetX = e.targetTouches[0].pageX - startX;
				var offsetY = e.targetTouches[0].pageY - startY;
				if (!noBubble && !noSlide) {
					if (Math.abs(offsetX) >= Math.abs(offsetY)) {
						noBubble = true;
					} else {
						noSlide = true;
					}
				}
				noBubble && e.stopPropagation();
				if (noSlide) return;
				var x = offsetX - this.currentPageIndex * this.imgWidth;
				if (x > 0) {
					x = 0;
				}
				if (x < -this.imgWidth * (this.bannerLen - 1)) {
					x = -this.imgWidth * (this.bannerLen - 1);
				}
				this.goIndex(this.currentPageIndex, true, offsetX);
			}.bind(this)
		);
		container.addEventListener(
			'touchend',
			function(e) {
				var endTime = new Date() * 1;
				var offsetTime = endTime - startTime;
				//e.preventDefault();
				if (noSlide) return;
				noBubble && e.stopPropagation();
				offsetX = e.changedTouches[0].pageX - startX;
				//开启轮播
				this.autoPlay && this.play();
				if (
					Math.abs(offsetX) > this.imgWidth * (opts.percent || 0.3) ||
					(offsetTime < 200 && Math.abs(offsetX) > 30)
				) {
					//切换bannr页面
					this.animation(offsetX > 0);
				} else {
					//距离不够，释放返回原页
					this.goIndex(this.currentPageIndex, false, null, offsetX < 0);
				}
			}.bind(this)
		);
	},
	/*
	*开始自动切换
	*/
	play(delay) {
		var _this = this;
		if (!this.autoPlay) return;
		_play(delay);
		function _play(time) {
			_this.stop();
			_this.timer = setTimeout(function() {
				_play();
				_this.animation();
			}, time || _this.interval);
		}
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
	/*
	n:前往的索引
	noAnimate:不需要动画效果
	offset:偏移距离，只有手动滑动时传入
	orientLeft:是否向左切换－－页面切换动画只有两张图需要，以此一句判断决定第三张图无动画变换
	*/
	goIndex: function(n, noAnimate, offset, orientLeft) {
		if (n !== this.currentPageIndex) {
			//停止所有视屏播放
			for (var video of this.videos) {
				video.pause();
			}
		}
		if (orientLeft === undefined) {
			orientLeft = offset > 0 || n < this.currentPageIndex;
		}
		var lis = this.items,
			len = lis.length;
		var nleft = n - 1;
		var nright = n + 1;
		//当索引左／右超出
		if (n > len - 1 || n === 0) {
			n = 0;
			nleft = len - 1;
			nright = n + 1;
		}
		if (n < 0 || n === len - 1) {
			n = len - 1;
			nleft = n - 1;
			nright = 0;
		}
		//改变过渡的方式，从无动画变为有动画
		lis[n] &&
			(lis[n].style.webkitTransition = `-webkit-transform ${noAnimate
				? '0'
				: '0.5'}s ease-out`);
		lis[nleft] &&
			(lis[nleft].style.webkitTransition = `-webkit-transform ${noAnimate ||
			orientLeft
				? '0'
				: '0.5'}s ease-out`);
		lis[nright] &&
			(lis[nright].style.webkitTransition = `-webkit-transform ${noAnimate ||
			!orientLeft
				? '0'
				: '0.5'}s ease-out`);

		//改变动画后所应该的位移值
		lis[n] &&
			(lis[n].style.webkitTransform = `translate(${offset || 0}px, 0px)`);
		lis[nright] &&
			(lis[nright].style.webkitTransform = `translate(${offset
				? this.imgWidth + offset
				: this.imgWidth}px, 0px)`);
		lis[nleft] &&
			(lis[nleft].style.webkitTransform = `translate(-${offset
				? this.imgWidth - offset
				: this.imgWidth}px, 0px)`);
		//如果索引有变化执行自定义回调函数
		if (this.currentPageIndex !== n && typeof this.callback === 'function') {
			this.callback(n);
		}
		//保留当前索引值
		this.currentPageIndex = n;
	}
};
BannerHelper.attach = opts => {
	return new BannerHelper(opts);
};
export default BannerHelper;
