<template>
  <span :currentDate='currentDate' :targetDate="targetDate" :callback="callback" :endText="endText">
    <slot name="content">
        {{contentBefore}}
    </slot><em :style="timeStyle">{{content}}</em>
  </span>
</template>
<script>
export default {
    data() {
        return {
            content: '',
        }
    },
    props: {
        timeStyle: {
            type: String,
            default: 'color:#d7ac62;'
        },
        currentDate: {
            default: new Date()
        },
        contentBefore: {
            type: String,
            default: '距结束'
        },
        targetDate: {
            type: [String,Number],
            default: ''
        },
        endText: {
            type: String,
            default: '已结束'
        },
        callback: {
            type: Function,
            default: ''
        }
    },
    mounted() {
        this.countdowm(this.targetDate)
    },
    watch: {
        targetDate: function () {
            this.countdowm(this.targetDate)
        }
    },
    methods: {
       
        countdowm(timestamp) {
            let currentDate = (this.currentDate).getTime();
            let temp = (new Date(timestamp)).getTime() - currentDate
            if (temp > 0) {
                this.content = this.transDate(temp)
            } else {
                this.content = '00:00:00';
            }

            let timer = setInterval(() => {
                currentDate += 1000
                let nowTime = new Date(currentDate);
                let targetDate = new Date(timestamp);
                let t = targetDate.getTime() - nowTime.getTime();
                if (t > 0) {
                    let format = this.transDate(t);
                    this.content = format;
                } else {
                    clearInterval(timer);
                    this._callback();
                }
            }, 1000);
        },
        _callback() {
            if (this.callback && this.callback instanceof Function) {
                this.callback(...this);
            }
        },
        transDate(t) {
            let day = Math.floor(t / 86400000);
            let hour = Math.floor((t / 3600000) % 24);
            let min = Math.floor((t / 60000) % 60);
            let sec = Math.floor((t / 1000) % 60);
            hour = hour < 10 ? '0' + hour : hour;
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;
            let format = '';
            if (day > 0) {
                format = `${day}天${hour}:${min}:${sec}`;
            }
            if (day <= 0 && hour > 0) {
                format = `${hour}:${min}:${sec}`;
            }
            if (day <= 0 && hour <= 0) {
                format = `${min}:${sec}`;
            }
            return format
        }
    }
}
</script>

<style lang="scss" scoped>
span {
  color: #666;
  em {
    font-style: normal;
  }
}
</style>
