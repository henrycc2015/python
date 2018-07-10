## button组件

- demo地址
    > http://localhost:8088/#/demo/button/button

### button-group

##### 用法
```
<template>

    <v-address title="开户城市" placeholder="请选择"  v-model="addressCodes" @on-hide="onHide" @on-change="onChange"></v-address>
    
</template>

```

#### 参数props
props| type| default| 备注
---|---|---|---
type | String | 'default' | 按钮是否有背景色，可选值：default-有背景色，transparent-镂空按钮，redefine-有背景色但自定义宽高，bgredefine-无背景色但自定义宽高（自定义宽高的默认最小宽高比为140/54，实际宽度依文字内容而定）
size | String | -- | 按钮宽高，默认宽高为490/80，可选参数：mini(140/54),sm(260/60),mid(340/80),lg(690/88),max(100%/120)
radius | Boolean | -- | 按钮是否有圆角
text | String | -- | 按钮上的文字
disabled | Boolean | -- | 按钮是否为不可点击状态
styles | Object | -- | 以上参数组合无法满足需求，可传自定义样式对象
#### 使用说明
当以上参数出styles外，随意组合而成的button不能满足需求时，再使用styles来自定义button的宽高



### button-sum

##### 应用场景
> 多在页面驻底部的处

##### 用法
```
<template>

    <v-address title="开户城市" placeholder="请选择"  v-model="addressCodes" @on-hide="onHide" @on-change="onChange"></v-address>
    
</template>

```

#### 参数props
props| type| default| 备注
---|---|---|---
showTotal | Boolean | true | 是否显示合计金额
value | Boolean | false | 全选按钮是否为选中状态
hascheckbox | Boolean | false | 是否有全选按钮
total | [String, Number] | -- | 合计的金额
title | String | -- | 金额前的介绍文字
disabled | Boolean | false | 按钮是否为不可点击状态
#### 事件methods
props | 备注|
--- | ---
on-commit | 点击提交按钮时，$emit出的方法
choose-all | 点击全选按钮时，$emit出的方法
#### 使用说明
当需要获取当前全选按钮的value值，可在父组件上绑定‘choose-all’事件，获取参数即为value值