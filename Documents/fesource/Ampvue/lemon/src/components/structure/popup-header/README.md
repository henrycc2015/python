## popup-header

**demo地址:**  http://localhost:8088/#/demo/popupHeader/popupHeader

##### 应用场景
> 主要运用在popupPicker和popupAction这两需自定义内容的组件中

##### 用法
```
<template>
    <!-- 默认样式 -->
    <popup-header>
        <span slot="left-text" @click="onHide(2)">取消</span>
        <span slot="title">授权账号</span>
        <span slot="right-text" @click="onHide(2)">确定</span>
    </popup-header>
    
    <!-- 自定义内容 -->
    <popup-header>
        <icon slot="left-text" name="cross" size="44" color="#666" @click.native="onHide(1)"></icon>
        <span slot="title">信息更改</span>
        <span slot="right-text"></span>
    </popup-header>
        
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
title | String| -- | 标题
left-title | String| -- | 取消文字
right-title | String| -- | 确认文字
show-bottom-border | Boolean| true | head底部是否为短边框

##### 事件methods
事件名|  描述
---|---
on-click-left | 点击取消时触发的方法
on-click-right | 点击确定时触发的方法


> 使用该组件时，要注意各个具名slot所替换的内容
---