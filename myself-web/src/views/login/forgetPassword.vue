<template>
  <div class="page">
    <div class="area fxq_login">
      <div class="area_img1">
        <img src="../../assets/icon/pic_pc.png" alt="">
      </div>
      <div class="area_img2">
        <img src="../../assets/icon/forget2.png" alt="">
      </div>
      <div class="form">
        <div class="title">
          <span>{{ $t('login.forgetPasswordTitle') }}</span>
        </div>
        <div class="tab">
          <div :style="{ 'transform': `translateX(${ channel === 0 ? 0 : 100 }%)` }" class="choose_tab_active_bar" />
          <div :class="['choose_tab', { 'is_active': channel === 0 }]" @click="changeChannel(0)">{{ $t('login.phone') }}</div>
          <div :class="['choose_tab', { 'is_active': channel === 1 }]" @click="changeChannel(1)">{{ $t('login.email') }}</div>
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassword',
  data () {
    return {
      channel: 0, // 登录方式
      ruleForm: {}, // 表单认证信息
      rules: {} // 表单认证规则
    }
  },
  methods: {
    // 改变登录方式
    changeChannel (code) {
      this.channel = code
      this.initFromRules()
    },
    // 移除表单验证(结果)
    initFromRules () {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    }
  }
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

    .area_img1 {
      float: left;
      margin-left: -65px;
      margin-top: 190px;
    }

    .area_img2 {
      float: right;
      margin-right: -38px;
      margin-top: -186px;
    }

    .form {
      position: absolute;
      width: 450px;
      left: 125px;
      margin-top: 60px;

      .title {
        font-size: 24px;
        color: #262326;
        line-height: 18px;
        height: 30px;
        margin-left: 10px;
        margin-bottom: 10px;
        text-align: center;
        font-weight: 500;
      }

      .tab {
        position: relative;
        padding-bottom: 4px;
        cursor: pointer;
        margin: 0px 41px;
        display: flex;

        .choose_tab_active_bar {
          width: 50%;
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background-color: #465fd2;
          z-index: 2;
          transition: transform .3s cubic-bezier(.645, .045, .355, 1);
        }

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 4px;
          background-color: #e6eaff;
          z-index: 1;
          border-radius: 25px;
        }

        .choose_tab {
          width: 50%;
          font-size: 18px;
          font-weight: 700;
          text-align: center;
          line-height: 34px;
          color: #adb9f0;
          transition: .3s;
        }

        .is_active {
          color: #465fd2;
          transition: .3s;
        }
      }
    }
  }
}
</style>
