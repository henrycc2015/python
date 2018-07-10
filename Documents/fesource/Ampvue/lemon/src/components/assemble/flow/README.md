## flow

**demo地址:**  http://localhost:8088/#/demo/flow/flow

##### 应用场景
> 一般用于标识事物进度

##### 用法
```
<template>
    <!-- 默认横向显示进度  -->
    <flow>
        <v-flow-state state="1" desc="续保开始" is-done>
            <span slot="desc">续保开始</span>
        </v-flow-state>
        <v-flow-line ing></v-flow-line>

        <v-flow-state state="2" desc="等待企业缴费" >
            <span slot="desc">等待企业缴费</span>
        </v-flow-state>
        <v-flow-line ></v-flow-line>

        <v-flow-state state="3" desc="续保成功" >
            <span slot="desc">续保成功</span>
        </v-flow-state>
    </flow>

    <stub></stub>
    <!-- 纵向显示进度  -->
    <flow orientation="vertical" >
        <v-flow-state state="1" desc="提交申请" is-done>
            <span slot="desc">提交申请<br /><span class="time">2017-01-02</span></span>
        </v-flow-state>
        <v-flow-line is-done></v-flow-line>

        <v-flow-state state="2" desc="等待企业缴费" is-done>
            <span slot="desc">等待企业缴费<br /><span class="time">2017-01-02</span></span>
        </v-flow-state>
        <v-flow-line ing></v-flow-line>

        <v-flow-state state="3" desc="续保成功" >
            <span slot="desc">续保成功<br /><span class="time">2017-01-02</span></span>
        </v-flow-state>
    </flow>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
orientation | String | horizontal | 是否为横向展示

##### 事件methods
事件名|  描述
---|---


> 该组件是包含子组件flowState，由子组件决定该步骤条的进度
---