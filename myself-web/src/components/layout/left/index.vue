<!-- eslint-disable vue/multi-word-component-names -->
<style src="./left.scss" lang="scss" scoped></style>

<template>
  <div :class="['left-nav', { 'left-active': !isCollapse }]">
    <div class="left-logo" @click="goRouter(constant.PATH_NAME_WELCOME)">
      <img src="@/assets/icon/变形金刚.svg" alt="" class="left-logo-img1">
      <span v-if="isCollapse" class="text-text">LiuK's MIS</span>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js' // 引入事件容器 (事件派发)
import { PATH_NAME } from '@/utils/constant' // 引入常量文件

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Left',
  data () {
    return {
      isCollapse: true,
      constant: PATH_NAME
    }
  },
  mounted () {
    // 控制左边栏显隐 观察者模式 (注册方法)
    Bus.$on('myMsg', myMsg => {
      this.isCollapse = myMsg
    })
  },
  methods: {
    // 跳转对应的页面
    goRouter (data) {
      this.$router.push({ name: data.name })
    }
  }
}
</script>
