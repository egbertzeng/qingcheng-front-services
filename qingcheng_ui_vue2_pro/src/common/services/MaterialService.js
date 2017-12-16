/**
 * Created by liguohua on 2017/5/30.
 */
import {js_service_getMaterialFilesByDfsPath} from "./DfsService";
export function js_service_getMaterialFilesByCourse(context, e) {
  if (e == undefined || e == "" || e == null) {
    return;
  }
  //params check
  const courseUrl = e.courseUrl;
  if (courseUrl == "") {
    return;
  }
  const materialDirName = e.materialDirName;
  if (materialDirName == "") {
    return;
  }
  //获取课程的材料
  return js_service_getMaterialFilesByDfsPath(context, courseUrl + "/" + materialDirName).then(function (data) {
    e.materialFiles = data;
  });
}
