## 模态框confirm组件

**demo地址:**  http://localhost:8088/#/demo/confirm/confirm

##### 应用场景
> 弹框提示信息

##### 用法
```
<template>
    <v-confirm 
        line="3"
        v-model="showConfirm" 
        title-text="健康告知提醒" 
        cancelText="取消" 
        confirmText="重新输入" 
        :closeOnConfirm="false"
        hideOnBlur
        @on-cancel="lfn('showConfirm')" 
        @on-confirm="rfn('showConfirm')"> 
            因您提交的最新个人信息不符合我司的投保条件，我司将按产品条款约定，不承担任何保险责任。请您重新输入或取消申请。
        </v-confirm>
    
</template>

<script>
    <!-- 插件的形式调用 -- >
    this.$tetris.confirm.show({
        titleText: 'plugins confirm',
        content: 'content content',
        cancelText: '取消',
        confirmText: '确定',
        closeOnConfirm: false,    // 点击确定  是否关闭弹框
        onShow () {
            console.log('plugin show');
        },
        onHide () {
            console.log('plugin hide');
        },
        onCancel () {
            console.log('plugin cancel');
        },
        onConfirm () {
            console.log('plugin confirm');
        }
    })
</script>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
line | String | '2' | content内容的行数，可选参数：1，2，3
titleText | String | -- | 弹框标题文案
content | String | -- | 弹框主体内容文案
cancelText | String | -- | 弹框左边按钮文案
confirmText | String | -- | 弹框右边按钮文案
hideOnBlur | Boolean | -- | 点击蒙版是否可关闭模态框
closeOnConfirm | Boolean | true | 点击右边按钮是否关闭模态框

##### 事件methods
事件名|  描述
---|---
~~on-change~~ | ~~监听点击蒙版时，弹框显示与否的value值~~
on-cancel | 点击左边按钮的触发的方法
on-confirm | 点击右边按钮的触发的方法

##### 使用备注
> 该组件提供两种使用方法，一是标签式使用，二是插件的方式使用。



---