<!--  编写 html  -->
<template>
  <div id="app">
    <!-- nav标签 没有实际的显⽰效果，只是起到语义的作⽤。 是使⽤来定义导航链接的部分。⽤来表⽰该区域是导航链接，默认并没有什么显⽰效果。-->
    <!-- <nav> -->
      <!-- <router-link>组件支持用户在具有路由功能的应用中点击导航。通过to属性指定目标地址(一般为router.js配置的地址)，相当于<a>标签，可以通过配置tag属性生成别的标签。当目标路由成功激活时，自动设置一个表示激活的css类名 -->
      <!-- <router-link to="/">Login</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- </nav> -->

    <div class="wrap-area">
      <div v-show="menubar">
        <!-- 左侧导航组件 -->
        <left-view />
      </div>
      <!-- 带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS display。v-show 不支持 <template> 元素，也不支持 v-else -->
      <div v-show="!network" class="no-internet">
        <img :src="networkImg" alt="">
        <p>抱歉,没有internet连接</p>
      </div>
      <!-- router-view 组件作为vue最核心的路由管理组件(承载router.js配置的组件)。在最核心的App.vue文件中通过router-view进行路由管理。使用this.$router.push进行页面上router-view组件的路由替换 -->
      <router-view v-show="network" />
    </div>
  </div>
</template>

<!--  编写 javascript  -->
<script>
import { emailList, phoneList, userInfo, companyInfo } from '@/mock/constant' // 引入 mock 静态资源
import LeftView from '@/components/layout/left.vue' // 引入左侧导航组件

export default {
  name: 'App',
  components: {
    LeftView
  },
  // todo 存放属性。
  data () {
    return {
      network: true, // 是否断网
      networkImg: '', // 断网图片
      menubar: false // 左侧导航组件开关
    }
  },
  // 监听器: 当监听的属性变量变化时，会触发 watch 中的方法
  watch: {
    // 监听路由的路径名; $route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。
    '$route.path' (newVal, oldVal) {
      const { options: { routes } } = this.$router // $router对象是全局路由的实例;
      // 判断是否显示左侧导航
      const findRoute = routes.find(el => el.path === newVal)
      this.menubar = findRoute && findRoute.menubar
      console.log('route', this.menubar, findRoute)
    }
  },
  // todo 生命周期: 挂载后,也就是模板中的HTML渲染到HTML页面中,此时一般可以做一些ajax操作,mounted只会执行一次。
  mounted () {
    const { NoInternetImg } = require('@/assets/js/NoInternetImg.js')
    this.networkImg = NoInternetImg
    // 检测断网 -> online 事件在浏览器开始在线工作时触发。offline 事件在浏览器离线工作时触发。
    window.addEventListener('offline', () => {
      this.network = false
      console.log('已断网')
    })
    window.addEventListener('online', () => {
      this.network = true
      console.log('网络已连接')
    })

    // 存储到 localStorage
    // localStorage.clear()
    if (!localStorage.emailList && !localStorage.phoneList) {
      localStorage.emailList = JSON.stringify(emailList)
      localStorage.phoneList = JSON.stringify(phoneList)
      localStorage.userInfo = JSON.stringify(userInfo)
      localStorage.companyInfo = JSON.stringify(companyInfo)
    }
  }
}
</script>

<!--  编写 css  -->
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;

  .wrap-area {
    width: 100%;
    height: 100%;
    overflow: auto hidden;
    display: flex;
    background-color: #fcf9f8;

    .wrap-page {
      width: 100%;
      background-color: #f5f5f5;
    }

    // 断网
    .no-internet {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 350px;
      }

      p {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
}

nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    // 当链接被精确匹配的时候应该激活的 class。
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
