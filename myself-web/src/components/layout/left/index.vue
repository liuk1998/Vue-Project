<!-- eslint-disable vue/multi-word-component-names -->
<style src="./left.scss" lang="scss" scoped></style>

<template>
  <div :class="['left-nav', { 'left-active': !isCollapse }]">
    <div class="left-logo" @click="goRouter(constant.PATH_NAME_WELCOME)">
      <img src="@/assets/icon/变形金刚.svg" alt="" class="left-logo-img1">
      <span v-if="isCollapse" class="text-text">LiuK's MIS</span>
    </div>
    <!-- NavMenu 导航菜单 default-active: 当前激活菜单的 index; collapse: 是否水平折叠收起菜单(true代表折叠;false代表打开); index: 唯一标志;
        slot="title": 缩小后移入显示title
    -->
    <el-menu :default-active="activeIndex" :collapse="!isCollapse" class="el-menu-vertical">
      <!-- 系统权限菜单 -->
      <div v-show="!menuType" class="menu-list">
        <!-- 看板 -->
        <el-menu-item v-if="webPower.dashboard" index="1" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/Dashboard.svg" alt="">
          <span slot="title">{{ $t('left.dashboard') }}</span>
        </el-menu-item>
        <!-- 店铺 -->
        <el-menu-item v-if="webPower.shop" index="2" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/Marketing.svg" alt="">
          <span slot="title">{{ $t('left.shop') }}</span>
        </el-menu-item>
        <!-- 订单 -->
        <el-menu-item v-if="webPower.orderlist" index="3" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/Orders.svg" alt="">
          <span slot="title">{{ $t('left.orders') }}</span>
          <div v-show="isCollapse" class="circle-open">{{ pendingNum }}</div>
          <div v-show="!isCollapse" class="circle-open circle-close">{{ pendingNum }}</div>
        </el-menu-item>
        <!-- 渠道商品 -->
        <el-submenu v-if="webPower.product" index="4">
          <template slot="title">
            <img src="@/assets/icon/channel.svg" alt="">
            <span v-show="isCollapse" slot="title" class="product-title">{{ $t('left.channelProduct') }}</span>
            <img v-show="isCollapse" src="@/assets/icon/more.png" alt="" class="more-icon">
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
              <div class="group-box">
                <img src="@/assets/icon/Shopee@2x.png" alt="">
                <span>Shopee</span>
              </div>
            </el-menu-item>
            <el-menu-item index="4-2" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
              <div class="group-box">
                <img src="@/assets/icon/Lazada@2x.png" alt="">
                <span>Lazada</span>
              </div>
            </el-menu-item>
            <el-menu-item index="4-3" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
              <div class="group-box">
                <img src="@/assets/icon/Tokopedia@2x.png" alt="">
                <span>Tokopedia</span>
              </div>
            </el-menu-item>
            <el-menu-item index="4-4" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
              <div class="group-box">
                <img src="@/assets/icon/tiktok_stacked.png" alt="">
                <span>TikTok</span>
              </div>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 系统商品 -->
        <el-menu-item v-if="webPower.masterproduct" index="5" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/Marst product.svg" alt="">
          <span slot="title">{{ $t('left.productMaster') }}</span>
        </el-menu-item>
        <!-- 促销 -->
        <el-menu-item v-if="webPower.promotion" index="6" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/promotion.svg" alt="">
          <span slot="title">{{ $t('left.promotion') }}</span>
        </el-menu-item>
        <!-- 聊天 -->
        <el-menu-item v-if="webPower.chat" index="7" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/chat.svg" alt="">
          <span slot="title">{{ $t('left.chat') }}</span>
        </el-menu-item>
        <!-- 报表 -->
        <el-submenu v-if="webPower.report" index="8">
          <template slot="title">
            <img src="@/assets/icon/Report.svg" alt="">
            <span v-show="isCollapse" slot="title" class="product-title">{{ $t('left.report') }}</span>
            <img v-show="isCollapse" src="@/assets/icon/more.png" alt="" class="more-icon">
          </template>
          <el-menu-item-group>
            <el-menu-item index="8-1" @click="goRouter(constant.PATH_NAME_DASHBOARD)">{{ $t('left.marketingReport') }}</el-menu-item>
            <el-menu-item index="8-2" @click="goRouter(constant.PATH_NAME_DASHBOARD)">{{ $t('left.productReport') }}</el-menu-item>
            <el-menu-item index="8-3" @click="goRouter(constant.PATH_NAME_DASHBOARD)">{{ $t('left.orderReport') }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
    </el-menu>
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
      isCollapse: true, // 左边栏是否显隐 -> true代表显示, false代表隐藏
      constant: PATH_NAME, // 跳转的路径集
      activeIndex: '',
      userInfo: '', // 存储在sessionStorage的用户信息数据
      webPower: {}, // 权限集合
      pendingNum: 0 // 新的订单
    }
  },
  computed: {
    menuType () {
      // 左侧菜单显示，系统设置、其他设置单独显示.
      return this.$options.filters.activeMenuType(this.activeIndex)
    }
  },
  mounted () {
    this.userInfo = JSON.parse(sessionStorage.userInfo)
    // 获取权限列表
    this.getPermissionList(this.userInfo.sysResources)
    // 控制左边栏显隐 观察者模式 (注册方法)
    Bus.$on('myMsg', myMsg => {
      this.isCollapse = myMsg
    })
    // 获取权限列表 观察者模式 (注册方法)
    Bus.$on('powerChange', power => {
      this.getPermissionList(power)
    })
  },
  methods: {
    // 跳转对应的页面
    goRouter (data) {
      this.$router.push({ name: data.name })
    },
    // 获取权限列表
    getPermissionList (power) {
      power.filter(el => ['0', '1'].includes(el.type)).forEach(el => {
        this.$set(this.webPower, el.componentName.replaceAll('-', ''), true)
      })
      console.log('权限列表', this.webPower)
    }
  }
}
</script>
