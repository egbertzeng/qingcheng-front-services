/**
 * Created by liguohua on 2017/6/4.
 */
import routerUrl from "../../FrontRouterConstants";
import {js_service_sematicDriver4HideAllModal} from "../SematicDriver/SematicDriver";
/**
 * 转到：课程详情页面
 * @param context 上下文
 * @param course 课程
 */
export function js_goToCourseDetail(context, course) {
  //隐藏所有摸态框
  js_service_sematicDriver4HideAllModal();
  //传递课程
  context.$store.state.currtentFocusCourse4Detail = course;
  //跳转路由
  context.$router.push({path: routerUrl.path.CourseDetailTemplate});

}

/**
 * 转到：返回上级页面
 * @param context
 */
export function js_routeGoBack(context) {
  context.$router.go(-1)
}
