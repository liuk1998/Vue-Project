<!-- eslint-disable vue/multi-word-component-names -->
<!-- 模版标签： 写html -->
<template>
  <div class="box">
    <!-- 插值表达式 -->
    <!-- 事件绑定 -->
    <div class="area" @click="print(1)">{{ `${name}是大美人` }}{{ text === 1 ? 2 : 0 }}</div>
    <!-- 条件判断 -->
    <p v-if="text === 2">vue条件判断</p>
    <p v-else>否则条件判断</p>
    <!-- 属性渲染 -->
    <img v-bind:src="imgUrl" alt="">
    <!-- 实现表单输入和应用状态之间的双向绑定。 -->
    <input type="text" :placeholder="placeText" v-model.trim="data">
    <!-- 条件循环 -->
    <div v-if="text === 1">
      <div v-for="(itm, idx) of list" :key="idx">{{ itm }}</div>
    </div>
    <!-- 组件 -->
    <VerifcationCode></VerifcationCode>
  </div>
</template>
<script>
import VerifcationCode from '@/components/register/verificationCode.vue'

// 写js逻辑
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Test',
  components: {
    VerifcationCode
  },
  data () {
    return {
      text: 1,
      name: '刘彦琦',
      imgUrl: require('../assets/logo.png'),
      placeText: '请输入',
      list: ['lk', 'lyq', 'ljl', 'gry'],
      data: '16',
      bbb: '我是刘可',
      // 管理类名的对象
      classObject: {
        'text-danger': true
      }
    }
  },
  computed: {
    newData () {
      return [...this.data]
    }
  },
  watch: {
    placeText () {
      this.bbb = '我是刘彦琦的老公'
    }
  },
  methods: {
    print (num) {
      this.classObject['text-danger'] = false
      console.log('v-on事件绑定:', num)
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

  .area {
    width: 50%;
    height: 50%;
    border: 2px solid red;
  }

  .classObject {
    color: red;
  }

}
</style>
