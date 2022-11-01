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
    <div v-if="crumbsName" class="route-name">
      <span>{{ crumbsName }}</span>
    </div>
    <!-- 首页提示 -->
    <div v-show="productSwitch" class="global-alert">
      <img src="@/assets/icon/re_auth.png" alt="">
      <span class="global-text">{{ $t('header.tips') }}</span>
      <img src="@/assets/icon/re_auth_close.png" alt="" class="global-close" @click="productSwitch = !productSwitch">
    </div>
    <!-- flex布局占位 -->
    <div id="tags-view-container" class="tags-view-container"/>
    <!-- 版本按钮 icon: 图标类名 -->
    <div v-show="!guideSwitch" class="all guideBtn">
      <el-button type="warning" icon="el-icon-data-line" @click="goVersionChoose">{{ guideName }}</el-button>
    </div>
    <div class="war-header-user">
      <!-- 跳转3d库 -->
      <div class="header-btn">
        <img src="@/assets/icon/wmsTitle.png" alt="" class="header-btn-img">
        <p class="header-btn-text" @click="goThree">{{ userInfo.three ? $t('header.three') : 'hightopo' }}</p>
      </div>
      <!-- 进入官网 -->
      <div class="header-btn">
        <!-- Dropdown 下拉菜单 -->
        <el-dropdown>
          <p>{{ $t('header.website') }}</p>
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
      <!-- 用户中心 -->
      <div class="header-btn header-new">
        <div class="header-logo">
          <img :src="companyLogo()" alt="">
        </div>
        <el-dropdown>
          <div class="header-name">
            <span>{{ userInfo.username }}</span>
            <img src="@/assets/icon/下拉.svg" alt="" class="header-img">
          </div>
          <el-dropdown-menu>
            <!-- 版本按钮 -->
            <el-dropdown-item v-if="guideSwitch" style="background: #465FD2; color: white;">
              <div class="version-box" @click="goVersionChoose">
                <img src="@/assets/icon/goVersion.svg" alt=""><span>{{ guideName }}</span>
              </div>
            </el-dropdown-item>
            <!-- 基本设置 -->
            <el-dropdown-item>
              <div class="version-box" @click="goBasicSetting">
                <img src="@/assets/icon/interface-essential-268@2x.png" alt=""><span>{{ $t('header.basicSetting') }}</span>
              </div>
            </el-dropdown-item>
            <!-- 订单设置 -->
            <el-dropdown-item>
              <div class="version-box" @click="goOrderSetting">
                <img src="@/assets/icon/settings-filter-menu@2x.png" alt=""><span>{{ $t('header.orderSetting') }}</span>
              </div>
            </el-dropdown-item>
            <!-- 重置密码 -->
            <el-dropdown-item>
              <div class="version-box" @click="goResetPassword">
                <img src="@/assets/icon/keyhole-refresh-reload@2x.png" alt=""><span>{{ $t('header.resetPassword') }}</span>
              </div>
            </el-dropdown-item>
            <!-- 退出登录 -->
            <el-dropdown-item>
              <div class="version-box" @click="goLogin">
                <img src="@/assets/icon/exit-door-log-out@2x.png" alt=""><span>{{ $t('header.logout') }}</span>
              </div>
            </el-dropdown-item>
            <!-- 切换语言 -->
            <div style="width: 86%; height: 1px; background-color: #dfe4ed; margin: 0 auto;"></div>
            <el-dropdown-item>
              <div class="say-box">
                <img src="@/assets/icon/pic_english.png" alt="" :class="['lang', $i18n.locale === 'en' ? 'isActive' : '']" @click="changeLocale('en')">
                <img src="@/assets/icon/pic_chinese.png" alt="" :class="['lang', $i18n.locale === 'zh' ? 'isActive' : '']" @click="changeLocale('zh')">
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 微信二维码  Dialog 对话框 visible: 是否显示(支持组件双向绑定,即 sync) -->
    <el-dialog :visible.sync="showWeChat" width="30%">
      <img src="@/assets/icon/WechatIMG4.jpeg" alt="" width="100%" height="100%">
    </el-dialog>
    <!-- 下载进度动画 -->
    <div :class="['progress-bar', { 'active': tag }]">
      <div class="ball">
        <p v-if="guesserStatus === 3" class="speeding">{{ percentage }}%</p>
        <p v-else-if="guesserStatus === 1" class="speeding"><i class="el-icon-check"/></p>
        <p v-else-if="guesserStatus === 2" class="speeding"><i class="el-icon-close"/></p>
      </div>
      <div class="text-bar">
        <span>{{ msg }}</span>
        <span>ok</span>
      </div>
    </div>
  </div>
