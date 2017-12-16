/**
 * Created by liguohua on 2017/5/24.
 */
import {App_Ajax_Get} from "../AppVueResourceApi";
import {
  REST_URL_QINGCHENG_SQL_TEACHER_GET_BY_COURSEID,
  REST_URL_QINGCHENG_SQL_GET_USER_FOLLOWER_ORDER_LIST, REST_URL_QINGCHENG_SQL_GET_USER_PUBLISH_COURSE_ORDER_LIST,
  REST_URL_QINGCHENG_SQL_ADMIN_GET_ALL_USER
} from "../AppRestUrlConstants";
import {js_setUserFavoriteStyle} from "../../components/common/common/SetFavoriteUserButtonStyle";
import {js_service_getUserByFollowerNumber, js_service_getAllUser} from "./UserService";
import {_api_getRoleByRelationType} from "../AppRestApi";
import {APP_USER_RELATION_STUDENT_TEACHER, APP_TARGET_USER_ROLE_TEACHER} from "../AppSysConstants";
/****************************************************************************
 一、用户部分
 ****************************************************************************/
/**
 * 点击课程，获取讲授此课程的老师
 * @param course
 * @returns {*}
 */
export function js_service_getTeacherByFocusCourse(context, course) {
  let url = REST_URL_QINGCHENG_SQL_TEACHER_GET_BY_COURSEID;
  let params = {courseID: course.courseID};
  return App_Ajax_Get(context, url, params).then(function (data) {
    //过滤老师的状态
    js_setUserFavoriteStyle(data);
    return data;
  });
}

/**
 * 老师粉丝数量排行榜
 */
export function js_service_getTeachersByFollowerNumber(context) {
  const params = {
    role: _api_getRoleByRelationType(APP_USER_RELATION_STUDENT_TEACHER),
    relationType: APP_USER_RELATION_STUDENT_TEACHER
  };
  return js_service_getUserByFollowerNumber(context, params);
}

/**
 * 老师，发布课程数量排行榜
 */
export function js_service_getTeacherBypublishCourse(context) {
  return App_Ajax_Get(context, REST_URL_QINGCHENG_SQL_GET_USER_PUBLISH_COURSE_ORDER_LIST, {});
}


/****************************************************************************
 二、管理员部分
 ****************************************************************************/
/**
 * 获取所有教师的信息
 */
export function js_service_getAllTeacher(context) {
  return js_service_getAllUser(context,APP_TARGET_USER_ROLE_TEACHER);
}
