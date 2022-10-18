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
    <!-- <div class="route-name"></div> -->
    <div class="global-alert" style="min-width: 425px;height: 42px;background:#FFF6EA; position: absolute;left: 45px;right: 700px;"></div>
    <div class="global-alert"></div>
    <!-- flex布局占位 -->
    <div id="tags-view-container" class="tags-view-container"/>
    <!-- <div class="tracking_no"></div> -->
    <!-- 版本按钮 icon: 图标类名 -->
    <div v-show="!guideSwitch" class="all guideBtn">
      <el-button type="warning" icon="el-icon-data-line" @click="goVersionChoose">{{ guideName }}</el-button>
    </div>
    <div class="war-header-user">
      <!-- 跳转3d库 -->
      <div class="header-btn">
        <img src="@/assets/icon/wmsTitle.png" alt="" class="header-btn-img">
        <p class="header-btn-text" @click="goThree">hightopo</p>
      </div>
      <div class="header-btn">

      </div>
      <div class="header-btn">

      </div>
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
      leftOrBack: true, // 显示控制左侧导航图标或者返回图标
      guideSwitch: true, // 判断是否免费版或付费版
      guideName: '' // 版本名称
    }
  },
  computed: {
  },
  mounted () {
    this.guideShow() // 版本按钮
  },
  methods: {
    // 打开左侧组件
    openLeft () {
      this.isDeg = !this.isDeg
      // Bus.$emit('myMsg', this.isCollapse) // 发送 myMsg 主题 的Bus消息
    },
    // 版本按钮
    guideShow () {
      if (this.$store.state.user.companyInfo) {
        const saasVersionName = this.$store.state.user.companyInfo.saasVersionName
        if (saasVersionName === 'Upgrade') {
          this.guideSwitch = false
          this.guideName = 'Upgrade'
        } else {
          // 换算倒计时天数
          const day = this.$moment(this.$moment('2023-08-02 00:00:00').format('YYYY-MM-DD')).diff(this.$moment(new Date()).format('YYYY-MM-DD')) / 1000 / 60 / 60 / 24
          this.guideName = `${saasVersionName}(${day > 0 ? day : 0} ${this.$t('header.days')})`
          if (day > 30) {
            this.guideSwitch = true
          } else {
            this.guideSwitch = false
          }
        }
      } else {
        this.guideSwitch = false
        const day = this.$moment(this.$moment('2022-10-22 00:00:00').format('YYYY-MM-DD')).diff(this.$moment(new Date()).format('YYYY-MM-DD')) / 1000 / 60 / 60 / 24
        this.guideName = `Free(${day > 0 ? day : 0} ${this.$t('header.days')})`
        if (day > 30) {
          this.guideSwitch = true
        } else {
          this.guideSwitch = false
        }
      }
    },
    // 跳转版本页面
    goVersionChoose () {
      console.log('跳转版本页面')
      // this.$router.push({ name: 'paket' })
    },
    // 跳转3d库
    goThree () {
      window.open('https://www.hightopo.com/demos/index.html')
    }
  }
}
</script>
