<template>
  <div class="box">
    <!-- 国际化 -->
    <div class="login_language">
      <!-- elementUI Select选择器(下拉列表) -->
      <!-- v-model:绑定值;  popper-class:Select下拉框的类名;  change:选中值发生变化时触发;  prefix:插槽,Select组件头部内容  -->
      <el-select v-model="language" popper-class="language" @change="changeLanguage">
        <template #prefix>
          <img :src="findLanguageImg()" alt="">
        </template>
        <!-- label:显示的标签,若不设置则默认与value相同;  value:选项的值;  -->
        <el-option v-for="(itm, idx) in languages" :key="idx" :label="itm.label" :value="itm.value">
          <img :src="itm.img" alt="">
          <span>{{ itm.label }}</span>
        </el-option>
      </el-select>
    </div>
    <!-- 登录 -->
    <div class="login_box">
      <div class="login_logo">
        <span class="login_tips">{{ $t('login.welcome') }}</span>
        <img src="@/assets/icon/发布会.svg" class="login_bg" alt="">
      </div>
      <div class="login_info login_info_from">
        <div class="login_tab">
          <!-- transform:变换;  translateX:X轴平移;  -->
          <div :style="{transform:`translateX(${isLogin ? 0 : 100}%)`}" class="choose_tab_active_bar"></div>
          <div :class="['choose_tab', {'is_active': isLogin}]" @click="isLogin=true">{{ $t('login.login') }}</div>
          <div :class="['choose_tab', {'is_active': !isLogin}]" @click="isLogin=false">{{ $t('login.signUp') }}</div>
        </div>
        <!-- 登录input组件 -->
        <login-input v-if="isLogin"></login-input>
        <!-- 注册input组件 -->
        <register-input v-else></register-input>
      </div>
    </div>
  </div>
</template>

<script>
import { DEFAULT_LANGUAGE } from '@/utils/constant' // 默认语言
import iconEnglish from '@/assets/icon/pic_english.png' // 英文icon -> 切换语言
import iconChinese from '@/assets/icon/pic_chinese.png' // 中文icon -> 切换语言
import LoginInput from './loginInput.vue' // 引入登录input组件
import RegisterInput from './registerInput' // 引入注册input组件
import { emailList, phoneList } from '@/mock/constant' // 引入 mock 静态资源

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  // 组件
  components: {
    LoginInput,
    RegisterInput
  },
  data () {
    return {
      language: sessionStorage.lang || DEFAULT_LANGUAGE, // 语言
      languages: [ // 语言option列表
        { label: 'EN', img: iconEnglish, value: 'en' },
        { label: 'ZH', img: iconChinese, value: 'zh' }
      ],
      isLogin: true // 判断是否为登录
    }
  },
  mounted () {
    // 存储到 localStorage
    if (!localStorage.emailList && !localStorage.phoneList) {
      localStorage.emailList = JSON.stringify(emailList)
      localStorage.phoneList = JSON.stringify(phoneList)
    }

    this.setLanguage()
  },
  methods: {
    // 设置初始化语言
    setLanguage () {
      sessionStorage.lang = this.language
      this.$i18n.locale = this.language // 国际化语言切换
    },
    // 选择语言
    changeLanguage () {
      this.setLanguage()
    },
    // 设置语言的icon
    findLanguageImg () {
      const val = this.languages.find(v => v.value === this.language)
      return val ? val.img : iconEnglish
    }
  }
}
</script>

// rel 属性规定当前文档与被链接文档之间的关系
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 1050px;
  min-height: 700px;

  // 国际化
  .login_language {
    position: absolute;
    top: 32px;
    right: 32px;

    .el-select {
      width: 100px;
      height: 36px;

      // element-ui中修改标签样式: 在对应类前面加上::v-deep，才可以找到对应的类名
      ::v-deep .el-input__inner {
        padding-left: 32px;
        font-weight: 500;
      }

      ::v-deep .el-input__prefix {
        padding: 10px 4px !important;
      }

      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        transition: 0.2s;
      }
    }
  }

  // 登录
  .login_box {
    display: flex;
    min-height: 550px;
    margin-top: 10%;

    .login_logo {
      width: 495px;
      position: relative;

      .login_tips {
        font-size: 26px;
        font-weight: 500;
        color: #262326;
        position: absolute;
        left: 71px;
        top: 32px;
      }

      .login_bg{
        margin-top: 30px;
      }
    }

    .login_info {
      width: 460px;

      .login_tab {
        display: flex;
        position: relative;
        cursor: pointer;
        padding-bottom: 16px;

        // 伪类 CSS3写法 &代表它的上一级的 class 名字 ---> 这里指的是 login_tab
        &::after { // 在类名为login_tab的元素的内容之后插入新内容
          content: ""; // 用于在元素的 ::before 和 ::after 伪元素中插入内容。使用 content 属性插入的内容都是匿名的可替换元素。
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 4px;
          background-color: #e6eaff;
          z-index: 1;
          border-radius: 25px;
        }

        .choose_tab_active_bar {
          width: 50%;
          height: 4px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #465fd2;
          z-index: 2;
          // 过渡: 属性 时间 运行曲线
          transition: transform .3s cubic-bezier(.645, .045, .355, 1);
        }

        .choose_tab {
          width: 50%;
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          color: #adb9f0;
          transition: .3s;
        }

        .is_active {
          color: #465fd2;
          transition: .3s;
        }
      }
    }

    .login_info_from {
      padding-right: 50px;
      padding-left: 50px;
      // padding-top: 30px;

      ::v-deep .el-input__inner {
        height: 46px;
        font-size: 16px;
      }

      ::v-deep .el-button {
        font-size: 18px;
        font-weight: bold;
        height: 46px;
        width: 100%;
        color: #fff;
        background-color: #465FD2;
        border-color: #465FD2;

        &:hover {
          background-color: #A2AFE8;
          border-color: #A2AFE8;
        }
      }
    }
  }
}

</style>
