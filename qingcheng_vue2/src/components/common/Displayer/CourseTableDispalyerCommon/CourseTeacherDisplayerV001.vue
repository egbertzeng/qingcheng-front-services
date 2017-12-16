<template>
  <div class="ui styled fluid accordion">
    <div @click="getTeacherByFocusCourse()" class="title">
      <img v-if="e.coursePosterUrl!=undefined" class="ui avatar image"
           :src="composeDfsFileOpenUrl(e.coursePosterUrl)">
      {{e.courseName}}
      <i class="dropdown icon" :class="[c]"></i>课程讲师
    </div>
    <div class="content">
      <div class="ui grid	centered">
        <div class="sixteen wide column">
          <div class="panel panel-default">
            <div class="panel-heading">
              <TeacherTemplate
                v-if="currentCourseTeacher!=''"
                :teacher="currentCourseTeacher"
                :photoStyle="photoStyle"
                :titleMiniPhoto="true"
                :c="c">
              </TeacherTemplate>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import TeacherTemplate from "../../../common/basicTemplate/TeacherTemplate.vue";

  import {
    js_compose_dfs_file_open_url, REST_URL_QINGCHENG_SQL_TEACHER_GET_BY_COURSEID,
    REST_URL_QINGCHENG_SQL_COURSE_GET_BY_TEACHER_EMAIL, js_compose_dfs_file_open_url_photo
  } from "../../../../common/AppRestUrlConstants";
  import {App_Ajax_Get} from "../../../../common/AppVueResourceApi";
  import {APP_USER_RELATION_STUDENT_TEACHER} from "../../../../common/AppSysConstants";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import {js_setUserFavoriteStyle} from "../../common/SetFavoriteUserButtonStyle.js";
  import {js_service_getTeacherByFocusCourse} from "../../../../common/services/TeacherService";
  import {js_service_sematicDriver4Dimmer} from "../../../../common/services/SematicDriver/SematicDriver";

  export default {
    components: {
      "TeacherTemplate": TeacherTemplate,
    },
    props: {
      //课程
      e: {required: true},
      //颜色
      c: {required: true},
    },
    watch: {
    },
    data () {
      return {
        photoStyle: "circular",
        relationType: APP_USER_RELATION_STUDENT_TEACHER,
        currentCourseTeacher: "",
      }
    },
    methods: {
      //获取授课教师的信息
      getTeacherByFocusCourse(){
        js_service_sematicDriver4Dimmer();
        //根据课程查询
        js_service_getTeacherByFocusCourse(this, this.e).then(function (data) {
          this.currentCourseTeacher = data;
        });
      },
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
    }
  }
</script>
<style scoped>
</style>
