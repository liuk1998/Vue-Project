<!-- eslint-disable vue/multi-word-component-names -->
<style src="./header.scss" lang="scss" scoped></style>

<template>
  <div class="header">
    <!-- 控制左侧导航图标 -->
    <div v-show="leftOrBack" class="header-left" @click="openLeft">
      <img :class="{ deg180: isDeg }" src="@/assets/icon/目录收起.svg" alt="">
    </div>
    <!-- 返回图标 -->
    <div v-show="!leftOrBack">{{ $t('header.back') }}</div>
    <!-- 路由名称 -->
    <!-- <div class="route-name"></div>
    <div class="global-alert"></div>
    <div class="global-alert"></div>
    <div id="tags-view-container" class="tags-view-container"/> -->
    <!-- <div class="tracking_no"></div> -->
    <div class="all guideBtn">
      <!-- icon: 图标类名 -->
      <el-button type="warning" icon="el-icon-data-line">{{ '按钮' }}</el-button>
    </div>
  </div>
</template>

<script>
// import Bus from '@/utils/bus.js' // 引入事件容器 (事件派发)

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data () {
    return {
      isDeg: true, // 显示或隐藏左侧组件(旋转头部图标开关)
      leftOrBack: true // 显示控制左侧导航图标或者返回图标
    }
  },
  mounted () {
    console.log('sss', this.leftOrBack)
  },
  methods: {
    // 打开左侧组件
    openLeft () {
      this.isDeg = !this.isDeg
      // Bus.$emit('myMsg', this.isCollapse) // 发送 myMsg 主题 的Bus消息
    }
  }
}
</script>
