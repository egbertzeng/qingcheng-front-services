/**
 * Created by liguohua on 2017/6/4.
 */
import {js_service_sematicDriver4HideAllModal} from "../../../../../common/services/SematicDriver/SematicDriver";
/**
 * 显示课程详情摸态框
 */
export function js_CourseDetailModal_show(context, course) {
  js_service_sematicDriver4HideAllModal();
  //传递课程
  context.$store.state.currtentFocusCourse4Detail = course;
  //显示摸态框
  $('#js_CourseDetailModal').modal('show');
}
/**
 * 隐藏课程详情摸态框
 */
export function js_CourseDetailModal_hide() {
  //隐藏摸态框
  $('#js_CourseDetailModal').modal('hide');
}
