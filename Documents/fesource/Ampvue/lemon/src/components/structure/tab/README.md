## 标签页tab

[demo地址](https://egis-cssp-dmzstg1.pingan.com.cn/m/tetris_release/index-app.html#/demo/tab/tab)


##### 用法
```
<template>
    <tab>
        <tab-item selected @on-item-click="onItemClick">申购规则</tab-item>
        <tab-item @on-item-click="onItemClick">赎回规则</tab-item>
    </tab>
    <br/>
    <stub></stub>
    <tab>
        <tab-item selected>申购规则</tab-item>
        <tab-item>赎回规则</tab-item>
        <tab-item>定投规则</tab-item>
        <tab-item>定投规则</tab-item>
        <tab-item>定投规则</tab-item>
    </tab>
    <br/>
    <stub></stub>
    <tab>
        <tab-item>保险</tab-item>
        <tab-item selected>健康</tab-item>
        <tab-item>理财</tab-item>
        <tab-item>彩票</tab-item>
        <tab-item>理财</tab-item>
    </tab>
    <br/>
    <stub></stub>
    <tab>
        <tab-item v-for="(item, index) in tabObj" :selected="item.selected" :key="index">{{item.name}}</tab-item>
    </tab>
    <br/>
    <stub></stub>
    <h4>使用传对象的方式</h4>
    <tab :item-data="tabObj"></tab>
    <br/>
    <stub></stub>
    <h4>可滚动形式</h4>
    <tab scrollable>
        <tab-item>保险</tab-item>
        <tab-item selected>健康</tab-item>
        <tab-item>理财</tab-item>
        <tab-item>彩票</tab-item>
        <tab-item>理财</tab-item>
        <tab-item>自营</tab-item>
        <tab-item>彩票</tab-item>
        <tab-item>理财</tab-item>
        <tab-item>彩票健康</tab-item>
    </tab>
    <br/>
    <h4>scroll滚动方式2</h4>
    <slidetab :item-data="items" @on-click="tab" scrollable></slidetab>
    <stub></stub>
    <br/>
    <slidetab :item-data="items2" @on-click="tab" active="3" scrollable></slidetab>
    <stub></stub>
    <br/>
    <slidetab :item-data="items3" @on-click="tab" active="1" ></slidetab>
    <stub></stub>
    <br/>
</template>

```

## tab标签

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
scrollable | Boolean | false | 内容超过屏幕宽度时，默认是否可以左右滑动
item-data | Array | [] | 展示循环标签的数据
~~bar-height~~ | ~~Number~~ | ~~4~~ | ~~默认下划线的高度~~
~~active-color~~ | ~~String~~ | ~~#d7ac62~~ | ~~默认选中标签的文字颜色~~
~~bar-active-color~~ | ~~String~~ | ~~#d7ac62~~ | ~~默认选中标签的下划线颜色~~


##### 使用备注
> 该组件的`slot`的子元素只能为`tab-item`；该组件有两种使用方法：一是传子标签，直接传数组`item-data`，用来表示需要展示的标签名称数组


## tab-item标签

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
selected | Boolean | false | 是否选中
~~active-class~~ | ~~String~~ | ~~#d7ac62~~ | ~~默认选中标签的文字颜色~~
~~disabled~~ | ~~Boolean~~ | ~~--~~| ~~是否不可点击~~

##### 事件methods
事件名|  描述
---|---
on-item-click | emit出的方法，点击标签时触发的事件，返回当前点击的index

## slide-tab标签

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
active | Boolean | false | 是否选中
item-data | Array | [] | 展示循环标签的数据
scrollable | Boolean | false | 内容超过屏幕宽度时，默认是否可以左右滑动

##### 事件methods
事件名|  描述
---|---
on-click | emit出的方法，点击标签时触发的事件，返回当前点击的数据对象

##### 使用备注
> 该组件是有左右滑动动画效果的