/**
 * Created by liguohua on 2017/5/29.
 */
import {App_Ajax_Get} from "../AppVueResourceApi";
import {REST_URL_QINGCHENG_DFS_GET_MARTERIAL_BY_PATH} from "../AppRestUrlConstants";
/**
 * 学生粉丝数量排行榜
 */
export function js_service_getMaterialFilesByDfsPath(context,path) {
  const  params = {path: path};
  return App_Ajax_Get(context, REST_URL_QINGCHENG_DFS_GET_MARTERIAL_BY_PATH, params);
}
