/**
 * Created by liguohua on 2017/5/23.
 */
import {APP_CURRENT_USER_FAVORITE_COURSE} from "../../../common/AppSysConstants";
export function js_setManyCourseFavoriteStyle(list) {
  if (list == null || list == "") {
    return;
  }

  for (let i = 0; i < list.length; i++) {
    js_setCourseFavoriteStyle(list[i]);
  }
}
export function js_setCourseFavoriteStyle(e) {
  let userFavoriteCourse = JSON.parse(window.sessionStorage.getItem(APP_CURRENT_USER_FAVORITE_COURSE));
  if (userFavoriteCourse == undefined) {
    return;
  }
  e.courseIsInFavorite = false;

  //设置当前课程是否被关注的状态
  for (let i = 0; i < userFavoriteCourse.length; i++) {
    if (userFavoriteCourse[i].courseID == e.courseID) {
      e.courseIsInFavorite = true;
      break;
    }
  }
}
