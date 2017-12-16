/**
 * Created by liguohua on 2017/5/18.
 */
export function js_CourseMaterial_Modal() {
  $('#js_CourseMaterial_Modal').modal('show');
}
export function js_CourseMaterial_Modal_hide() {
  $('#js_CourseMaterial_Modal').modal('hide');
}
export function js_toFindCourseMaterial(context, e, modal) {
  context.$store.state.currtentFocusCourse4Material = e;
  if (modal) {
    js_CourseMaterial_Modal();
  }
}
