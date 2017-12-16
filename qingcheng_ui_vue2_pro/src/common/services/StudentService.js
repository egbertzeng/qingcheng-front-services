/**
 * Created by liguohua on 2017/5/25.
 */
import {_api_getRoleByRelationType} from "../AppRestApi";
import {
  APP_USER_RELATION_STUDENT_STUDENT,
  APP_TARGET_USER_ROLE_STUDENT,
  APP_TARGET_USER_ROLE_TEACHER
} from "../AppSysConstants";
import {js_service_getUserByFollowerNumber, js_service_getAllUser} from "./UserService";
import {
  REST_URL_QINGCHENG_SQL_GET_USER_FOLLOW_COURSE_ORDER_LIST,
  REST_URL_QINGCHENG_SQL_ADMIN_GET_ALL_USER
} from "../AppRestUrlConstants";
import {App_Ajax_Get} from "../AppVueResourceApi";
/****************************************************************************
 一、用户部分
 ****************************************************************************/

/**
 * 学生粉丝数量排行榜
 */
export function js_service_getStudentByFollowerNumber(context) {
  const params = {
    role: _api_getRoleByRelationType(APP_USER_RELATION_STUDENT_STUDENT),
    relationType: APP_USER_RELATION_STUDENT_STUDENT
  };
  return js_service_getUserByFollowerNumber(context, params);
}
/**
 * 学生,关注课程数量排行榜
 */
export function js_service_getStudentByFollowerCourseNumber(context) {
  return App_Ajax_Get(context, REST_URL_QINGCHENG_SQL_GET_USER_FOLLOW_COURSE_ORDER_LIST, {});
}

/****************************************************************************
 二、管理员部分
 ****************************************************************************/

/**
 * 获取所有学生的信息
 */
export function js_service_getAllStudent(context) {
  return js_service_getAllUser(context, APP_TARGET_USER_ROLE_STUDENT);
}
