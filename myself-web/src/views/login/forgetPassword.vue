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
          <div class="forget_box">
            <el-form-item v-if="channel === 0" prop="phone" class="phone">
              <el-input v-model="ruleForm.phone" :placeholder="$t('login.phone')" maxlength="13" @input="formatPhone" @focus="initFromRules">
                <el-select slot="prepend" v-model="language" popper-class="language" @focus="initFromRules">
                  <template #prefix>
                    <img :src="findLanguageImg()" alt="">
                  </template>
                  <el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value">
                    <img :src="item.img" alt="">
                    <span>{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item v-else-if="channel === 1" prop="email">
              <el-input v-model.trim="ruleForm.email" :placeholder="$t('login.email')" maxlength="50" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')" />
            </el-form-item>
            <el-form-item prop="authCode">
              <el-input v-model="ruleForm.authCode" :placeholder="$t('login.verification')" @input="onlyNumber" @focus="initFromRules" maxlength="4" @keyup.enter.native="submitForm('ruleForm')">
                <div @click="refreshCode" slot="suffix">
                  <VerifcationCode :code="code"></VerifcationCode>
                </div>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" :type="passwd" :placeholder="$t('login.newPassword')" maxlength="30" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')" class="password">
                <img v-if="ruleForm.password != '' && passwd === 'text'" slot="suffix" src="../../assets/icon/eye.svg" alt="" @click="showPassword" class="eye-img">
                <img v-if="ruleForm.password != '' && passwd === 'password'" slot="suffix" src="../../assets/icon/closeEye.svg" alt="" @click="showPassword" class="eye-img">
              </el-input>
            </el-form-item>
            <el-form-item prop="surePassword">
              <el-input v-model="ruleForm.surePassword" :type="surePasswd" :placeholder="$t('login.confirmPassword')" maxlength="30" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')" class="password">
                <img v-if="ruleForm.surePassword != '' && surePasswd === 'text'" slot="suffix" src="../../assets/icon/eye.svg" alt="" @click="showSurePassword" class="eye-img">
                <img v-if="ruleForm.surePassword != '' && surePasswd === 'password'" slot="suffix" src="../../assets/icon/closeEye.svg" alt="" @click="showSurePassword" class="eye-img">
              </el-input>
            </el-form-item>
            <el-button type="warning" @click="submitForm('ruleForm')">{{ $t('login.confirm') }}</el-button>
            <div class="go_back" @click="toLogin">{{ $t('login.goBack') }}</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { PHONE_AREA_CODE_DEFAULT } from '@/utils/constant'
import iconEnglish from '@/assets/icon/pic_english.png' // 英文icon -> 切换语言
import iconChinese from '@/assets/icon/pic_chinese.png' // 中文icon -> 切换语言
import { randomNum } from '@/utils/index' // 公共方法
import VerifcationCode from '@/components/register/verificationCode.vue'
import { forgetPassword } from '@/api/login'

export default {
  name: 'ForgetPassword',
  components: {
    VerifcationCode
  },
  data () {
    // 自定义校验函数 -> 电话号校验 (固定三个参数)
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('login.isEmpty')))
      } else if (value.substr(0, 1) === '0') {
        callback(new Error(this.$t('login.phoneCheck')))
      } else if (this.language === '86' && value.length !== 11) {
        callback(new Error(this.$i18n.t('login.phoneCnError')))
      } else if (value.length < 8 || value.length > 13) {
        callback(new Error(this.$i18n.t('login.phoneIdError')))
      } else {
        callback()
      }
    }
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
      channel: 0, // 登录方式
      language: PHONE_AREA_CODE_DEFAULT, // 默认手机号
      languages: [ // 手机号option列表
        { label: '+62', img: iconEnglish, value: '62' },
        { label: '+86', img: iconChinese, value: '86' }
      ],
      code: '1314', // 图片验证码数字
      passwd: 'password', // 显示密码
      surePasswd: 'password', // 显示确认密码
      ruleForm: { // 表单认证信息
        phone: '',
        email: '',
        authCode: '',
        password: '',
        surePassword: ''
      },
      rules: { // 表单认证规则
        phone: [{ validator: validatePhone, trigger: ['blur', 'change'] }],
        email: [{
          required: true, // 是否必选
          message: this.$i18n.t('login.isEmpty'), // 校验文案
          trigger: ['blur', 'change'] // 触发方式(失去焦点, 改值)
        }, {
          type: 'email', // 内建校验类型
          message: this.$i18n.t('login.emailError'),
          trigger: ['blur', 'change']
        }],
        password: [{ validator: validatePassword, trigger: ['blur', 'change'] }],
        surePassword: [{ validator: validateSurePassword, trigger: ['blur', 'change'] }],
        authCode: [{ required: true, message: this.$i18n.t('login.isEmpty'), trigger: ['blur', 'change'] }]
      }
    }
  },
  mounted () {
    this.refreshCode()
    // 根据传入的登录方式来变换tab
    const { byChannel } = this.$route.query // 用于页面之间路由跳转的传参(url带参数), this.$route.params(url不带参数)
    if (byChannel === 'phone') {
      this.channel = 0
    } else if (byChannel === 'email') {
      this.channel = 1
    }
    this.initFromRules()
  },
  methods: {
    // 改变登录方式
    changeChannel (code) {
      this.channel = code
      this.initFromRules()
    },
    // 手机号只提取数字
    formatPhone () {
      const phone = this.ruleForm.phone
      this.$set(this.ruleForm, 'phone', phone.replace(/[^0-9]/ig, ''))
    },
    // 验证码只提取数字
    onlyNumber () {
      const authCode = this.ruleForm.authCode
      this.$set(this.ruleForm, 'authCode', authCode.replace(/[^\d]/g, ''))
    },
    // 移除表单验证(结果)
    initFromRules () {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 设置语言的icon
    findLanguageImg () {
      const val = this.languages.find(v => v.value === this.language)
      return val ? val.img : iconEnglish
    },
    // 生成验证码数字
    makeCode () {
      this.code = randomNum(1000, 9999).toString()
    },
    // 刷新验证码数字
    refreshCode () {
      this.code = ''
      this.makeCode()
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
    // 表单验证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeSuccess()
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    // 验证成功
    async changeSuccess () {
      if (this.ruleForm.authCode !== this.code) {
        this.$message.error(this.$i18n.t('login.codeCheck'))
        this.refreshCode()
        return
      }
      const phone = '+' + this.language + this.ruleForm.phone
      const { code } = await forgetPassword({ ...this.ruleForm, phone, channel: this.channel })
      if (code === 0) {
        this.$router.push({
          name: 'login',
          query: {
            byChannel: this.channel === 0 ? 'phone' : 'email'
          }
        })
      }
    },
    // 返回登录
    toLogin () {
      this.$router.push({ name: 'login' })
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

    // 文本框组件间距
    .el-form-item {
      margin-bottom: 10px;
    }

    // 文本框组件样式
    ::v-deep .el-input__inner, .el-input__inner {
      box-shadow: 0 0 0px 1000px #f9f6f4 inset;
      transition: .3s;
    }

    // 验证码外部组件样式
    ::v-deep .el-input__suffix {
      display: flex;
      align-items: center;
    }

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

      .forget_box {
        margin: 20px 41px 0;

        .phone {

          ::v-deep .el-input-group__prepend {
            background-color: #F9F6F4;
            border: 0;
          }

          .el-select {
            width: 100px;

            &:hover {
              color: #262326;
            }

            ::v-deep .el-input__prefix {
              display: flex;
              align-items: center;

              img {
                width: 22px;
                height: 16px;
                margin-left: 5px;
                transition: .2s;
              }
            }

            ::v-deep .el-input__suffix {
              right: 8px
            }

            ::v-deep .el-input__inner {
              margin-left: 4px;
              color: #262326;
            }
          }

          ::v-deep .el-input-group--prepend >.el-input__inner {
            padding-left: 4px;
          }
        }

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

        .go_back {
          color: #FA8E03;
          margin: 20px 0px;
          cursor: pointer;
          transition: .3s;
          line-height: 32px;
          font-size: 12px;
          font-weight: 500;

          &:hover {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
