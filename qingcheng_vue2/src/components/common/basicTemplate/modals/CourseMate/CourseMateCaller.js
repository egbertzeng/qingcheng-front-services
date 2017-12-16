/**
 * Created by liguohua on 2017/5/18.
 */
import { js_service_sematicDriver4HideAllModal} from "../../../../../common/services/SematicDriver/SematicDriver";
export function js_CourseMate_Modal() {
  js_service_sematicDriver4HideAllModal();
  $('#js_CourseMate_Modal').modal('show');
}
export function js_CourseMate_Modal_hide() {
  $('#js_CourseMate_Modal').modal('hide');
}
//查看同样关注此课程的同学
export function js_toFindCourseMate(context, e, modal) {
  context.$store.state.currtentFocusCourse4Student = e;
  if (modal) {
    js_CourseMate_Modal();
  }
}
