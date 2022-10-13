<template>
  <div class="fxq-login login-from">
    <div class="select-login-try">
      <div :class="loginChannel === 1 ? 'login-select' : 'login-unselect'" @click="toggleLogin(1)">{{ $t('login.phone') }}</div>
      <div :class="loginChannel === 1 ? 'login-unselect' : 'login-select'" @click="toggleLogin(0)">{{ $t('login.email') }}</div>
    </div>
    <!-- elementUI Form表单 -->
    <!-- ref:获取该表单的form组件;  model:表单数据对象;  validate-on-rule-change:是否在rules属性改变后立即触发一次验证;  rules:表单验证规则; -->
    <el-form ref="ruleForm" :model="ruleForm" :validate-on-rule-change="false" :rules="rules">
      <!-- elementUI Form表单的子元素 -->
      <!-- prop:表单域model字段; 在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
      <el-form-item v-if="loginChannel === 0" prop="email">
        <!-- elementUI Input输入框 -->
        <!-- v-model:绑定值; -->
        <!-- .native就是把组件标签变回原生DOM的一种方式，相当于给组件绑定原生事件。给普通的HTML标签监听一个事件，之后添加 .native 修饰符是不会起作用的。 -->
        <el-input v-model.trim="ruleForm.email" :placeholder="$t('login.email')" maxlength="50" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')"/>
      </el-form-item>
      <el-form-item v-else prop="phone" class="phone">
        <el-input v-model.trim="ruleForm.phone" :placeholder="$t('login.phone')" maxlength="13" @input="formatPhone" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')">
          <!-- prepend:代表放在紧贴在依赖组件的前面 -->
          <el-select slot="prepend" v-model="language" popper-class="language" @focus="initFromRules">
            <template #prefix>
              <img :src="findLanguageImg()" alt="">
            </template>
            <el-option v-for="(itm,idx) in languages" :key="idx" :label="itm.label" :value="itm.value">
              <img :src="itm.img" alt="">
              <span>{{ itm.label }}</span>
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" :type="passwd" class="password" :placeholder="$t('login.password')" maxlength="30" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')">
          <!-- suffix:代表放在紧贴在依赖组件的后面 -->
          <img v-if="ruleForm.password != '' && passwd === 'text'" slot="suffix" src="../../assets/icon/eye.svg" alt="" @click="showPassword" class="eye-img">
          <img v-if="ruleForm.password != '' && passwd === 'password'" slot="suffix" src="../../assets/icon/closeEye.svg" alt="" @click="showPassword" class="eye-img">
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="forget-password" @click="goForget">{{ $t('login.forgetPassword') }}</div>
      </el-form-item>
      <el-form-item>
        <!-- elementUI Button按钮 -->
        <!-- type:类型; -->
        <el-button v-ga="{ eventCategory: '登录', eventLabel: '登录点击',eventAction: 'click', value: Date.now() }" type="primary" @click="submitForm('ruleForm')">{{ $t('login.login') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { PHONE_AREA_CODE_DEFAULT } from '@/utils/constant'
import iconEnglish from '@/assets/icon/pic_english.png' // 英文icon -> 切换语言
import iconChinese from '@/assets/icon/pic_chinese.png' // 中文icon -> 切换语言
import Bus from '@/utils/bus'
import { getInfo } from '@/api/login'
import { getNewPaidOrderAfterLogin } from '@/api/order'
import { getCompany } from '@/api/company'

export default {
  name: 'LoginInput',
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
    return {
      loginChannel: 1, // 登录渠道：0：通过邮箱，1：通过手机号码
      // 表单认证信息
      ruleForm: {
        email: '',
        password: '',
        phone: ''
      },
      // 表单认证规则
      rules: {
        email: [{
          required: true, // 是否必选
          message: this.$i18n.t('login.isEmpty'), // 校验文案
          trigger: ['blur', 'change'] // 触发方式(失去焦点, 改值)
        }, {
          type: 'email', // 内建校验类型
          message: this.$i18n.t('login.emailError'),
          trigger: ['blur', 'change']
        }],
        phone: [{
          validator: validatePhone, // 自定义校验（注意，callback 必须被调用）
          trigger: ['blur', 'change']
        }],
        password: [{
          validator: validatePassword,
          trigger: ['blur', 'change']
        }]
      },
      language: PHONE_AREA_CODE_DEFAULT, // 默认手机号
      languages: [ // 手机号option列表
        { label: '+62', img: iconEnglish, value: '62' },
        { label: '+86', img: iconChinese, value: '86' }
      ],
      passwd: 'password', // 显示密码
      homePermission: false // 是否拥有首页权限
    }
  },
  mounted () {
    // 根据传入的登录方式来变换tab
    const { byChannel } = this.$route.query
    if (byChannel === 'phone') {
      this.loginChannel = 1
    } else if (byChannel === 'email') {
      this.loginChannel = 0
    }
    // 取消表单校验
    this.initFromRules()

    console.log('Bus', Bus)
  },
  methods: {
    // 设置登录方式
    toggleLogin (code) {
      this.loginChannel = code
      this.$set(this.ruleForm, 'email', '')
      this.$set(this.ruleForm, 'phone', '')
      this.$set(this.ruleForm, 'password', '')
      this.initFromRules()
    },
    // 手机号只提取数字
    formatPhone () {
      // $set 向响应式对象中添加一个属性,并确保这个新属性同样是响应式的,且触发视图更新。 第一个参数: 表示数据源，即是你要操作的数组或者对象。第二个参数: 要操作的的字段。第三个参数: 更改的数据。
      const phone = this.ruleForm.phone
      this.$set(this.ruleForm, 'phone', phone.replace(/[^0-9]/ig, ''))
    },
    // 设置语言的icon
    findLanguageImg () {
      const val = this.languages.find(v => v.value === this.language)
      return val ? val.img : iconEnglish
    },
    // 显示密码
    showPassword () {
      this.passwd = this.passwd === 'password' ? 'text' : 'password'
    },
    // 忘记密码
    goForget () {
      this.$router.push({ // 跳转页面
        name: 'forgetPassword',
        query: {
          byChannel: this.loginChannel === 1 ? 'phone' : 'email' // 传入登录方式
        }
      })
    },
    // 移除表单验证(结果)
    initFromRules () {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 点击登录首先验证表单
    submitForm (formName) {
      // elementUI自带的校验表单的方法; 参数为一个回调函数, 在校验结束后触发
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.LoginGo()
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    // 登录接口
    async LoginGo () {
      const params = {
        password: this.ruleForm.password,
        loginChannel: this.loginChannel
      }
      if (this.loginChannel === 0) {
        this.$store.dispatch('Login', { ...params, email: this.ruleForm.email }).then(res => {
          const { code, data } = res
          if (code === 0) {
            console.log('邮箱登录成功>>', data)
            // 获取用户信息
            this.getUserInfo(data.userId)
          }
        }).catch(err => {
          console.error('邮箱登录失败>>', err)
        })
      } else {
        const phone = '+' + this.language + this.ruleForm.phone
        this.$store.dispatch('Login', { ...params, phone: phone }).then(res => {
          const { code, data } = res
          if (code === 0) {
            console.log('手机登录成功>>', data)
            // 获取用户信息
            this.getUserInfo(data.userId)
          }
        }).catch(err => {
          console.error('手机登录失败>>', err)
        })
      }
    },
    // 获取用户信息
    async getUserInfo (id) {
      try {
        const { code, data } = await getInfo({ userId: id })
        if (code === 0) {
          // 存储用户信息
          this.$store.commit('SET_USERINFO', data)
          console.log('用户信息', data)
          // localStorage.username = data.username
          // localStorage.userId = data.userId
          // localStorage.companyId = data.companyId
          // localStorage.guidanceFlag = data.guidanceFlag
          // localStorage.orderPageFlag = data.orderPageFlag
          // localStorage.returnPageFlag = data.returnPageFlag
          // localStorage.noticeId = data.noticeId
          // localStorage.promotionGuide = data.promotionGuide
          // localStorage.email = data.email

          // 配置权限
          // localStorage.configure = JSON.stringify(data.sysResources)
          const sysResources = data.sysResources
          // Bus.$emit('powerChange')
          // Bus.$emit('changeLefterNum')

          // 判断是否有首页权限, 没有的话去欢迎页
          const dashboardSwitch = sysResources.find(v => v.componentName === 'dashboard')
          if (dashboardSwitch) {
            this.homePermission = true
          }
          // 进入系统
          this.enterSystem()
        }
      } catch (err) {
        console.error(err)
      }
    },
    // 进入系统
    async enterSystem () {
      try {
        const { code, data } = await getCompany({ id: this.$store.state.user.userInfo.companyId })
        if (code === 0) {
          // 存储公司信息
          this.$store.commit('SET_COMPANY', data)
          console.log('公司信息', data)
          if (this.homePermission) {
            // 查询是否有新的支付订单
            this.checkNewOrder()
            this.$router.push({ path: '/home' })
          } else {
            this.$router.push({ path: '/welcome' })
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
    // 查询是否有新的支付订单
    async checkNewOrder () {
      try {
        const { code, data } = await getNewPaidOrderAfterLogin()
        if (code === 0) {
          if (data.paidNum > 0) {
            // setTimeout(() => {
            //   Bus.$emit('showNewOrder')
            // }, 1000)
          }
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
  padding-top: 70px;
  position: relative;

  .el-form-item {
    margin-bottom: 14px;
  }

  .select-login-try {
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

  ::v-deep .el-input__inner, .el-input__inner {
    box-shadow: 0 0 0px 1000px #f9f6f4 inset;
    transition: .3s;
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

.forget-password {
  float: right;
  color:#FA8E03;
  cursor: pointer;
  font-size:16px;
  line-height: 15px;
}

</style>
