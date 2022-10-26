<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content">
    <div v-for="(itm, idx) in list" :key="idx" class="content-box">
      <div class="title">{{ itm.title }}</div>
      <div v-for="(item, index) in itm.three" :key="index" class="box" @click="openThree(item.url)">
        <img :src="item.img" alt="">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'threePage',
  data () {
    return {
      // 3D 库
      list: [
        {
          title: '地图',
          three: [
            { img: require('@/assets/three/star.png'), name: '星网锐捷-地图', url: 'https://steady-meerkat-a58eac.netlify.app' },
            { img: require('@/assets/three/head.png'), name: '阿里巴巴-城市大脑', url: 'https://benevolent-praline-c2cd3a.netlify.app' }
          ]
        },
        {
          title: '军区',
          three: [{ img: require('@/assets/three/military.png'), name: '业务态势与调度平台', url: 'https://scintillating-wisp-2de35c.netlify.app' }]
        },
        {
          title: '城市',
          three: [
            { img: require('@/assets/three/cityWater.png'), name: '正泰-智慧水务', url: 'https://resilient-dolphin-21b94d.netlify.app' },
            { img: require('@/assets/three/city.png'), name: '正泰-科技园', url: 'https://cute-crepe-db9859.netlify.app' },
            { img: require('@/assets/three/xiamen.png'), name: '厦门双子塔', url: 'https://imaginative-bavarois-c15422.netlify.app' },
            { img: require('@/assets/three/substation.png'), name: '变电所', url: 'https://delicate-praline-ff2436.netlify.app' }
          ]
        },
        {
          title: '政府',
          three: [
            { img: require('@/assets/three/police.png'), name: '公安交通管理控制中心', url: 'https://peaceful-hummingbird-e689c6.netlify.app' }
          ]
        },
        {
          title: '工厂',
          three: [
            { img: require('@/assets/three/audi.png'), name: '麦克奥迪-配电厂', url: 'https://fastidious-squirrel-7fd70e.netlify.app' },
            { img: require('@/assets/three/granary.png'), name: '麦克奥迪-粮仓', url: 'https://venerable-sopapillas-4974a3.netlify.app' },
            { img: require('@/assets/three/iron.png'), name: 'HT-室内钢厂', url: 'https://deft-dragon-e8a806.netlify.app' },
            { img: require('@/assets/three/factory.png'), name: 'HT-电缆厂', url: 'https://bejewelled-cheesecake-34ab13.netlify.app' },
            { img: require('@/assets/three/ship.png'), name: '中远-船厂', url: 'https://frolicking-pudding-8614de.netlify.app' }
          ]
        }
      ]
    }
  },
  methods: {
    // 打开3D场景
    openThree (url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #EDF1F7;
  overflow: auto;

  .content-box {
    width: 60%;
    padding-top: 30px;

    .title {
      font-size: 30px;
      margin-bottom: 15px;
      font-weight: 500;
    }

    .box {
      float: left;
      background: white;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      margin: 0 11px 22px;
      width: 202px;
      cursor: pointer;
      transition: .3s;

      &:hover {
        opacity: 0.9;
        box-shadow: 0 1px 20px rgb(0 0 0 / 30%);
      }

      img {
        width: 100%;
        height: 110px;
      }

      div {
        font-size: 13px;
        height: 20px;
        padding: 5px 10px 12px;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-weight: bold;
      }
    }
  }

}
</style>
