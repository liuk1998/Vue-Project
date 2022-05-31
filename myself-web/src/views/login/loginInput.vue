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
        <el-input v-model.trim="ruleForm.email" :placeholder="$t('login.email')" maxlength="50" @focus="initFromRules" @keyup.enter.native="submitForm('ruleForm')"/>
      </el-form-item>
      <el-form-item v-else prop="phone" class="phone">
        <el-input v-model.trim="ruleForm.phone" :placeholder="$t('login.phone')" maxlength="12" @input="formatPhone" @focus="initFromRules" @change="getByPhoneFun" @keyup.enter.native="submitForm('ruleForm')">
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
      rules: {},
      language: PHONE_AREA_CODE_DEFAULT, // 默认手机号
      languages: [ // 手机号option列表
        { label: '+62', img: iconEnglish, value: '62' },
        { label: '+86', img: iconChinese, value: '86' }
      ]
    }
  },
  methods: {
    // 设置登录方式
    toggleLogin (code) {
      this.loginChannel = code
    },
    initFromRules () {

    },
    formatPhone () {},
    getByPhoneFun () {},
    // 设置语言的icon
    findLanguageImg () {
      const val = this.languages.find(v => v.value === this.language)
      return val ? val.img : iconEnglish
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

</style>
