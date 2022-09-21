<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 文本 -->
    <input type="text" v-model="text">
    <div>文本: {{ text }}</div>

    <!-- 评论框 -->
    <textarea name="" id="" cols="30" rows="10" v-model="area"></textarea>

    <!-- 多选 -->
    <div>{{ checkNames }}</div>
    <input type="checkbox" id="liuk" value="01" v-model="checkNames">
    <label for="liuk">刘可</label>
    <input type="checkbox" value="02" id="lyq" v-model="checkNames">
    <label for="lyq">刘彦琦</label>
    <input type="checkbox" value="03" id="ldh" v-model="checkNames">
    <label for="ldh">刘德华</label>

    <!-- 单选 -->
    <div>{{ radioNames }}</div>
    <input type="radio" id="lk" value="刘可" v-model="radioNames">
    <label for="lk">刘可</label>
    <input type="radio" value="刘彦琦" id="lyq1" v-model="radioNames">
    <label for="lyq1">刘彦琦</label>

    <br>

    <!-- 下拉列表 -->
    <select name="" id="" v-model="selectNames">
      <option value="lh">鹿晗</option>
      <option value="zyx">张艺兴</option>
      <option value="hzt">黄子韬</option>
    </select>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Test05',
  data () {
    return {
      text: '我是文本',
      area: '我是评论框',
      checkNames: [],
      radioNames: '',
      selectNames: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
