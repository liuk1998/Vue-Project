<!--
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-05-20 14:05:28
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-05-31 10:32:11
 * @FilePath: /myself-web/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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

    <!-- 带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS display。v-show 不支持 <template> 元素，也不支持 v-else -->
    <div v-show="!network">抱歉,没有internet连接</div>
    <!-- router-view 组件作为vue最核心的路由管理组件(承载router.js配置的组件)。在最核心的App.vue文件中通过router-view进行路由管理。使用this.$router.push进行页面上router-view组件的路由替换 -->
    <router-view v-show="network" />
  </div>
</template>

<!--  编写 javascript  -->
<script>
export default {
  name: 'App',
  // todo 存放属性。
  data () {
    return {
      network: true
    }
  },
  // todo 生命周期: 挂载后,也就是模板中的HTML渲染到HTML页面中,此时一般可以做一些ajax操作,mounted只会执行一次。
  mounted () {
    // 检测断网 -> online 事件在浏览器开始在线工作时触发。offline 事件在浏览器离线工作时触发。
    window.addEventListener('offline', () => {
      this.network = false
      console.log('已断网')
    })
    window.addEventListener('online', () => {
      this.network = true
      console.log('网络已连接')
    })
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
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    // 当链接被精确匹配的时候应该激活的 class。
    &.router-link-exact-active {
      color: #42b983;
      background-image: url("");
    }
  }
}
</style>
