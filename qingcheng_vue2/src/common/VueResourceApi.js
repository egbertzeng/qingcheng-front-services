/**
 * Created by liguohua on 2017/5/1.
 */
//通用的get请求方法
export function App_Ajax_Get(context, url, params) {
  return context.$http({
    method: 'GET',
    url: url,
    params: params,
    headers: {"X-Requested-With": "XMLHttpRequest"},
    emulateJSON: true
  }).then(res => {//es5写法

    return res.body.data;
  }, (error) => {
    console.log(error);
  });
};
//通用的post请求方法
export  function App_Ajax_Post(context, url, params) {
  return context.$http.post(url, params, {emulateJSON: true}).then((res) => {
    console.log(res);
    return res;
  }, (res) => {
    console.log(res.status);
  });
}
