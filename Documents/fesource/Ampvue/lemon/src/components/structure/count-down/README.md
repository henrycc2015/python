# 倒计时组件
- 目前的扩展性有局限，后期优化
    > 修改后不要忘了修改文档哦

## author
- mengqinghuan161


## 参数定义
- timeStyle
    > 时间倒计时内联样式
    > type : String,
    > default: 'color:#DBBA80;'

- contentBefore
    > 时间倒计时前的描述文字
    > type : String,
    > default :'距结束'

- currentDate
    > 服务器当时时间
    > type: Number
    > default: (new Date()).getTime()

- targetDate
    > 目标时间（相对于当前时间）
    > type : Number,

- endText
    > 结束状态文字
    > type : String,
    > default:'已结束'

- callback
    > 倒计时结束回调
    > type : Function,