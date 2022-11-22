<template>
  <div class="fxq-login login-from">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <div class="login-email">
        <el-form-item prop="phone" class="phone">
          <el-input v-model.trim="ruleForm.phone" :placeholder="$t('login.phone')" maxlength="13" @input="formatPhone" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')">
            <el-select slot="prepend" v-model="language" popper-class="language" @focus="initFromRules">
              <template #prefix>
                <img :src="findLanguageImg()" alt="">
              </template>
              <el-option v-for="(itm, idx) in languages" :key="idx" :label="itm.label" :value="itm.value">
                <img :src="itm.img" alt="">
                <span>{{ itm.label }}</span>
              </el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item prop="authCode">
          <el-input v-model="ruleForm.authCode" :placeholder="$t('login.verification')" @input="onlyNumber" @focus="initFromRules" maxlength="4" @keyup.enter.native="submitForm('ruleForm')">
            <div @click="refreshCode" slot="suffix">
              <VerifcationCode :code="code"></VerifcationCode>
            </div>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" :placeholder="$t('login.email')" @focus="initFromRules" maxlength="50" @keyup.enter.native="submitForm('ruleForm')" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" :type="passwd" :placeholder="$t('login.newPwd2')" maxlength="30" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')" class="password">
            <!-- suffix:代表放在紧贴在依赖组件的后面 -->
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
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" :placeholder="$t('login.accountName')" maxlength="30" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('login.signUp') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { PHONE_AREA_CODE_DEFAULT } from '@/utils/constant'
import iconEnglish from '@/assets/icon/pic_english.png' // 英文icon -> 切换语言
import iconChinese from '@/assets/icon/pic_chinese.png' // 中文icon -> 切换语言
import VerifcationCode from '@/components/register/verificationCode.vue'
import { randomNum } from '@/utils/index' // 公共方法
import { register, getInfo } from '@/api/login'
import Bus from '@/utils/bus'

export default {
  name: 'RegisterInput',
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
      // 表单认证信息
      ruleForm: {
        phone: '',
        authCode: '',
        email: '',
        password: '',
        surePassword: '',
        name: ''
      },
      // 表单认证规则
      rules: {
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
        name: [{ required: true, message: this.$i18n.t('login.isEmpty'), trigger: ['blur', 'change'] }],
        password: [{ validator: validatePassword, trigger: ['blur', 'change'] }],
        surePassword: [{ validator: validateSurePassword, trigger: ['blur', 'change'] }],
        authCode: [{ required: true, message: this.$i18n.t('login.isEmpty'), trigger: ['blur', 'change'] }]
      },
      language: PHONE_AREA_CODE_DEFAULT, // 默认手机号
      languages: [
        { label: '+62', img: iconEnglish, value: '62' },
        { label: '+86', img: iconChinese, value: '86' }
      ],
      passwd: 'password', // 显示密码
      surePasswd: 'password', // 显示确认密码
      code: '1314' // 图片验证码数字
    }
  },
  mounted () {
    this.refreshCode()
    this.initFromRules()
  },
  methods: {
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
    // 设置语言的icon
    findLanguageImg () {
      const val = this.languages.find(v => v.value === this.language)
      return val ? val.img : iconEnglish
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
    // 生成验证码数字
    makeCode () {
      this.code = randomNum(1000, 9999).toString()
    },
    // 刷新验证码数字
    refreshCode () {
      this.code = ''
      this.makeCode()
    },
    // 移除表单验证(结果)
    initFromRules () {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 点击注册首先验证表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signUp()
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    // 注册接口
    async signUp () {
      const phone = '+' + this.language + this.ruleForm.phone
      if (this.ruleForm.authCode !== this.code) {
        // elementUI Message消息提示
        this.$message.error(this.$i18n.t('login.codeCheck'))
        this.refreshCode()
        return
      }
      try {
        const { code, data } = await register({ ...this.ruleForm, phone })
        if (code === 0) {
          // 获取用户信息
          this.getUserInfo(data.userId)
        }
      } catch (err) {
        this.refreshCode()
        console.error(err)
      }
    },
    // 获取用户信息
    async getUserInfo (id) {
      try {
        const { code, data } = await getInfo({ userId: id })
        if (code === 0) {
          // 存储用户信息
          this.$store.commit('SET_USERINFO', data)
          sessionStorage.userInfo = JSON.stringify(data)
          console.log('用户信息', data)
          // 获取权限列表 观察者模式 (调用方法)
          Bus.$emit('powerChange', data.sysResources)

          // 进入系统
          this.$router.push({ path: '/welcome' })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-from {
  padding-top: 40px;
  position: relative;

  .login-email {
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  ::v-deep .el-input__inner, .el-input__inner {
    box-shadow: 0 0 0px 1000px #f9f6f4 inset;
    transition: .3s;
  }

  ::v-deep .el-input__suffix {
    display: flex;
    align-items: center;
  }

  .el-button {
    margin-top: 20px;
  }
}

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
</style>
