<template>
    <div class="tetris-loading-ani" v-show="isHide">
        <div class="loading-icon">
            <div class="loading-circle"></div>
            <div class="loading-center">{{num}}</div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'loading-animate',
    components: {},
    props: {
        countNumber: {
            type: Number,
            default: 9
        }
    },
    data() {
        return {
            num: this.countNumber,
            isHide: false,
            timer: null
        }
    },
    methods: {
        countDown() {
            window.clearInterval(this.timer);
            this.isHide = true;
            let that = this;
            that.timer = window.setInterval(() => {
                that.num--;
                if(that.num < 1) {
                    that.$emit('on-cleartimer', that.num);
                    that.clear();
                }
            }, 1000); 
        },
        clear() {
            window.clearInterval(this.timer);
            this.isHide = false;
            this.num = this.countNumber;
        }
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-loading-ani {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 100;
    text-align: center;
    background: rgba(0, 0, 0, .6);

    .loading-icon {
        position: relative;
        display: block;
        margin: 0 auto;
        width: 2rem;
        height: 2rem;
    }
    .loading-circle {
        width: 2rem;
        height: 2rem;
        background-size: 100% 100%;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURQAAAP///////////////////////0jPbQQAAAAHdFJOUwAqFP2XW9Lb8aoiAAAEk0lEQVRYw91ZT3ecIBAHsu5ZTbtntGnuLcbztiY5b2qa8za76ff/CAURGBBx3Pa175X3dkXlx/wFZkZC5hqri5IQWtQ1WdvqQrYBrK58DZQVBQQPPXSjIbgokMRZhLJsNY5l+RcBY1inA4cx8DJaMZwTUsXAS+hB2FmwepNoEFPWXLlKDdEpnWuCheIAKJdVGLThMe5vabFZYvpqSewqNbtFpwmXF0xNwpeSwW2jrx6aJ7Rl3vWfNZiKAF3OE7bz9p80OBN8bkhIWFN5tyfkw50Gb1r54MyBVvIZwiNLnWT5qtFgzfoBUOAz4PH59Z2muHmQHCjqhvUZmSl8vpXA7EH3sy96AmtOrraLYPeoRgfIXpWSDt7rTiqP/tAaV8vGl1reslETvaTCGv/17ii5GVhninDgZuq20o+2AVVLXbNem80GeqYkrakx8RpdceII5C4Dv7U3/V0MvLGORoPlYU2fqWFxtu/l7701Kg/W0yDYMbmzng5gq/I8fgC3KfBO7K2b+eBcS3ZMEW4cn9xjW991d/PgzUB45DuHvjkKMaMtp7PQk7liPF97ABtDKbT8bb4ijrI331jMdK7bwyK4bzlUsBP4RjRLR/hONL7Q1PZ6kS8Szn2hKysBu1/ieguMFfTQzdJja6MdI3QOznOKDbYKh7GzbBucnzw3YBelI/+9QJiZkBchuNNTNV5pJzDgTnwBIKts9ogI78juGwHsrlA289XNwf61OrLNndb/Hnjk11rq/IT0rudTbjRlwJ0QOBfrhTIpACvHObU4ytfiPAanJTg83uPAWW7XlfUVcsGi/IdgGVBfkHb5MPr9+zeknacjMyE+IbU9HflbYFLX2D0MP/L/bh/vceM2T1N9PQqBXZLT/b0TLc4CL2K6vz8/cbR8f8jOannwixbVuhNjekCD4AQF844bu5V8PGG4798IOCXN9UYgj9gzoGg4uBZvGMrvBmfyIgMVVjwgN4MzCIJ+Kxq6JA6jNu4D4BpnKBA0ul62eNbd/giCRhfOLcdD3ZApADXZrjTW8r6rFi4F0YQJ3G+bZUPvWi8bcv0M42FPQY4BsxWWXL2wvBDJVnb7xCL+yYMczk8t6SmZlL0GVrZ3pcsWZw3V8mnG7IQ4Nckt20wNFwOz2WG/n9WZevwox7BSAXIyzYGV795GEzv6c5xgqFcwHtZ2xgfdTNp/sNrNI6llOXpgNIVmp8/Bagz4Hp7dqhg0CINVIaNvQRkoUpMqTV2IBmdZf1S1Iu6bNagr6ZxwD+sarvrB9mGW75F2812pitRZ92/e9L0WL/AQWG4ysipKqjKlamFXjeOESQIskhjocpMpOxxBMa1VJZ+DEY6bGpJPeig3jeY6aMUNZTyhVzExETrJo4vVE9wVEHPPG3iqCmGGvhzH+t85D78SJOrEYOrNQ6QSTFIl1zhjbKFITRN1aLZYo65mR7Dl6rgbEn61YIiqPkAXNkSq3beJ9FFcFcGnBy9yWTrGqxg49xY8El2604SiPv7A7w4BGBPvVBNwAepeaHQJ9lV0yMMi4DWhsA9eW1OoHfiiJIzV+jfbfgEQS7MSxlLAEAAAAABJRU5ErkJggg==");
        animation: circle 2000ms linear infinite;
    }
    .loading-center {
        position: absolute;
        top: 50%;
        margin-top: -0.6rem;
        left: 50%;
        margin-left: -0.6rem;
        width: 1.2rem;
        height: 1.2rem;
        font-size: 1rem;
        color: $c-light;
        line-height: 1.3rem;
        // background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAtBAMAAADmcd47AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURQAAAP///////////////////////////////////yR8m5UAAAAJdFJOUwDhFolqWK7ONpWxBSgAAAFjSURBVDjLpZSxTsMwEIaNS6KMpBKo2YIQVN0iVVTqFgkQYsvSoVuFEFI3YMuWgYWNNLRwb4vvzjhOgy0hbsnpPse+s+8/IX61YLFIhdPWAEfsnT3HbCe5oQnAhjcBY59pj05aCqsenVt006OlRbeRzkH5dRzntIwjyvkIwbZ3pDXvduilgYvK6fTSTQfKTZFGiU2zPdqr6K80yH10/uShIXioLH30FDwUK3bTJXgoem46/weNSh8Vd17q/TcC2N1mLhpy2EEn3PIdGtoVFV0tNJRoJhMYSeAOTSxd0PU1uqebPSrXRmIHOmrRMffnTtALrbrU9PAL3UXRpZgSzEjckU6qpZTSCCcFDENK6vz66kfLlJIaCbioVtV+CZm0Sh9rwfAB+AIDaw7gm2x1qWgFVqUFSLSuKIEljR391ZW9AdzryjA2NIOk4g2N8C7UjaRCMjzm2KwyE+71BsfZ7FHZAw22b56zhCfI1B0dAAAAAElFTkSuQmCC");
        // background-size: 100% 100%;
        animation: center 2000ms linear infinite;
    }



    @keyframes circle {
        from {transform: rotate(0deg); }
        to {transform: rotate(360deg); }
    }
    @keyframes center {
        0%{transform:scale(1);}
        50%{transform:scale(0.8);}
        100%{-transform:scale(1);}
    }
}
</style>