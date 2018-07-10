## search

**demo地址:**  http://localhost:8088/#/demo/search/search

##### 应用场景
> 搜索功能

##### 用法
```
<template>
    <!-- 默认search -->
    <search @on-input="onSearch"></search>
    
    <!-- 有搜索🔍icon的search -->
    <icon-Search @on-input="onSearch"></icon-Search>
        
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
value | [String, Number]| -- | 默认搜索框的值
placeholder | String| '输入银行名称或首字母' | 搜索框的提示文字

##### 事件methods
事件名|  描述
---|---
on-change | 值变化时触发
on-show | 弹窗出现时触发
on-hide | 弹窗关闭时触发


> 自定义的内容
---