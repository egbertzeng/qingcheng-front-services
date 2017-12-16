<template>
  <div id="loginContainer" class="ui container fluid " style="height: 800px">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h1 class="ui image header" :class="[loginMainColor]">
          <div class="content">
            欢迎登陆青橙学院
          </div>
        </h1>
        <form class="ui large form" style="margin-top: 0px;">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="mail icon" :class="[loginMainColor]"></i>
                <input v-model="email" type="text" name="email" placeholder="请输入邮箱，例如：jack@qq.com">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon" :class="[loginMainColor]"></i>
                <input v-model="password" type="password" name="password" placeholder="请输入密码">
              </div>
            </div>
            <div class="ui fluid buttons">
              <div @click="doRegister()" class="ui large button ">没有账号去注册</div>
              <div class="or" data-text="或"></div>
              <div @click="dologin()" class="ui  large button " :class="[loginMainColor]">登陆</div>
            </div>
          </div>
        </form>
        <div v-if="showLoginMsg" class="alert alert-danger">
          <strong>{{loginMsg}}</strong>
        </div>
      </div>
    </div>


  </div>
</template>

<script type="text/javascript">
  import {App_Ajax_Post} from "../../../common/AppVueResourceApi";
  import {REST_URL_CATEGORY_ALL_LIST_REST_URL, REST_URL_APP_LOGIN} from "../../../common/AppRestUrlConstants";
  import routerUrl from "../../../common/FrontRouterConstants";
  import {
    APP_TOKEN_LOCALSTORAGE_NAME,
    APP_CURRENT_SESSION_USER_NAME,
    APP_CURRENT_SESSION_EMAIL
  } from "../../../common/AppSysConstants";
  import {App_Random_Color} from "../../../common/AppColorConstants";
  export default {
    data () {
      return {
        email: "",
        emailback: "",
        password: "",
        showLoginMsg: false,
        loginMsg: "",
        loginMainColor: App_Random_Color(),

      }
    },
    methods: {
      doRegister(){
        this.$router.push({path: routerUrl.path.regist});
      },
      dologin(){
        //check
        if (this.email == "") {
          this.loginMsg = "邮箱不能为空";
          this.showLoginMsg = true;
          return;
        } else if (this.password == "") {
          this.loginMsg = "密码不能为空";
          this.showLoginMsg = true;
          return;
        }

        this.emailback = this.email;
        let url = REST_URL_APP_LOGIN;
        let params = {
          id: "",
          email: this.emailback,
          password: this.password
        };
        App_Ajax_Post(this, url, params).then(function (res) {
          if (res.status == 200) {
            //存储token
            let token = res.body.data;
            window.sessionStorage.setItem(APP_TOKEN_LOCALSTORAGE_NAME, token.trim());
            //登陆成功,跳转路由
            this.loginerror = false;
            this.email = "";
            this.password = "";
            //sessionStorage存储用户状态
            window.sessionStorage.setItem(APP_CURRENT_SESSION_EMAIL, this.emailback);
            this.$router.push({path: routerUrl.path.index});
          } else {
            if (res.status == 500) {
              //清楚所有状态
              window.sessionStorage.clear();
              this.showLoginMsg = true;
              this.loginMsg = "邮箱或密码错误";
              return;
            }
          }
        });
      },
    }
  }
</script>

<style scoped>
  #loginContainer {
    background-color: #DADADA;
  }

  #loginContainer > .grid {
    height: 100%;
  }

  .column {
    margin-top: -360px;
    max-width: 400px;
  }
</style>
