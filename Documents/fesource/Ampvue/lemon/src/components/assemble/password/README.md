## password

**demo地址:**  http://localhost:8088/#/demo/password/password

##### 应用场景
> h5乱序的密码键盘，多用于开户时的密码确认，或交易时输入交易密码

##### 用法
```
<template>

    <password 
        btn-text="下一步"
        @on-nextbtn="onNextbtn"
        @on-setpwd="onSetpwd">
            <span slot="note">忘记密码?</span>
    </password>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---

##### 事件methods
事件名|  描述
---|---
on-nextbtn | 点击下一步按钮时触发
on-setpwd | 非必需绑定的事件，触发slot为note的事件



> 可自定义slot为note的内容，该内容若需触发其点击事件，需绑定“on-setpwd”事件
---