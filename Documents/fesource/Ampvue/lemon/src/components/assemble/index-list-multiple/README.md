## index-list

**demo地址:**  http://localhost:8088/#/demo/searchApply/searchApply

##### 应用场景
> 主要是滚动式显示列表数据，比如选择常用银行卡、选择国家等

##### 用法
```
<template>
    <!-- 默认样式 -->
    <index-list 
        :data="cityData"
        :custom="customData"
        :title="title"
        @select="selectItem"
        @title-click="clickTitle"></index-list>
        
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
data | Array| [] | 展示的数组数据
custom | Object| -- | 常用数据对象
speed | Number| 0 | 屏幕滚动的速度

##### 事件methods
事件名|  描述
---|---
on-click-left | 点击取消时触发的方法
on-click-right | 点击确定时触发的方法


> 使用该组件时，要注意各个具名slot所替换的内容
---