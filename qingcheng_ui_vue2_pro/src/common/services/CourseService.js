/**
 * Created by liguohua on 2017/5/24.
 */
import {
  REST_URL_QINGCHENG_SQL_COURSE_GET_BY_TEACHER_EMAIL,
  REST_URL_QINGCHENG_SQL_COURSE_GET_BY_EMAIL, REST_URL_QINGCHENG_SQL_USER_UPDATE_FAVORITE_COURSE,
  REST_URL_QINGCHENG_SQL_COURSE_GET_FOLLOWER_ORDER_LIST, REST_URL_QINGCHENG_SQL_USER_GET_BY_COURSEID
} from "../AppRestUrlConstants";
import {App_Ajax_Get, App_Ajax_Post} from "../AppVueResourceApi";
import {APP_CURRENT_USER_FAVORITE_COURSE, APP_CURRENT_SESSION_EMAIL} from "../AppSysConstants";
/************************************************************************
 获取老师所发布的课程
 ************************************************************************/
export function js_service_getCourseByTeacher(context, teacher) {
  return js_service_getCourseByTeacherEmail(context, teacher.email).then(function (data) {
    teacher.publishCourse = data;
    return data;
  });
}
export function js_service_getCourseByTeacherEmail(context, email) {
  const params = {teacherEmail: email};
  return App_Ajax_Get(context, REST_URL_QINGCHENG_SQL_COURSE_GET_BY_TEACHER_EMAIL, params);
}

/************************************************************************
 获取用户关注的课程
 ************************************************************************/
/**
 * 获取任意用户所关注的课程
 * @param context
 * @param user
 */
export function js_service_getPublishCourseByUser(context, user) {
  //param check
  if (user == null || user == undefined || user == "") {
    return;
  }
  //do action
  return js_service_getPublishCourseByUserEmail(context, user.email).then(function (data) {
    user.favoriteCourse = data;
    return data;
  });
}
export function js_service_getPublishCourseByUserEmail(context, email) {
  //param check
  if (email == null || email == undefined || email == "") {
    return;
  }
  //do action
  const params = {email: email, favorite: true};
  return App_Ajax_Get(context, REST_URL_QINGCHENG_SQL_COURSE_GET_BY_EMAIL, params);
}
/************************************************************************
 课程的粉丝数量排行榜
 ************************************************************************/
export function js_service_getCourseFollowerOrder(context) {
  return App_Ajax_Get(context, REST_URL_QINGCHENG_SQL_COURSE_GET_FOLLOWER_ORDER_LIST, {});
}


/************************************************************************
 获取课程的粉丝
 ************************************************************************/
export function js_service_getCourseMateByCourse(context, currtentFocusCourse) {

  if (currtentFocusCourse == undefined || currtentFocusCourse == null || currtentFocusCourse == "") {
    return;
  }
  const url = REST_URL_QINGCHENG_SQL_USER_GET_BY_COURSEID;
  const params = {courseID: currtentFocusCourse.courseID};
  return App_Ajax_Get(context, url, params);
}



