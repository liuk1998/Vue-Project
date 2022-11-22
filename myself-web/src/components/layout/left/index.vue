<!-- eslint-disable vue/multi-word-component-names -->
<style src="./left.scss" lang="scss" scoped></style>

<template>
  <div :class="['left-nav', { 'left-active': !isCollapse }]">
    <div class="left-logo" @click="goRouter(constant.PATH_NAME_WELCOME)">
      <img src="@/assets/icon/变形金刚.svg" alt="" class="left-logo-img1">
      <span v-if="isCollapse" class="text-text">LiuK's MIS</span>
    </div>
    <!-- NavMenu 导航菜单 default-active: 当前激活菜单的 index; collapse: 是否水平折叠收起菜单; -->
    <el-menu :default-active="activeIndex" :collapse="isCollapse" class="el-menu-vertical">
      <div v-show="!menuType" class="menu-list">

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
      activeIndex: ''
    }
  },
  computed: {
    menuType () {
      // 左侧菜单显示，系统设置、其他设置单独显示.
      return this.$options.filters.activeMenuType(this.activeIndex)
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
