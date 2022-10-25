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
        <p class="header-btn-text" @click="goThree">{{ $store.state.user.userInfo.three ? $t('header.three') : 'hightopo' }}</p>
      </div>
      <!-- 进入官网 -->
      <div class="header-btn">
        <!-- Dropdown 下拉菜单 -->
        <el-dropdown>
          <p>Website</p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="header-website">
              <p style="text-align:center;">{{ $t('header.appDownload') }}</p>
              <img src="@/assets/icon/erweima.jpeg" alt="" style="width:220px;height:220px;">
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 帮助中心 -->
      <div class="header-btn">
        <el-dropdown>
          <p>{{ $t('header.helpTips') }}</p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="header-box">
                <img src="@/assets/icon/helpcenter.png" alt="" class="header-img">
                <span class="header-text">{{ $t('header.helpCenter') }}</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="header-box">
                <img src="@/assets/icon/instagram-fill@2x.png" alt="" class="header-img">
                <span class="header-text">Instagram</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="header-box" @click="showWeChatDialog">
                <img src="@/assets/icon/wechat.png" alt="" class="header-img">
                <span class="header-text">{{ $t('header.weChat') }}</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="header-btn">
        <div class="header-logo">
          <img :src="companyLogo()" alt="">
        </div>
        <el-dropdown>
          <span>{{ username }}</span>
          <el-dropdown-menu>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 微信二维码  Dialog 对话框 visible: 是否显示(支持组件双向绑定,即 sync) -->
    <el-dialog :visible.sync="showWeChat" width="30%">
      <img src="@/assets/icon/WechatIMG4.jpeg" alt="" width="100%" height="100%">
    </el-dialog>
  </div>
</template>

<script>
// import Bus from '@/utils/bus.js' // 引入事件容器 (事件派发)
import headerLogo from '@/assets/icon/hand_avatar.png'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data () {
    return {
      isDeg: true, // 显示或隐藏左侧组件(旋转头部图标开关)
      leftOrBack: true, // 显示控制左侧导航图标或者返回图标
      guideSwitch: true, // 判断是否免费版或付费版
      guideName: '', // 版本名称
      showWeChat: false, // 是否显示微信二维码
      username: '' // 用户名
    }
  },
  computed: {
  },
  mounted () {
    this.guideShow() // 版本按钮
    this.username = this.$store.state.user.userInfo.username
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
          // 换算倒计时天数 换算时期格式
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
        const day = this.$moment(this.$moment('2022-11-10 00:00:00').format('YYYY-MM-DD')).diff(this.$moment(new Date()).format('YYYY-MM-DD')) / 1000 / 60 / 60 / 24
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
      if (this.$store.state.user.userInfo.three) {
        console.log('跳转3D主页')
      } else {
        window.open('https://www.hightopo.com/demos/index.html')
      }
    },
    // 展示微信二维码
    showWeChatDialog () {
      this.showWeChat = !this.showWeChat
    },
    // 展示系统头像
    companyLogo () {
      const logo = this.$store.state.user.companyInfo ? this.$store.state.user.companyInfo.logo : null
      return logo || headerLogo
    }
  }
}
</script>
