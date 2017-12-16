<template>
  <div id="js_CourseTeacher_Modal" style="margin-top: 0%" class="modal fade bs-example-modal-lg" data-backdrop="static"
       data-keyboard="false" tabindex="-1" role="dialog"
       aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document" style="width: 1200px;padding-top: 4%;">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="hideCourseTeacherModal()" type="button" class="close" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <span class="modal-title" id="gridSystemModalLabel">
            <img v-if="currtentCourseTeacher!=null&&currtentCourseTeacher.email!=undefined" class="ui avatar  image"
                 :src="composePhotoFileOpenUrl(currtentCourseTeacher)">
            <span>老师，{{currtentCourseTeacher.name}}：</span>
          </span>
        </div>
        <div class="modal-body">
          <table class="ui celled table">
            <tbody>
            <tr>
              <td style="background-color: whitesmoke;">
                <div class="ui grid	centered">
                  <div class="three wide column centered ">
                    <div style="cursor: pointer;" class="centered ">
                      <img v-if="currtentCourseTeacher.email!=undefined" class="ui small circular image"
                           :src="composePhotoFileOpenUrl(currtentCourseTeacher)"
                           style="height: 100%;width: 100%;margin-left: 0px;">
                    </div>
                  </div>
                  <div class="thirteen wide column">
                    <!--教师信息-->
                    <table class="ui  unstackable celled striped compact selectable table"
                           style="background-color: whitesmoke; margin-top: 2%;">
                      <thead>
                      <tr>
                        <th>昵称</th>
                        <th>邮箱</th>
                        <th>性别</th>
                        <th>关注</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>
                          <i v-if="currtentCourseTeacher.gender" class="male icon" :class="[c]"></i>
                          <i v-else="" class="female icon" :class="[c]"></i>
                          {{currtentCourseTeacher.name}}
                        </td>
                        <td>{{currtentCourseTeacher.email}}</td>
                        <td v-if="currtentCourseTeacher.gender">男</td>
                        <td v-else="">女</td>
                        <td v-if="currtentCourseTeacher!=''">
                          <FavoriteButton4User
                            :e='currtentCourseTeacher'
                            :c="c"
                            :relationType="relationType">
                          </FavoriteButton4User>
                        </td>
                      </tr>
                      <tr>

                      </tr>
                      </tbody>
                      <tfoot>
                      <tr>
                        <th colspan="4">
                          <i class="announcement icon" :class="[c]"></i>
                          <strong>寄语：</strong>{{currtentCourseTeacher.slogan}}
                        </th>
                      </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <!--搜索的结果-->
                <CoursesTemplate
                  :c="c"
                  :courses="currtentCourseTeacher.publishCourse"
                  :photoUrl="composePhotoFileUrl(currtentCourseTeacher)"
                  :showCourseDetail="showCourseDetail"
                >
                </CoursesTemplate>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script type="text/javascript">
  import CoursesTemplate from "../../../basicTemplate/CoursesTemplate.vue";

  import {js_CourseTeacher_Modal_hide} from "./CourseTeacherCaller";
  import {App_Random_Color} from "../../../../../common/AppColorConstants";
  import {
    REST_URL_QINGCHENG_SQL_TEACHER_GET_BY_COURSEID,
    REST_URL_QINGCHENG_SQL_COURSE_GET_BY_TEACHER_EMAIL, js_compose_dfs_file_open_url,
    REST_URL_QINGCHENG_UPDATE_USER_RELATION,
    js_compose_dfs_file_open_url_photo, js_compose_dfs_file_user_photo
  } from "../../../../../common/AppRestUrlConstants";
  import {App_Ajax_Get, App_Ajax_Post} from "../../../../../common/AppVueResourceApi";
  import {
    APP_CURRENT_SESSION_EMAIL,
    APP_USER_RELATION_STUDENT_TEACHER,
    APP_USER_RELATION_STATUS_OK
  } from "../../../../../common/AppSysConstants";
  import MateTeacherFavoriteButtons from "../../../common/MateTeacherFavoriteButtons";
  import FavoriteButton4User from "../../../common/FavoriteButton4User.vue";
  import {js_setUserFavoriteStyle} from "../../../common/SetFavoriteUserButtonStyle";
  import {
    js_service_getCourseByTeacher
  } from "../../../../../common/services/CourseService";
  import {js_service_getTeacherByFocusCourse} from "../../../../../common/services/TeacherService";
  export default {
    props: {
      c: {default: App_Random_Color()},
      showCourseDetail: {default: true},
    },
    components: {
      "FavoriteButton4User": FavoriteButton4User,
      "MateTeacherFavoriteButtons": MateTeacherFavoriteButtons,
      "CoursesTemplate": CoursesTemplate,
    },
    data () {
      return {
        relationType: APP_USER_RELATION_STUDENT_TEACHER,
        teacherShow: false,
        studentShow: false,
        currtentFocusCourse: "",
        currtentCourseTeacher: {},
        labelSizeForCourse: "large",
      }
    },
    created(){
      this.getTeacherByFocusCourse();
    },
    updated(){
    },
    watch: {
      //点击课程，查看老师的详细信息
      '$store.state.currtentFocusCourse4Teacher': 'getTeacherByFocusCourse',
      //点击老师，查看老师的详细信息
      '$store.state.currtentFocusTeacher': 'getTeacherFocusTeacher',
    },
    methods: {
      //1.点击老师入口
      getTeacherFocusTeacher(){
        this.currtentCourseTeacher = this.$store.state.currtentFocusTeacher;
        if (this.currtentCourseTeacher == null || this.currtentCourseTeacher == "") {
          return;
        }
        //此处是修改的bug,因为this.currentCourseTeacher有可能为空，导致后续无法渲染。不能删除！
        // js_setUserFavoriteStyle(this.currtentCourseTeacher);
        //根据email查询
        js_service_getCourseByTeacher(this, this.currtentCourseTeacher);
      },
      //2.点击课程入口
      getTeacherByFocusCourse(){
        this.currtentFocusCourse = this.$store.state.currtentFocusCourse4Teacher;
        if (this.currtentFocusCourse == null || this.currtentFocusCourse == "") {
          return;
        }
        //根据课程查询
        js_service_getTeacherByFocusCourse(this, this.currtentFocusCourse).then(function (data) {
          this.currtentCourseTeacher = data;
          js_setUserFavoriteStyle(this.currentCourseTeacher);
          js_service_getCourseByTeacher(this, this.currtentCourseTeacher);
        });
      },
      composePhotoFileOpenUrl (e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
      //打开文件流
      composePhotoFileUrl (e) {
        return js_compose_dfs_file_user_photo(e);
      },
      //隐藏摸态框
      hideCourseTeacherModal(){
        js_CourseTeacher_Modal_hide();
      },
    },
  }
</script>
<style scoped>
  .modal-body {
    height: 480px;
    overflow: scroll;
  }
</style>
