<template>
  <div id="loginContainer" class="ui container fluid " style="height: 800px">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h1 class="ui image header" :class="[loginMainColor]">
          <div class="content">
            <!--<img src="Login.vue"/>-->
            欢迎注册青橙学院账号
          </div>
        </h1>
        <form class="ui large form" style="margin-top: 0px;">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon" :class="[loginMainColor]"></i>
                <input v-model="nikeName" type="text" name="nikeName" placeholder="请输入昵称，例如：水木清华">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="mail icon" :class="[loginMainColor]"></i>
                <input v-model="email" type="text" name="email" placeholder="请输入邮箱，例如：888666@qq.com">
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon" :class="[loginMainColor]"></i>
                <input v-model="password" type="password" name="password" placeholder="请输入密码">
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon" :class="[loginMainColor]"></i>
                <input v-model="passwordConfirm" type="passwordConfirm" name="password" placeholder="请确认密码">
              </div>
            </div>

            <div class="ui fluid buttons">
              <div @click="doLogin()" class="ui  large button ">已经有账号去登陆</div>
              <div class="or" data-text="或"></div>
              <div @click="doRgeist()" class="ui  large button " :class="[loginMainColor]">注册</div>
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
  import {
    REST_URL_CATEGORY_ALL_LIST_REST_URL,
    REST_URL_APP_LOGIN,
    REST_URL_APP_REGIST
  } from "../../../common/AppRestUrlConstants";
  import routerUrl from "../../../common/FrontRouterConstants";
  import {APP_TOKEN_LOCALSTORAGE_NAME} from "../../../common/AppSysConstants";
  import {App_Random_Color} from "../../../common/AppColorConstants";
  export default {
    data () {
      return {
        nikeName: '',
        passwordConfirm: '',
        email: "",
        password: "",
        showLoginMsg: false,
        loginMsg: "",
        loginMainColor: App_Random_Color(),

      }
    },
    methods: {
      doLogin(){
        this.$router.push({path: routerUrl.path.login});
      },
      doRgeist(){
        //check
        if (this.nikeName == "") {
          this.loginMsg = "昵称不能为空";
          this.showLoginMsg = true;
        } else if (this.email == "") {
          this.loginMsg = "邮箱不能为空";
          this.showLoginMsg = true;
          return;
        } else if (this.password == "") {
          this.loginMsg = "密码不能为空";
          this.showLoginMsg = true;
          return;
        } else if (this.passwordConfirm == "") {
          this.loginMsg = "确认密码不能为空";
          this.showLoginMsg = true;
        }

        if (this.passwordConfirm != this.password) {
          this.loginMsg = "确认密码和密码不一致";
          this.showLoginMsg = true;
        }


        let url = REST_URL_APP_REGIST;
        let params = {
          id: "",
          email: this.email,
          password: this.password,
          name: this.nikeName,
        };
        App_Ajax_Post(this, url, params).then(function (res) {
          if (res.status == 200) {
            alert("注册成功")
          } else {
            if (res.status == 500) {
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