</template>

<script>
// import Bus from '@/utils/bus.js' // 引入事件容器 (事件派发)
import headerLogo from '@/assets/icon/hand_avatar.png'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  // 父组件传值
  props: {
    crumbsName: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isDeg: true, // 显示或隐藏左侧组件(旋转头部图标开关)
      leftOrBack: true, // 显示控制左侧导航图标或者返回图标
      guideSwitch: true, // 判断是否免费版或付费版
      guideName: '', // 版本名称
      showWeChat: false, // 是否显示微信二维码
      userInfo: '', // 存储在sessionStorage的用户信息数据
      companyInfo: '', // 存储在sessionStorage的公司信息数据
      tag: true, // 是否展示下载进度
      guesserStatus: 3, // 下载进度状态(1成功 2失败 3进行中)
      percentage: 0, // 下载动态数字
      msg: '',
      productSwitch: true // 是否处于productMaster页面
    }
  },
  computed: {
  },
  mounted () {
    this.userInfo = JSON.parse(sessionStorage.userInfo)
    this.companyInfo = sessionStorage.companyInfo !== 'undefined' ? JSON.parse(sessionStorage.companyInfo) : undefined
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
      if (this.companyInfo) {
        const saasVersionName = this.companyInfo.saasVersionName
        if (saasVersionName === 'Upgrade') {
          this.guideSwitch = false
          this.guideName = 'Upgrade'
        } else {
          // 换算倒计时天数 换算时期格式
          const day = this.$moment(this.$moment(this.companyInfo.versionDeadline).format('YYYY-MM-DD')).diff(this.$moment(new Date()).format('YYYY-MM-DD')) / 1000 / 60 / 60 / 24
          this.guideName = `${saasVersionName} (${day > 0 ? day : 0} ${this.$t('header.days')})`
          if (day > 30) {
            this.guideSwitch = true
          } else {
            this.guideSwitch = false
          }
        }
      } else {
        this.guideSwitch = false
        const day = this.$moment(this.$moment('2022-11-10 00:00:00').format('YYYY-MM-DD')).diff(this.$moment(new Date()).format('YYYY-MM-DD')) / 1000 / 60 / 60 / 24
        this.guideName = `Free (${day > 0 ? day : 0} ${this.$t('header.days')})`
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
      if (this.userInfo.three) {
        this.$router.push({ name: 'threePage' })
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
      const logo = this.companyInfo ? this.companyInfo.logo : null
      return logo || headerLogo
    },
    // 跳转基本设置页面
    goBasicSetting () {
      console.log('跳转基本设置页面')
    },
    // 跳转订单设置页面
    goOrderSetting () {
      console.log('跳转订单设置页面')
    },
    // 跳转重置密码页面
    goResetPassword () {
      console.log('跳转重置密码页面')
    },
    // 退出登录
    goLogin () {
      sessionStorage.clear()
      this.$router.push({ name: 'login' })
    },
    // 修改语言
    changeLocale (locale) {
      sessionStorage.lang = locale
      this.$router.go(0)
      this.$i18n.locale = locale
    }
  }
}
</script>
