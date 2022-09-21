<template>
  <div class="page">
    <div class="area fxq_login">
      <div class="area_img1">
        <img src="../../assets/icon/pic_pc.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassword'
}
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-color: #fcf9f8;

  .area {
    position: absolute;
    top: 100px;
    left: calc(50% - 350px);
    margin: 80px auto;
    width: 700px;
    height: 490px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 2px 6px 0px rgba(231, 117, 0, 0.12);
    border: 1px solid black;

    .area_img1 {
      float: left;
      margin-left: -65px;
      margin-top: 190px;
    }
  }
}
</style>
