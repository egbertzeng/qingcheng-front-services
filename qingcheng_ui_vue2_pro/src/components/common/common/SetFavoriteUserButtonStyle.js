/**
 * Created by liguohua on 2017/5/23.
 */
import {
  APP_CURRENT_USER_FAVORITE_TEACHER,
  APP_CURRENT_USER_FAVORITE_STUDENT
} from "../../../common/AppSysConstants";
export function js_setManyUserFavoriteStyle(list) {
  if (list == null || list == "" || list == undefined) {
    return;
  }
  for (let i = 0; i < list.length; i++) {
    js_setUserFavoriteStyle(list[i]);
  }
}
export function js_setUserFavoriteStyle(e) {
  //input check
  if (e == undefined) {
    return;
  }

  e.userIsInFavorite = false;
  //teacher
  let favoriteT = JSON.parse(window.sessionStorage.getItem(APP_CURRENT_USER_FAVORITE_TEACHER));
  if (favoriteT != undefined) {
    for (let i = 0; i < favoriteT.length; i++) {
      if (favoriteT [i].email == e.email) {
        e.userIsInFavorite = true;
        return;
      }
    }
  }

  //student
  let favoriteS = JSON.parse(window.sessionStorage.getItem(APP_CURRENT_USER_FAVORITE_STUDENT));
  if (favoriteS != undefined) {
    for (let i = 0; i < favoriteS.length; i++) {
      if (favoriteS [i].email == e.email) {
        e.userIsInFavorite = true;
        return;
      }
    }
  }

}
