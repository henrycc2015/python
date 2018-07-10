# 针对营销活动  折扣秒杀系列组件
## author
- mengqinghuan161
- 目前的扩展性有局限，后期优化
    > 修改后不要忘了修改文档哦
- demo地址
    > http://localhost:8088/#/demo/demolist
    > prd**  => MC-prd
    > entry** => MC-entry

# prdPrice      折扣  余件、倒计时、产品价格组件
## 参数定义
- tag
    > 标签名
    > type : [String,Number],

- types
    > 活动类型
    > type : [String,Number],
    > value:
        >>  0：团购
            1：秒杀
                            

- status
    > 活动状态
    > type : [String,Number],
        >>  0：活动且产品产品
            1：产品售罄
            2：活动结束

- priceNew
    > 活动价
    > type : [String,Number]

- priceOld
    > 原价
    > type : [String,Number]

- productNum
    > 剩余产品数
    > type : [String,Number]

- targetDate
    > 倒计时目标日期
    > type : [String,Number]

- startDate
    > 开始时间
    > type : [String,Number]

- contentBefore 
    > 倒计时前文字
    > type : [String,Number] 

- countDownCallback
    > 倒计时结束回调函数
    > type : Fuction

- isShow
    > 分享按钮是否显示
    > type : Boolean


***


# prdAbout      折扣  产品特色/活动规则
## 参数定义
- title
    > 标题
    > type : [String,Number]

- contentList
    > 内容列表
    > type : Array

- btnMsg
    > 按钮文字
    > type : Array

- lineCap
    > 超过lineCap行时收起展开
    > type : [String,Number]


***


# prdPlan       折扣  保障范围
## 参数定义
- title
    > 标题
    > type : [String,Number]
    > default : "保障范围"

- planList
    > type : Array
    > 保障范围list
        >> type : Object
        >> title 
            >>> 保障项目
        >> planPrice
            >>> 保障金额
        >> content
            >>> 保障说明
        
- isOpen
    type : Boolean
    > 保障说明是否展开
    > default : false


***

# prdButton     折扣秒杀   底部按钮
##参数定义
- types
    >type : [String,Number]
    > 按钮类型
        >> '01'
            >>> 单个按钮
        >>  '其他'
            >>> 两个按钮

- messageOnly
    > type : [String,Number]
    > 单个按钮文字

- messageLeft
    > type : [String,Number]
    > 左边按钮文字

- messageRight
    > type : [String,Number]
    > 右边按钮文字

- fucOnly
    > type : Function
    > 单个按钮事件

- fucLeft
    > type : Function
    > 左边按钮事件

- fucRight
    > type : Function
    > 右边按钮事件

- isOnly
    > type : Boolean
    > 是否只有一个产品

***

# prdImage      折扣秒杀   产品图片，描述以及分享
## 参数定义

- imgUrl 
    > type : String
    > 图片地址

- shareFuc
    > type : Function
    > 分享方法


***
# entryList   打折秒杀列表
## 参数定义
- prdList 
    > type : Array
    > 产品列表list
    > Map参数
        >>      `{
                    title: String,  //产品名称
                    tag: String,    //标签名称
                    priceNew: String,   //折扣价格
                    priceOld: String,   //原价
                    status: String,     //状态
                    productNum: String, //剩余件数
                    targetDate: '2017-11-25 22:00:00',  //倒计时目标时间
                    startDate: '明天10:00:00', //下次开始时间
                    idSalesProduct: 'PI000001', //活动产品id
                    idSalesActivity: 'xxxx' //活动id
                }`

- countDownCallback
    > type : Function
    > 倒计时回调

- activityPrdId 
    > type : [String,Number]
    > 活动产品id