/**
 * Created by liguohua on 24/03/2017.
 */
import {APP_FEMALE_USER_PHOTO_NAME, APP_MALE_USER_PHOTO_NAME} from "./AppSysConstants";
import {APP_JAVA_APPLICATION_SERVER} from "../GlobalSetting.js";
/**
 一、服务器和restURL
 */

export const REST_URL_DFS_PLAYER_JAVAWEB_SERVER_REST_URL = APP_JAVA_APPLICATION_SERVER;

//用于提供，查找路径下的所有文件
export const REST_URL_QINGCHENG_LOCALFILE_GET_FILELIST = js_common_util_getFullRestUrlByResourceUri("/qingcheng/localfile/get/filelist");
//用于提供，生成课程目录
export const REST_URL_UTIL_MEDIA_DIR_TO_COURSE = js_common_util_getFullRestUrlByResourceUri("/qingcheng/util/media/dir/to/course");
//用于提供，判断ts文件是否存在
export const REST_URL_QINGCHENG_LOCALFILE_CHECK_TSFILE_ISEXIST = js_common_util_getFullRestUrlByResourceUri("/qingcheng/localfile/check/tsfile/isexist");
//用于提供，所有category信息
export const REST_URL_CATEGORY_ALL_LIST_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/category/all");
//用于提供，所有course信
export const REST_URL_COURSE_ALL_LIST_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/all");
//用于对外提供，程的video数据流，dfs上的文件读取功能，可以返回文件的输出流
//用于提供，根据设定推荐级别排行榜推荐课程
export const REST_URL_COURSE_RECOMMENDBY_RECOMMENDSTART_LIST_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/recommend/star");
//用于提供，根据播放次数排行榜推荐课程
export const REST_URL_COURSE_RECOMMENDBY_PLAYTIMES_LIST_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/recommend/playtimes");
//用于提供，根据设定轮播中的推荐
export const REST_URL_COURSE_RECOMMEND_FOR_LOOP_LIST_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/recommend/for/loop");
//用于提供，课程的播放列表
export const REST_URL_VIDEO_LIST_ONE_COURSE_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/dfs/video/playlist");
//用于对外提供，程的video数据流，dfs上的文件读取功能，可以返回文件的输出流
export const REST_URL_COURSE_FILE_OPNE_REST_URL = js_common_util_getFullRestUrlByResourceUri("/open/dfs/open?filePath=");
//todo 带验证的数据流请求
// export const REST_URL_COURSE_FILE_OPNE_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/open/dfs/open?filePath=");
//用于提供，search到的album信息
export const REST_URL_GET_COURSE_LIST_BY_SEARCHKEY_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/search");
// ?k=
//用于提供，根据课程类别获取album信息
export const REST_URL_GET_COURSE_LIST_BY_CATEGORYID_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/get/course/by/categoryid");
//用于提供，根据email查找用户信息
export const REST_URL_QINGCHENG_FIND_ACCOUNT_BY_EMAIL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/find/account/by/email");

//用于提供，根据email获取用户关注的课程或用户观看课程的历史记录
export const REST_URL_QINGCHENG_SQL_COURSE_GET_BY_EMAIL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/get/by/email");

//用于提供，插入或更新用户关注的课程
export const REST_URL_QINGCHENG_SQL_USER_UPDATE_FAVORITE_COURSE = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/user/update/favorite/course");

//用于提供，根据courseid获取关注该课程所有的关注用户
export const REST_URL_QINGCHENG_SQL_USER_GET_BY_COURSEID = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/user/get/by/courseid");
//用于提供，根据courseID获取老师的信息
export const REST_URL_QINGCHENG_SQL_TEACHER_GET_BY_COURSEID = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/teacher/get/by/courseid");

//用于提供，根据teacherEmail获取教师发布的课程
export const REST_URL_QINGCHENG_SQL_COURSE_GET_BY_TEACHER_EMAIL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/get/by/teacher/email");

