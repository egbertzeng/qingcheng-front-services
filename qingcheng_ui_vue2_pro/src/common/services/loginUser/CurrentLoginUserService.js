/**
 * Created by liguohua on 2017/5/24.
 */
import {js_service_getPublishCourseByUserEmail} from "../CourseService";
import {APP_CURRENT_USER_FAVORITE_COURSE, APP_CURRENT_SESSION_EMAIL} from "../../AppSysConstants";
import {REST_URL_QINGCHENG_SQL_USER_UPDATE_FAVORITE_COURSE} from "../../AppRestUrlConstants";
import {App_Ajax_Post} from "../../AppVueResourceApi";
/************************************************************************
 获取login用户关注的课程
 ************************************************************************/
/**
 *
 * @param context  context
 */

export function js_common_service_updateCurrentLoginUserFavoriteCourse(context) {
  return js_service_getPublishCourseByUserEmail(context, window.sessionStorage.getItem(APP_CURRENT_SESSION_EMAIL)).then(function (data) {
    window.sessionStorage.setItem(APP_CURRENT_USER_FAVORITE_COURSE, JSON.stringify(data));
    return data;
  });
}

/************************************************************************
 更改login用户关注的课程
 ************************************************************************/
/**
 *
 * @param context context
 * @param course 要操作的课程
 * @param favorite 是否还关注
 * @returns {*}
 */
export function js_service_updateCurrentLoginUserFavoriteCourseToDB(context, course, favorite) {
  const params = {
    email: window.sessionStorage.getItem(APP_CURRENT_SESSION_EMAIL),
    courseID: course.courseID,
    favorite: favorite,
  };
  return App_Ajax_Post(context, REST_URL_QINGCHENG_SQL_USER_UPDATE_FAVORITE_COURSE, params);
}
