/**
 * Created by liguohua on 2017/5/19.
 */
import {js_service_sematicDriver4HideAllModal} from "../../../../../common/services/SematicDriver/SematicDriver";
/**
 * 打开CourseTeacher摸态框
 */
export function js_CourseTeacher_Modal() {
  js_service_sematicDriver4HideAllModal();
  $('#js_CourseTeacher_Modal').modal('show');
}
/**
 * 关闭CourseTeacher摸态框
 */
export function js_CourseTeacher_Modal_hide() {
  $('#js_CourseTeacher_Modal').modal('hide');
}
/**
 * 用于判断是否打开摸态框，的通用方法
 */
function js_common_check_open_modal(modal = false) {
  if (modal) {
    js_CourseTeacher_Modal();
  }
}
/**
 * 根据点击的课程，间接查看老师的详细信息
 */
export function js_toFindeCourseTeacher(context, course) {
  js_toFindeCourseTeacher0(context, course, true)
}
export function js_toFindeCourseTeacher_flat(context, course) {

  js_toFindeCourseTeacher0(context, course, false)
}
export function js_toFindeCourseTeacher0(context, course, modal) {

  context.$store.state.currtentFocusCourse4Teacher= course;
  js_common_check_open_modal(modal);
}

/**
 * 根据点击的老师，直接查看老师的详细信息
 */
export function js_toFindeTeacher(context, teacher) {
  js_toFindeTeacher0(context, teacher, true);
}
export function js_toFindeTeacher0(context, teacher, modal) {
  context.$store.state.currtentFocusTeacher = teacher;
  js_common_check_open_modal(modal);
}
