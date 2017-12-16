/**
 * Created by liguohua on 2017/5/1.
 */
import {js_AppCommonFilter4FavoriteStatus} from "./AppCommonFilter4FavoriteStatus";

//通用的get请求方法
export function App_Ajax_Get(context, url, params) {
  return context.$http({
    method: 'GET',
    url: url,
    params: params,
    headers: {"X-Requested-With": "XMLHttpRequest"},
    emulateJSON: true
  }).then(res => {//es5写法
    const data = res.body.data;
    js_AppCommonFilter4FavoriteStatus(url, params, data);
    return data;
  }, (error) => {
    console.log(error);
  });
}

//通用的post请求方法
export function App_Ajax_Post(context, url, params) {
  return context.$http.post(url, params, {
    emulateJSON: false,
    headers: {"Content-Type": "application/json;charset=UTF-8:"},
  }).then((res) => {
    return res;
  }, (res) => {
    return res;
  });
}




