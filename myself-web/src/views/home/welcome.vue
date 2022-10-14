<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="wrap-page">
    <div class="wrap-box">
      <!-- 头部组件 -->
      <header-view />
      欢迎页
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header/index'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Welcome',
  components: {
    HeaderView
  }
}
</script>

<style lang="scss" scoped>
.wrap-page {
  background-image: url('@/assets/bg/welcome_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 12px;
  background-attachment: fixed;
  height: 100%;
}
</style>
