/**
 * Created by liguohua on 2017/6/3.
 */


import {js_appStore_currtentFocusStudent4Detail} from "../../../../../common/AppStoreUtil";
import {js_service_sematicDriver4HideAllModal} from "../../../../../common/services/SematicDriver/SematicDriver";
/**
 * 打开摸态框
 * @param context
 * @param stu
 */
export function js_StudentDetail_Modal_Show(context,stu) {
  js_service_sematicDriver4HideAllModal();
  js_appStore_currtentFocusStudent4Detail(context,stu);
  $('#js_StudentDetailModal').modal('show');
}
/**
 * 隐藏摸态框
 */
export function js_StudentDetail_Modal_Hide() {
  $('#js_StudentDetailModal').modal('hide');
}
