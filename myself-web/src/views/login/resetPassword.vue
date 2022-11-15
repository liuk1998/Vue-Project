<template>
  <div class="page">
    <div class="area fxq-login">
      <div class="area-img1">
        <img src="../../assets/icon/pic_pc.png" alt="">
      </div>
      <div class="area-img2">
        <img src="../../assets/icon/forget2.png" alt="">
      </div>
      <div class="form">
        <div class="title">
          <span>{{ $t('login.resetPassword') }}</span>
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <div class="form-box">
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" :type="passwd" :placeholder="$t('login.password')" maxlength="30" class="password" @focus="initFromRules">
                <img v-if="ruleForm.password != '' && passwd === 'text'" slot="suffix" src="../../assets/icon/eye.svg" alt="" @click="showPassword" class="eye-img">
                <img v-if="ruleForm.password != '' && passwd === 'password'" slot="suffix" src="../../assets/icon/closeEye.svg" alt="" @click="showPassword" class="eye-img">
              </el-input>
            </el-form-item>
            <el-form-item prop="surePassword">
              <el-input v-model="ruleForm.surePassword" :type="surePasswd" :placeholder="$t('login.confirmPassword')" maxlength="30" @focus="initFromRules" class="password">
                <img v-if="ruleForm.surePassword != '' && surePasswd === 'text'" slot="suffix" src="../../assets/icon/eye.svg" alt="" @click="showSurePassword" class="eye-img">
                <img v-if="ruleForm.surePassword != '' && surePasswd === 'password'" slot="suffix" src="../../assets/icon/closeEye.svg" alt="" @click="showSurePassword" class="eye-img">
              </el-input>
            </el-form-item>
            <el-button type="warning" @click="submitForm('ruleForm')">{{ $t('login.send') }}</el-button>
            <div class="go-back" @click="goBack">{{ $t('login.goBack') }}</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPassword } from '@/api/login'

export default {
  name: 'ResetPassword',
  data () {
    // 自定义校验函数 -> 密码校验 (固定三个参数)
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('login.isEmpty')))
      } else if (value.length < 8 || value.length > 30) {
        callback(new Error(this.$i18n.t('login.newPwd1')))
      } else {
        callback()
      }
    }
    // 自定义校验函数 -> 确认密码校验
    const validateSurePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('login.isEmpty')))
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$i18n.t('login.passwordDiff')))
      } else {
        callback()
      }
    }
    return {
      passwd: 'password', // 显示密码
      surePasswd: 'password', // 显示确认密码
      ruleForm: { // 表单认证信息
        password: '',
        surePassword: ''
      },
      rules: { // 表单认证规则
        password: [{ validator: validatePassword, trigger: ['blur', 'change'] }],
        surePassword: [{ validator: validateSurePassword, trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    // 移除表单验证(结果)
    initFromRules () {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 显示密码
    showPassword () {
      this.initFromRules()
      this.passwd = this.passwd === 'password' ? 'text' : 'password'
    },
    // 显示确认密码
    showSurePassword () {
      this.initFromRules()
      this.surePasswd = this.surePasswd === 'password' ? 'text' : 'password'
    },
    // 返回上一层
    goBack () {
      this.$router.go(-1)
    },
    // 表单验证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changPdByOldFun()
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    // 重置密码 根据旧密码修改密码
    async changPdByOldFun () {
      try {
        const { code } = await resetPassword({ ...this.ruleForm, email: JSON.parse(sessionStorage.userInfo).email })
        if (code === 0) {
          sessionStorage.clear()
          this.$router.push({ name: 'login' })
        }
      } catch (err) {
        console.error(err)
      }
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
    height: 400px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 2px 6px 0px rgba(231, 117, 0, 0.12);

    .el-form-item {
      margin-bottom: 10px;
    }

    // 文本框组件样式
    ::v-deep .el-input__inner, .el-input__inner {
      box-shadow: 0 0 0px 1000px #f9f6f4 inset;
      transition: .3s;
    }

    .area-img1 {
      float: left;
      margin-left: -65px;
      margin-top: 130px;
    }

    .area-img2 {
      float: right;
      margin-right: -38px;
      margin-top: -186px;
    }

    .form {
      position: absolute;
      width: 450px;
      left: 125px;
      margin-top: 100px;

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

      .form-box {
        width: 288px;
        margin-left: 81px;
        margin-top: 20px;

        .password {
          ::v-deep .el-input__suffix {
            display: flex;
            align-items: center;
            margin-right: 10px;
          }

          .eye-img {
            width: 20px;
          }
        }

        .el-button--warning {
          width: 100%;
          height: 32px;
          margin-top: 8px;
          padding: 6px 20px;
        }

        .go-back {
          color: #FA8E03;
          margin: 20px 0px;
          cursor: pointer;
          transition: .3s;
          font-size: 12px;
          font-weight: 500;
          text-align: center;

          &:hover {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
