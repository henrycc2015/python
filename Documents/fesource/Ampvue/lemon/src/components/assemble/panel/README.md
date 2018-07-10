## panel

**demo地址:**  http://localhost:8088/index.html#/demo/panel/panel

##### 应用场景
> 展示信息的面板

##### 用法
```
<template>

    <panel title="理赔信息">
        <span slot="operator" style="color:#d7ac62">修改</span>
        <div slot="body" class="info-content">
            <text-row :line="false">
                <span slot="title">申请号:</span>
                <span slot="content">4567890987654567</span>
            </text-row>
            <text-row :line="false">
                <span slot="title">受理日期:<br />&nbsp;&nbsp;</span>
                <span slot="content">已受理<br />
                2018-9-1</span>
            </text-row>
            <text-row :line="false">
                <span slot="title">受理网点:<br />&nbsp;&nbsp;</span>
                <span slot="content">上海市徐汇区金融街道上海市徐汇区金融街道上海市徐汇区金融街道</span>
            </text-row>
        </div>
    </panel>

    <!-- 可展开和收起相关内容 -->
    <panel title="个人信息" is-collapse :open.sync="show1">
        <collapse-transition slot="body">
            <div class="info-content" v-show="show1">
                <text-row>
                    <span slot="title">申请号:</span>
                    <span slot="content">4567890987654567</span>
                </text-row>
                <text-row>
                    <span slot="title">受理日期:<br />&nbsp;&nbsp;</span>
                    <span slot="content">已受理<br />
                    2018-9-1</span>
                </text-row>
                <text-row>
                    <span slot="title">受理网点:<br />&nbsp;&nbsp;</span>
                    <span slot="content">上海市徐汇区金融街道上海市徐汇区金融街道上海市徐汇区金融街道</span>
                </text-row>
            </div>
        </collapse-transition>
    </panel>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
is-need-top-border | Boolean| -- | 是否需要上边框
title | [String, Number] | -- | 标题
sub-title | [String, Number]| -- | 子标题
style-object | Object| false | 自定义标题样式
is-collapse | Boolean| false | 是否有展示更多信息的功能
open | Boolean| false | 箭头是提示展开更多还是收起内容

##### 事件methods
事件名|  描述
---|---



> 
---