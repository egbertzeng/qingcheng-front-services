/**
 * Created by liguohua on 2017/5/22.
 */
import {
  APP_CURRENT_SESSION_EMAIL,
  APP_CURRENT_USER_FAVORITE_TEACHER,
  APP_USER_RELATION_STUDENT_TEACHER, APP_USER_RELATION_STUDENT_STUDENT,
  APP_CURRENT_USER_FAVORITE_STUDENT, APP_TARGET_USER_ROLE_STUDENT, APP_TARGET_USER_ROLE_TEACHER
} from "./AppSysConstants";
import {
  REST_URL_QINGCHENG_SQL_COURSE_GET_USER_BY_FROMEMAIL,
  REST_URL_QINGCHENG_UPDATE_USER_RELATION
} from "./AppRestUrlConstants";
import {App_Ajax_Get, App_Ajax_Post} from "./AppVueResourceApi";
/**
 * 根据当前用户的ID,获取当前用户所关注的用户
 * @param context
 * @param role
 * @param relationType
 * @returns {*}
 * @private
 */
export function _api_getFavoriteUser(context, role, relationType) {
  const fromEmail = window.sessionStorage.getItem(APP_CURRENT_SESSION_EMAIL);
  return _api_getFavoriteUserByFromEmail(context, fromEmail, role, relationType);
}
export function _api_getFavoriteUserByFromEmail(context, fromEmail, role, relationType) {
  const url = REST_URL_QINGCHENG_SQL_COURSE_GET_USER_BY_FROMEMAIL;
  const params = {formEmail: fromEmail, role: role, relationType: relationType};
  return App_Ajax_Get(context, url, params);
}
/**
 * 用于提供更新关注的用户的状态
 * @param context
 * @param params
 * @returns {*}
 * @private
 */
export function _api_updateFavoriteUser(context, params) {
  //input check
  if (params.fromEmail == undefined || params.toEmail == undefined) {
    return;
  }
  const url = REST_URL_QINGCHENG_UPDATE_USER_RELATION;
  return App_Ajax_Post(context, url, params);
}
/**
 * 根据关系类型获取前端存储需要的key
 * @param rt
 * @private
 */
export function _api_getKeyByRelationType(rt) {
  let k = APP_CURRENT_USER_FAVORITE_STUDENT;
  if (rt == APP_USER_RELATION_STUDENT_TEACHER) {
    k = APP_CURRENT_USER_FAVORITE_TEACHER;
  } else if (rt == APP_USER_RELATION_STUDENT_STUDENT) {
    k = APP_CURRENT_USER_FAVORITE_STUDENT;
  }
  return k;
}
/**
 * 根据关系类型，获取用户的角色
 * @param rt
 * @private
 */
export function _api_getRoleByRelationType(rt) {
  let r = APP_TARGET_USER_ROLE_STUDENT;
  if (rt == APP_USER_RELATION_STUDENT_TEACHER) {
    r = APP_TARGET_USER_ROLE_TEACHER;
  } else if (rt == APP_USER_RELATION_STUDENT_STUDENT) {
    r = APP_TARGET_USER_ROLE_STUDENT;
  }
  return r;
}


