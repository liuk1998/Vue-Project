<template>
  <div class="fxq_login login_from">
    <div class="select_login_try">
      <div :class="loginChannel === 1 ? 'login-select' : 'login-unselect'" @click="toggleLogin(1)">{{ $t('login.phone') }}</div>
      <div :class="loginChannel === 1 ? 'login-unselect' : 'login-select'" @click="toggleLogin(0)">{{ $t('login.email') }}</div>
    </div>
    <!-- elementUI Form表单 -->
    <!-- ref:认证;  model:表单数据对象;  validate-on-rule-change:是否在rules属性改变后立即触发一次验证;  rules:表单验证规则;  label-width:表单域标签的宽度(直接子元素的form-item会继承宽度)  -->
    <el-form ref="ruleForm" :model="ruleForm" :validate-on-rule-change="false" :rules="rules" label-width="100px" class="demo-ruleForm">
      <!-- elementUI Form表单的子元素 -->
      <!-- prop:表单域model字段;  -->
      <el-form-item v-if="loginChannel === 0" prop="email">
        <!-- elementUI Input输入框 -->
        <!-- v-model:绑定值; -->
        <!-- .native就是把组件标签变回原生DOM的一种方式，相当于给组件绑定原生事件。给普通的HTML标签监听一个事件，之后添加 .native 修饰符是不会起作用的。 -->
        <el-input v-model.trim="ruleForm.email" :placeholder="$t(&quot;login.email&quot;)" maxlength="50" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')"/>
      </el-form-item>
      <el-form-item v-else prop="phone" class="phone">

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginInput',
  data () {
    return {
      loginChannel: 1, // 登录渠道：0：通过邮箱，1：通过手机号码
      // 表单认证信息
      ruleForm: {
        email: '',
        password: '',
        compCompany: '', // 企业信息
        phone: '',
        type: false
      },
      // 表单认证规则
      rules: {}
    }
  },
  methods: {
    // 设置登录方式
    toggleLogin (code) {
      this.loginChannel = code
    },
    initFromRules () {

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

  ::deep .el-input__inner, .el-input__inner {
    box-shadow: 0 0 0px 1000px #f9f6f4 inset;
  }
}

</style>
