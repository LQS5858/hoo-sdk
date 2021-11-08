
# 新手引导SDK

### 安装

#### cdn引入

```
<script src="https://unpkg.com/hoo-sdk@1.0.1/dist/hoo.umd.min.js"></script>
```

#### npm方式

```
npm i --save hoo-sdk
```

### 使用

#### 参数说明

参数|例子|说明
------｜------
opts|{curStep:1,  //当前步数
    bottom:0, // 挂载dom距离父元素距离
    stepList: [
                {
                    step: 1,
                    classId: '#root',
                    title: '选择交易对',
                    content: '选择或搜索您感兴趣的数字货币交易',
                    nextText: '下一步',
                    prevText: '跳过'
                },
                {
                    step: 2,
                    classId: '',
                    title: '选择交易对2',
                    content: '选择或搜索您感兴趣的数字货币交易2',
                    nextText: '下一步',
                    prevText: '跳过'
                }
            ]}
successCb|()=>{}|dom挂载成功的回调
closeCb|()=>{}|下一步关闭的回调

```

new hoo({
    curStep:1,  //当前步数
    bottom:0, // 挂载dom距离父元素距离
    stepList: [
                {
                    step: 1,
                    classId: '#root',
                    title: '选择交易对',
                    content: '选择或搜索您感兴趣的数字货币交易',
                    nextText: '下一步',
                    prevText: '跳过'
                },
                {
                    step: 2,
                    classId: '',
                    title: '选择交易对2',
                    content: '选择或搜索您感兴趣的数字货币交易2',
                    nextText: '下一步',
                    prevText: '跳过'
                }
            ]
},()=>{},()=>{})
```


