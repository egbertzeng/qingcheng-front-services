/**
 * Created by liguohua on 2017/5/24.
 */
import {js_setUserFavoriteStyle} from "../../components/common/common/SetFavoriteUserButtonStyle";
import {App_Ajax_Post, App_Ajax_Get} from "../AppVueResourceApi";
import {
  REST_URL_QINGCHENG_SQL_GET_USER_FOLLOWER_ORDER_LIST,
  REST_URL_QINGCHENG_SQL_ADMIN_UPDATE_USER, REST_URL_QINGCHENG_SQL_ADMIN_GET_ALL_USER,
  REST_URL_QINGCHENG_SQL_GET_USER_BY_EMAIL, REST_URL_QINGCHENG_FIND_ACCOUNT_BY_EMAIL
} from "../AppRestUrlConstants";
import {js_toFindeTeacher} from "../../components/common/basicTemplate/modals/CourseTeacher/CourseTeacherCaller";
import {js_StudentDetail_Modal_Show} from "../../components/common/basicTemplate/modals/StudentDetail/StudentDetailCaller";
import {
  APP_TARGET_USER_ROLE_TEACHER,
  APP_TARGET_USER_ROLE_STUDENT,
  APP_CURRENT_SESSION_EMAIL, APP_CURRENT_LOGIN_USER
} from "../AppSysConstants";

/**
 * 获取用户粉丝量的通用方法
 * @param context
 * @param params
 */
export function js_service_getUserByFollowerNumber(context, params) {
  return App_Ajax_Post(context, REST_URL_QINGCHENG_SQL_GET_USER_FOLLOWER_ORDER_LIST, params).then(function (res) {
    if (res.status == 200) {
      let data = res.body.data;
      js_setUserFavoriteStyle(data);
      return data;
    }
  });
}
/**
 * 更新用户信息
 * @param context
 * @param user
 * @returns {*}
 */
export function js_service_updateUser(context, user) {
  return App_Ajax_Post(context, REST_URL_QINGCHENG_SQL_ADMIN_UPDATE_USER, user).then(function (res) {
    if (res.status == 200) {
      let data = res.body.data;
      return data;
    }
  });
}

/**
 * 根据某个角色的所有用户
 * @param context 上下文
 * @param role 角色
 * @returns {*} 此中角色下的所有用户
 */
export function js_service_getAllUser(context, role) {
  return App_Ajax_Get(context, REST_URL_QINGCHENG_SQL_ADMIN_GET_ALL_USER, {role: role});
}

/**
 * 根据email，获取用户的详细信息
 * @param context  上下文
 * @param email email
 * @returns {*} 用户的详细信息
 */
export function js_service_getUserInfoByEmail(context, email) {
  return App_Ajax_Get(context, REST_URL_QINGCHENG_SQL_GET_USER_BY_EMAIL, {email: email});
}


/**
 * 打开用的详细信息摸态框
 * @param context 上下文
 * @param user user
 * @private
 */
export function js_service_openUserDetailModal(context, user) {
  if (user.role == APP_TARGET_USER_ROLE_TEACHER) {
    //老师详细信息
    js_toFindeTeacher(context, user);

  } else if (user.role == APP_TARGET_USER_ROLE_STUDENT) {
    //学生详细信息
    js_StudentDetail_Modal_Show(context, user)
  } else {
    console.log("系统错误！请联系管理员")
  }
}

/**
 * 获取当前登录的用户
 */
export function js_service_getCurrentLoginUser(context) {
  let email = window.sessionStorage.getItem(APP_CURRENT_SESSION_EMAIL);
  if (email != null) {
    const url = REST_URL_QINGCHENG_FIND_ACCOUNT_BY_EMAIL;
    const params = {
      email: email,
    };
    return App_Ajax_Post(context, url, params).then(function (res) {
      //当前登录的用户
      window.sessionStorage.setItem(APP_CURRENT_LOGIN_USER, res.data);
      return res.data;
    });
  }
}

