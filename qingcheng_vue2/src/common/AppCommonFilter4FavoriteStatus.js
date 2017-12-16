/**
 * Created by liguohua on 2017/5/23.
 */
import {js_setManyCourseFavoriteStyle} from "../components/common/common/SetFavoriteButtonStyle";
import {js_setManyUserFavoriteStyle} from "../components/common/common/SetFavoriteUserButtonStyle";
export function js_AppCommonFilter4FavoriteStatus(url,params, data) {

  /**
   * 过滤，课程关注的按钮状态
   */
  js_setManyCourseFavoriteStyle(data);

  /**
   * 过滤，用户关注的按钮状态
   */
  js_setManyUserFavoriteStyle(data);

}
