<template>
  <div class="guide-wrap"
       ref="guideRef"
       :style=[guideStyle]>
    <div class="title">
      <div class="left">
        <p class="step-label">{{step}}</p>
        <p class="step-text">{{$$(activeStepObj,'title')}}</p>
      </div>
      <div @click.stop="closeHandler">
        <img src="@/assets/images/close.png"
             class="close-icon pointer"
             alt="">
      </div>
    </div>
    <div class="content-wrap">
      <p class="content-label">{{$$(activeStepObj,'content')}}</p>
    </div>
    <div class="bottom-wrap">
      <div class="left">
        <p v-for="(item,index) in totalStep"
           class="step-dot"
           :id="item===step?'is-dot-active':''"
           :key="index"></p>
      </div>
      <div class="right">
        <p @click.stop="closeHandler"
           class="prev-text pointer  text-ellipsis">{{$$(activeStepObj,'prevText')}}</p>
        <div @click.stop="nextHandler"
             v-ripple
             class="next-btn pointer text-ellipsis">{{$$(activeStepObj,'nextText')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guide',
  data () {
    return {
      step: 1
    }
  },
  inject: ['opts', 'closeCb'],
  computed: {
    stepList () {
      const { stepList } = this.opts || {}
      return stepList || []
    },

    totalStep () {
      return this.stepList?.length
    },
    activeEl () {
      const { classId } = this.activeStepObj || {}
      return classId
    },
    activeStepObj () {
      console.log('active>>', this.stepList?.[this.step - 1]);
      return this.stepList?.[this.step - 1]
    },
    guideStyle () {
      const { top = 50, left = 0, dotBorderColor = '#179971', dotBgColor = '#7a8793', width = 306, height = 122, bgColor = '#262D33', borderColor = '#179971' } = this.opts || {}
      return {
        '--bgColor': bgColor,
        '--dot-border-color': dotBorderColor,
        '--dot-bg-color': dotBgColor,
        '--border-color': borderColor,
        '--top': `${top}px`, '--left': `${left}px`, '--width': `${width}px`, '--height': `${height}px`
      }
    }
  },
  methods: {
    async removeCurDom () {

    },
    closeHandler () {
      this.closeGuide()
    },
    closeGuide () {
      const closeCb = this.closeCb
      const child = document.querySelector('#app')
      if (!child) return
      child.parentNode.removeChild(child)
      console.log('closeCb--2', closeCb, this.closeCb);
      closeCb && closeCb('已关闭')
    },
    nextHandler () {
      this.closeHandler()
      if (this.step >= this.totalStep) {
        this.step = 1
        return
      }
      this.step += 1
    }
  },
  mounted () {
    const { curStep } = this.opts || {}
    this.step = curStep
    console.log('reject>>>', this.opts, this.closeCb);
  }
}
</script>

<style lang="scss">
.guide-wrap {
  position: absolute;
  left: var(--left);
  top: var(--top);
  width: var(--width);
  height: var(--height);
  background: var(--bgColor);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  z-index: 2000;
  #is-dot-active {
    background: transparent;
  }
  .bottom-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    box-sizing: border-box;
    padding: 0 16px;
    .right {
      display: flex;
      align-items: center;
      .prev-text {
        font-family: PingFang SC;
        margin-right: 16px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #7a8793;
      }
      .next-btn {
        background: #179971;
        border-radius: 4px;
        height: 32px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        padding: 0 25px;
        line-height: 32px;
        color: #ffffff;
        max-width: 120px;
      }
    }
    .left {
      .step-dot {
        border: 1px solid var(--dot-border-color);
        box-sizing: border-box;
        background: var(--dot-bg-color);
        border-radius: 50%;
        width: 6px;
        height: 6px;
        &:not(:last-child) {
          margin-right: 4px;
        }
      }
    }
  }
  .content-label {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    color: #ffffff;
    text-align: left;
    padding-left: 16px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin: 16px 0 8px;
  }
  .close-icon {
    width: 16px;
    height: 16px;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .step-text {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    color: #179971;
  }
  .step-label {
    background: #179971;
    border-radius: 50%;
    margin-right: 7px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 17px;
    text-align: center;
    color: #202329;
    width: 17px;
    height: 17px;
  }
}
</style>