/**
 * Created by liguohua on 2017/5/25.
 */
import {js_CourseTeacher_Modal_hide} from "../../../components/common/basicTemplate/modals/CourseTeacher/CourseTeacherCaller";
import {js_StudentDetail_Modal_Hide} from "../../../components/common/basicTemplate/modals/StudentDetail/StudentDetailCaller";
import {js_AppFlowPlayer_Modal_hide} from "../../../components/common/basicTemplate/modals/Flowplayer/FlowPlayerProCaller";
import {js_CourseMaterial_Modal_hide} from "../../../components/common/basicTemplate/modals/CourseMaterial/CourseMaterialCaller";
import {js_CourseMate_Modal_hide} from "../../../components/common/basicTemplate/modals/CourseMate/CourseMateCaller";
import {js_CourseDetailModal_hide} from "../../../components/common/basicTemplate/modals/CourseDetail/CourseDetailCaller";
//折叠与展开按钮
export function js_serviec_sematicDriver4DropDwon() {
  $('.ui.accordion').accordion();
}
//鼠标滑过课程图片上的效果
export function js_service_sematicDriver4Dimmer() {
  $('.special.cards .image').dimmer({on: 'hover'});
}
//隐藏所有摸态框
export function js_service_sematicDriver4HideAllModal() {
  js_CourseTeacher_Modal_hide();
  js_CourseDetailModal_hide();
  js_StudentDetail_Modal_Hide();
  js_CourseMaterial_Modal_hide();
  js_CourseMate_Modal_hide();
  js_AppFlowPlayer_Modal_hide();
}

