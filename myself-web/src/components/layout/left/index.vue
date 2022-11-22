<!-- eslint-disable vue/multi-word-component-names -->
<style src="./left.scss" lang="scss" scoped></style>

<template>
  <div :class="['left-nav', { 'left-active': !isCollapse }]">
    <div class="left-logo" @click="goRouter(constant.PATH_NAME_WELCOME)">
      <img src="@/assets/icon/变形金刚.svg" alt="" class="left-logo-img1">
      <span v-if="isCollapse" class="text-text">LiuK's MIS</span>
    </div>
    <!-- NavMenu 导航菜单 default-active: 当前激活菜单的 index; collapse: 是否水平折叠收起菜单; index: 唯一标志; -->
    <el-menu :default-active="activeIndex" :collapse="isCollapse" class="el-menu-vertical">
      <!-- 系统权限菜单 -->
      <div v-show="!menuType" class="menu-list">
        <!-- 看板 -->
        <el-menu-item v-if="webPower.dashboard" index="1" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/Dashboard.svg" alt="">
          <span v-if="isCollapse">{{ $t('left.dashboard') }}</span>
        </el-menu-item>
        <!-- 店铺 -->
        <el-menu-item v-if="webPower.shop" index="2" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/Marketing.svg" alt="">
          <span v-if="isCollapse">{{ $t('left.shop') }}</span>
        </el-menu-item>
        <!-- 订单 -->
        <el-menu-item v-if="webPower.orderlist" index="3" @click="goRouter(constant.PATH_NAME_DASHBOARD)">
          <img src="@/assets/icon/Orders.svg" alt="">
          <span v-if="isCollapse">{{ $t('left.orders') }}</span>
        </el-menu-item>
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
      isCollapse: true, // 左边栏是否显隐
      constant: PATH_NAME, // 跳转的路径集
      activeIndex: '',
      userInfo: '', // 存储在sessionStorage的用户信息数据
      webPower: {} // 权限集合
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
