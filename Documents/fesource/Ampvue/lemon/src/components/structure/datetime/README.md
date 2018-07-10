## datetime

**demo地址:**  http://localhost:8088/#/demo/search/search

##### 应用场景
> 搜索功能

##### 用法
```
<template>
    <!-- 默认参数式 -->
    <date-time v-model="value2" 
        @on-change="change" 
        title="默认值">
    </date-time>
    
    <!-- 默认日历是否直接展示 -->
    <date-time v-model="value1" 
        @on-change="change" 
        title="生日" 
        :show.sync="visibility" 
        shortBottemBorder>
    </date-time>
    
    <!--  设置日期格式化方式参数：format，以及minYear和maxYear -->
    <date-time 
        v-model="value3" 
        placeholder="请选择" 
        :min-year="2000" 
        :max-year="2016" 
        format="YYYY-MM-DD HH:mm" 
        @on-change="change" 
        title="2000年以后时间">
    </date-time>
    
    <!-- 设置初始日期startDate和截止日期endDate -->
    <date-time 
        v-model="value4" 
        :start-date="startDate" 
        :end-date="endDate" 
        @on-change="change" 
        title="控制时间段">
    </date-time>
        
    <!-- 设置默认选中当前日期 -->
    <date-time 
        v-model="value5" 
        @on-change="change" 
        title="选择今日" 
        clear-text="today" 
        @on-clear="setToday">
    </date-time>
    
    <!-- 设置证件日期为长期有效 -->
    <date-time 
        v-model="value6" 
        @on-change="change" 
        title="证件有效期" 
        custom-text="长期有效" >
    </date-time>
    
    
</template>

<script>
    // 插件式调用
    this.$tetris.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD HH',
        value: '2017-05-20 18',
        onConfirm(val) {
            console.log('plugin confirm', val)
        },
        onShow() {
            console.log('plugin show')
        },
        onHide() {
            console.log('plugin hide')
        }
    })

</script>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
isNeedTopBorder | Boolean | -- | cell是否有上边框
shortBottemBorder | Boolean| -- | cell下边框是否是短边框
format | String | 'YYYY-MM-DD' | 日期格式化的格式
title | String | '' | cell左侧title标题
value | String | '' | cell右侧的当前显示日期
placeholder | String | 'YYYY-MM-DD' | cell右侧的提示文本
minYear | Number | -- | 某时间段内的最小日期数值
maxYear | Number | -- | 某时间段内的最大日期数值
confirmText | String | -- | 弹框头部右边标题文本
cancelText | String | -- | 弹框头部左边标题文本
clearText | String | --| 弹框头部中间标题文本
customText | String | -- | 滚轮底部自定义文本
required | Boolean | false | 是否为必填
startDate | String | -- | 某时间段内的开始日期（YYYY-MM-DD形式）
endDate | String | -- | 某时间段内的截止日期（YYYY-MM-DD形式）
displayFormat | Function | --| 格式化当前值的函数
readonly | Boolean | -- | 是否为只读


##### 事件methods
事件名|  描述
---|---
on-change | 值变化时触发


> 自定义的内容
---