//用于提供，根据fromEmail获取所关注的课程
export const REST_URL_QINGCHENG_SQL_COURSE_GET_USER_BY_FROMEMAIL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/get/user/by/fromemail");
//用于提供,添加或更新用户关系
export const REST_URL_QINGCHENG_UPDATE_USER_RELATION = js_common_util_getFullRestUrlByResourceUri("/qingcheng/update/user/relation");

//用于提供,根据查询所有已经激活的老师
export const REST_URL_QINGCHENG_GET_ALL_ACTIVE_TEACHER = js_common_util_getFullRestUrlByResourceUri("/qingcheng/get/all/active/teacher");

//课程的粉丝数量排行榜
export const REST_URL_QINGCHENG_SQL_COURSE_GET_FOLLOWER_ORDER_LIST = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/get/course/follower/order/list");

//用户粉丝数量排行榜
export const REST_URL_QINGCHENG_SQL_GET_USER_FOLLOWER_ORDER_LIST = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/get/user/follower/order/list");
//学生，关注课程数量的排行榜
export const REST_URL_QINGCHENG_SQL_GET_USER_FOLLOW_COURSE_ORDER_LIST = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/get/user/follow/course/order/list");
//老师，发布课程数量的排行榜
export const REST_URL_QINGCHENG_SQL_GET_USER_PUBLISH_COURSE_ORDER_LIST = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/get/user/publish/course/order/list");


//用于提供，根据路径，获取路径下的材料
export const REST_URL_QINGCHENG_DFS_GET_MARTERIAL_BY_PATH = js_common_util_getFullRestUrlByResourceUri("/qingcheng/dfs/get/marterial/by/path");

//用于获取课程的评论信息
export const QINGCHENG_SQL_COURSE_COMMENT_GET_BY_COURSEID = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/course/comment/get/by/courseid");
//用户，根据email获取用户信息
export const REST_URL_QINGCHENG_SQL_GET_USER_BY_EMAIL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/get/user/by/email");
/**
 * 管理员部分
 */
//用于提供，所有课程信息
export const REST_URL_COURSE_ADMIN_ALL_LIST_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/admin/course/all");
//用于提供，更新课程信息，根据课程编号
export const REST_URL_COURSE_ADMIN_UPDATE_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/admin/course/update");
//用于提供，在分布式文件系统上移动课程
export const REST_URL_COURSE_ADMIN_DFS_RENAME_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/dfs/admin/course/rename");
//用于提供，根据课程编号,删除课程
export const REST_URL_COURSE_ADMIN_DEconstE_REST_URL = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/admin/course/delete");

//用户，获取所有用户的信息
export const REST_URL_QINGCHENG_SQL_ADMIN_GET_ALL_USER = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/admin/get/all/user");
//用户，更新用户的信息
export const REST_URL_QINGCHENG_SQL_ADMIN_UPDATE_USER = js_common_util_getFullRestUrlByResourceUri("/qingcheng/sql/admin/update/user");

/**
 * 二、以下连接没有安全认证
 */
//用于提供登陆服务
export const REST_URL_APP_LOGIN = js_common_util_getFullRestUrlByResourceUri("/open/login");
//用于提供注册服务
export const REST_URL_APP_REGIST = js_common_util_getFullRestUrlByResourceUri("/open/regist");

export function js_common_util_getFullRestUrlByResourceUri(uri) {
  return REST_URL_DFS_PLAYER_JAVAWEB_SERVER_REST_URL + uri;
}
export function js_compose_dfs_file_open_url(uri) {
  // if (uri.startsWith("undefined")) {
  //   return;
  // }
  return REST_URL_COURSE_FILE_OPNE_REST_URL + uri;
}
//设置用户的头像信息
export function js_compose_dfs_file_open_url_photo(user) {
  return js_compose_dfs_file_open_url(js_compose_dfs_file_user_photo(user));
}
export function js_compose_dfs_file_user_photo(user) {
  let uri = user.photo;
  if (user.gender == 1) {
    //男性头像
    uri += APP_MALE_USER_PHOTO_NAME;
  } else {
    //女性头像
    uri += APP_FEMALE_USER_PHOTO_NAME;
  }
  return uri;
}





