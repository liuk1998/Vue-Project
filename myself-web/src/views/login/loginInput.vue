<template>
  <div class="fxq_login login_from">
    <div class="select_login_try">
      <div :class="loginWithchannel===1 ? 'login-select' : 'login-unselect'" @click="toggleLogin(1)">{{ $t('login.phone') }}</div>
      <div :class="loginWithchannel===1 ? 'login-unselect' : 'login-select'" @click="toggleLogin(0)">{{ $t('login.email') }}</div>
    </div>
    <!-- elementUI Form表单 -->
    <!-- ref: 认证; model: 表单数据对象; -->
    <el-form ref="ruleForm">

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginInput',
  data () {
    return {
      loginWithchannel: 1, // 登录渠道：0：通过邮箱，1：通过手机号码
      ruleForm: {
        email: '',
        password: '',
        compCompany: '', // 企业信息
        type: false
      }
    }
  },
  methods: {
    toggleLogin (code) {
      this.loginWithchannel = code // 设置登录方式
    }
  }
}
</script>

<style lang="scss" scoped>
.login_from {
  padding-top: 70px;
  position: relative;

  .select_login_try {
    width: 182px;
    height: 32px;
    background-color:#A2AFE8;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2px;

    .login-select {
      width: 90px;
      height: 28px;
      background-color: #FFFFFF;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      color: #465FD2;
      font-weight: 700;
      transition: .2s;
    }
    .login-unselect {
      width: 90px;
      height: 28px;
      background-color: #A2AFE8;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      color: #ECEFFF;
      font-weight: 700;
      transition: .2s;
    }
  }
}
</style>
