<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <button @click="handleClick('你最强', $event)">按钮</button>
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Test04',
  data () {
    return {
      text: '你最棒',
      num: 0
    }
  },
  methods: {
    handleClick (message, event) {
      this.text = message
      // event: 原生事件对象
      console.log('%cevent', 'color: green', event)
    },
    add () {
      console.log(this.num)
      this.num += 1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
