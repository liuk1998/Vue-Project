<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div v-for="(itm, idx) in list" :key="idx">我的名字: {{ itm.name }}, 我的年龄: {{ itm.age }}</div>
    <div v-for="(value, key, idx) in myself" :key="idx">{{ `${key} ---> ${value} ---> ${idx}` }}</div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Test03',
  data () {
    return {
      list: [
        { name: '刘彦琦', age: 18 },
        { name: '刘可', age: 24 }
      ],
      myself: {
        name: 'liuk',
        age: 24,
        address: '辽宁大连'
      }
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>

</style>
