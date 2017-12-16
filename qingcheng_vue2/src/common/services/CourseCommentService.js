/**
 * Created by liguohua on 2017/6/9.
 */
import {QINGCHENG_SQL_COURSE_COMMENT_GET_BY_COURSEID} from "../AppRestUrlConstants";
import {App_Ajax_Get} from "../AppVueResourceApi";

/**
 * 获取课程的评论信息
 * @param context 上下文
 * @param course 课程
 */
export function js_service_getCourseCommentByCourseID(context, course) {
  const params = {courseID: course.courseID};
  return App_Ajax_Get(context, QINGCHENG_SQL_COURSE_COMMENT_GET_BY_COURSEID, params).then(function (data) {
    course.comments = data;
  });
}
