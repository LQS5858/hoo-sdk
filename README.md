# 新手引导 SDK

### 安装

#### cdn 引入

```
<script src="https://unpkg.com/guide-sdk@2.0.0/dist/guide.umd.min.js"></script>
```

#### npm 方式

```
npm i --save guide-sdk
```

### 使用

```
import Guide from "guide-sdk";

const guideSdk = new Guide(
  {
    stepList: [
      {
        classId: "#test-sdk", //挂载的目标dom选择器
        title: "技术中台1",
        content: "技术中台1",
        nextText: "下一步",
        prevText: "跳过",
      },
      {
        classId: "#second-sdk", //挂载的目标dom选择器
        title: "技术中台2",
        content: "技术中台2",
        nextText: "下一步",
        prevText: "上一步",
      },
    ],
  },
  (step) => {
    //下一步回调，点击下一步需要在这里调用renderDom(+step+1)
    guideSdk.renderDom(+step + 1);
  },
  (step) => {
    //上一步回调，点击下一步需要在这里调用renderDom(+step+1)
    guideSdk.renderDom(+step - 1);
  },
  (step) => {
    //步骤全部完成回调
  }
);
guideSdk.renderDom(1);
```
