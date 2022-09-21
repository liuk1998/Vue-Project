<!-- eslint-disable vue/multi-word-component-names -->
<!-- 模版标签： 写html -->
<template>
  <div class="box">
    <!-- 条件渲染 v-if与v-show的区别: v-if是真正的条件渲染; v-show相当于display: none与display: block; -->
    <div v-if="open">我是刘彦琦</div>
    <div v-else>我是刘可</div>

    <div v-show="open">我是刘彦琦</div>
    <div v-show="!open">我是刘可</div>

    <button @click="change">按钮</button>
  </div>
</template>
<script>
// 写js逻辑
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Test',
  data () {
    return {
      open: true
    }
  },
  methods: {
    change () {
      this.open = !this.open
    }
  }

}
</script>

<style lang="scss" scoped>
// css 写样式
.box {
  width: 300px;
  height: 100px;
  border: 2px solid black;
}
</style>
