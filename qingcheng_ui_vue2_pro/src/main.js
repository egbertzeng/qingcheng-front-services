// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import VueResource from 'vue-resource';
import Vuex from 'vuex'
import store from './store/store'
import './libs/libs.js'
import routerUrl from "./common/FrontRouterConstants";
import {APP_TOKEN_LOCALSTORAGE_NAME} from "./common/AppSysConstants";
Vue.use(VueResource);
Vue.use(Vuex);
/************************************************************************
 全局设置
 ************************************************************************/
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = true;
/************************************************************************
 全局导航钩子设置,避免没有登录就可以访问业务
 ************************************************************************/
// 全局导航钩子
router.beforeEach((to, from, next) => {
// console.log(to)
  if (to.meta.requireAuth) {
    //需要授权
    let TOKEN = sessionStorage.getItem(APP_TOKEN_LOCALSTORAGE_NAME);
    if (!TOKEN || TOKEN === "") {
      //无token
      next({
        path: routerUrl.path.login,
        query: {redirect: to.fullPath}
      })
    }
    else {
      //有token，可以进入路由组件
      next();
    }
  }
  else {
    //无需授权
    next();
  }
});
/************************************************************************
 HTTP拦截器设置，每次http请求添加token供服务器验证
 ************************************************************************/
Vue.http.interceptors.push((request, next) => {
  // 登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  let TOKEN = sessionStorage.getItem(APP_TOKEN_LOCALSTORAGE_NAME);
  if (TOKEN) {
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行
    request.headers.set('Authorization', TOKEN);

  }
  next((response) => {
    return response;
  });
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  destoryed(){
    sessionStorage.removeItem(APP_TOKEN_LOCALSTORAGE_NAME);
    sessionStorage.clear();
  }
});


