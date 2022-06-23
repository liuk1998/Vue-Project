<template>
  <div class="fxq_login login_from">
    <div class="select_login_try">
      <div :class="loginChannel === 1 ? 'login-select' : 'login-unselect'" @click="toggleLogin(1)">{{ $t('login.phone') }}</div>
      <div :class="loginChannel === 1 ? 'login-unselect' : 'login-select'" @click="toggleLogin(0)">{{ $t('login.email') }}</div>
    </div>
    <!-- elementUI Form表单 -->
    <!-- ref:获取该表单的form组件;  model:表单数据对象;  validate-on-rule-change:是否在rules属性改变后立即触发一次验证;  rules:表单验证规则; -->
    <el-form ref="ruleForm" :model="ruleForm" :validate-on-rule-change="false" :rules="rules">
      <!-- elementUI Form表单的子元素 -->
      <!-- prop:表单域model字段;  -->
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
          <i v-if="ruleForm.password != ''" slot="suffix" class="el-icon-view" @click="showPassword"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="type">
        <div class="forget_password" @click="goForget">{{ $t('login.forgetPassword') }}</div>
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
      } else if (this.language === '86') {
        if (value.length !== 11) {
          callback(new Error(this.$i18n.t('login.phoneCnError')))
        }
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
        phone: '',
        type: false
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
      passwd: 'password' // 显示密码
    }
  },
  methods: {
    // 设置登录方式
    toggleLogin (code) {
      this.loginChannel = code
    },
    initFromRules () {
      // this.$nextTick(() => {
      //   this.$refs.ruleForm.clearValidate()
      // })
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
      this.passwd === 'password' ? this.passwd = 'text' : this.passwd = 'password'
    },
    // 忘记密码
    goForget () {
      this.$router.push({ // 跳转页面
        name: 'forgetPassword'
      })
    },
    // 点击登录首先验证表单
    submitForm (formName) {
      // elementUI自带的校验表单的方法; 参数为一个回调函数, 在校验结束后触发
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('成功通过表单验证')
          this.$router.go(0) // 刷新当前页面
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_from {
  padding-top: 70px;
  position: relative;

  .el-form-item {
    margin-bottom: 14px;
  }

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

  ::v-deep .el-input__inner, .el-input__inner {
    box-shadow: 0 0 0px 1000px #f9f6f4 inset;
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
}

.forget_password {
  float: right;
  color:#FA8E03;
  cursor: pointer;
  font-size:16px;
  line-height: 15px;
}

</style>
