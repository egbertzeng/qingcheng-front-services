/**
 * Created by liguohua on 2017/5/5.
 */
export function js_AppFlowPlayer_Modal_show() {
  $('#modalForFlowPlayer').modal('show');
}
export function js_AppFlowPlayer_Modal_show_new(context, e) {
  context.$store.state.currtentFocusCourse4Player = e;
  js_AppFlowPlayer_Modal_show();
}
export function js_AppFlowPlayer_Modal_hide() {
  $('#modalForFlowPlayer').modal('hide');
}


