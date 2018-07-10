## popupPicker

**demo地址:**  http://localhost:8088/#/demo/popupPicker/popupPicker

##### 应用场景
> 由底部弹出的滚轮式选择框

##### 用法
```
<template>
    <!-- 默认弹框样式 -->
    <popup-picker :title="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :placeholder="placeholder"></popup-picker>
    
    <!-- 默认样式的 省市三级联动 -->
    <popup-picker title="省份" @before-click="provinceClick" placeholder="请选择" :data="provinceList" :columns="1" v-model="addModel.provinceCode" 
        show-name @on-change="provinceChange"></popup-picker>
    <popup-picker title="城市" placeholder="请选择" :data="addModel.cityList" :columns="1" v-model="addModel.cityCode" 
        show-name @on-change="cityChange" @before-click="cityClick" :disable="addModel.cityDisabled"></popup-picker>
    <popup-picker title="区县" placeholder="请选择" :data="addModel.countyList" :columns="1" v-model="addModel.countyCode" 
        show-name @on-change="countyChange" @before-click="countyClick" :disable="addModel.countyDisabled"></popup-picker>
        
    <!-- 文字居右对齐 -->
    <v-annotation tl='right'>申请理赔时，需有社保和补充医疗先行赔付，否则讲按条款约定降低赔付比例</v-annotation>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
disable | Boolean| false | 是否启用popup-picker
title | String| -- | cell的标题
pop-title | String| -- | 弹框的标题
cancel-text | String| -- | 弹框头部的取消文字
confirm-text | String| -- | 弹框头部的确认文字
data | Array| [] | 弹框主体picker的数据
placeholder | String| 请输入 | 提示文字
columns | Number| 0 | picker数据的列数
fixed-columns | Number| 0 | 指定picker显示多少列，隐藏多余的
show-name | Boolean| false | 是否显示文字值而不是key
left-shortline | Boolean| -- | cell下边左边是否是短线

##### 事件methods
事件名|  描述
---|---
on-change | 值变化时触发
on-show | 弹窗出现时触发
on-hide | 弹窗关闭时触发
on-shadow-change | picker 值变化时触发，即滑动 picker 时触发


> popupPicker
---
