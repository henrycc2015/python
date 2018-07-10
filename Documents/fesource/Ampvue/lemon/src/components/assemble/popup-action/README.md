## popupActionList

**demo地址:**  http://localhost:8088/#/demo/popupAction/popupAction

##### 应用场景
> 由底部弹出的可自定义操作内容的选择框

##### 用法
```
<template>
    <!-- 默认内容样式 -->
    <popup-action-list :title="title2" pop-title="信息更改" @on-show="onShow" @on-hide="onHide" @on-change="onChange" @on-navigate="onNavigate"></popup-action-list>
        
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
title | String| -- | cell的标题
pop-title | String| -- | 弹框的标题
cancel-text | String| -- | 弹框头部的取消文字
confirm-text | String| -- | 弹框头部的确认文字
placeholder | String| 请输入 | 提示文字

##### 事件methods
事件名|  描述
---|---
on-change | 值变化时触发
on-show | 弹窗出现时触发
on-hide | 弹窗关闭时触发
on-modify | 点击修改时触发
on-delete | 点击删除时触发
on-cancel | 点击取消时触发


> 该组件样式方法已定，不宜做修改
---

## popupActionSlot

**demo地址:**  http://localhost:8088/#/demo/popupAction/popupAction

##### 应用场景
> 由底部弹出的可自定义操作内容的选择框

##### 用法
```
<template>
    <!-- 自定义内容 -->
    <popup-action-slot :title="title3" pop-title="自定义内容" @on-show="onShow" @on-hide="onHide" @on-change="onChange" @on-navigate="onNavigate">
        <cell-display :item="item"  v-for="(item,index) in bussinessTypeList" :key="index"  :title="item" @click.native="toCancel(item)">
            <icon name="angle-right-bold" size="28" color="#666"></icon>
        </cell-display>
    </popup-action-slot>
        
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
title | String| -- | cell的标题
pop-title | String| -- | 弹框的标题
cancel-text | String| -- | 弹框头部的取消文字
confirm-text | String| -- | 弹框头部的确认文字
placeholder | String| 请输入 | 提示文字

##### 事件methods
事件名|  描述
---|---
on-change | 值变化时触发
on-show | 弹窗出现时触发
on-hide | 弹窗关闭时触发


> 自定义的内容
---
