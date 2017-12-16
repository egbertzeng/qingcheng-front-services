<template>
  <div class="ui grid	fluid">
    <div class=" column">
      <div class="ui grid	centered">
        <div class="three wide column centered ">
          <div style="cursor: pointer;" class="centered ">
            <img @click="teacherCardClick(teacher)"class="ui small image" :class="[photoStyle]" :src="composePhotoFileOpenUrl(teacher)"
                 style="height: 80%;width: 80%;margin-left: 8%;margin-bottom: 4%">

          </div>
        </div>
        <div class="thirteen wide column">
          <div class="ui two column grid">
            <div class="column">
              <i v-if="teacher.gender" class="male icon" :class="[c]"></i>
              <i v-else="" class="female icon" :class="[c]"></i>
              昵称: {{teacher.name}}
            </div>
            <div class="column">
              <i v-if="teacher.gender" class="man icon" :class="[c]"></i>
              <i v-else="" class="woman icon" :class="[c]"></i>
              性别:
              <span v-if="teacher.gender">男</span>
              <span v-else="">女</span>
            </div>
            <div class="column">
              <i class="mail icon" :class="[c]"></i>邮箱:{{teacher.email}}
            </div>
            <div class="column">
              <FavoriteButton4User
                :e='teacher'
                :c="c"
                :relationType="relationType">
              </FavoriteButton4User>
            </div>

          </div>

          <div class="ui two column grid">
            <div class="column">
              <i class="announcement icon" :class="[c]"></i>
              <strong>寄语：</strong>{{teacher.slogan}}
            </div>
            <div v-if="teacher.followerNumber>0" class="column">
              <span :style="{color:c}">
                <i class="ui thumbs outline up icon right floated" :class="[c]"></i>
                粉丝量:{{teacher.followerNumber}}
              </span>
            </div>
            <div v-if="teacher.publishCourseNumber>0" class="column">
              <span :style="{color:c}">
                <i class="ui thumbs outline up icon right floated" :class="[c]"></i>
                授课量:{{teacher.publishCourseNumber}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="title" @click="getTeacherPublishCourse(teacher)">

        <img v-if="(titleMiniPhoto)&&(teacher.email!=undefined)" class="ui avatar image"
             :src="composePhotoFileOpenUrl(teacher)">
        {{teacher.name}}
        <i class="dropdown icon" :class="[c]"></i>
        发布了哪些课程?
      </div>
      <div class="content">
        <CoursesTemplate
          v-if="teacher.publishCourse!=''"
          :courses="teacher.publishCourse"
          :c="c"
          :photoUrl="composePhotoFileUrl(teacher)"
          :showCourseDetail="showCourseDetail"
        >
        </CoursesTemplate>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {
    js_compose_dfs_file_open_url_photo,
    js_compose_dfs_file_open_url,
    js_compose_dfs_file_user_photo,
  } from "../../../common/AppRestUrlConstants";
  import FavoriteButton4User from "../common/FavoriteButton4User.vue";
  import CoursesTemplate from "./CoursesTemplate.vue";
  import {APP_USER_RELATION_STUDENT_STUDENT, APP_USER_RELATION_STUDENT_TEACHER} from "../../../common/AppSysConstants";
  import {App_Ajax_Get} from "../../../common/AppVueResourceApi";
  import {
    js_service_getCourseByTeacher
  } from "../../../common/services/CourseService";
  import {
    js_serviec_sematicDriver4DropDwon,
    js_service_sematicDriver4Dimmer
  } from "../../../common/services/SematicDriver/SematicDriver";
  import {js_toFindeTeacher} from "./modals/CourseTeacher/CourseTeacherCaller";
  export default {
    props: {
      //默认显示模板
      teacher: {required: true},
      titleMiniPhoto: {default: true},
      c: {default: App_Random_Color()},
      photoStyle: {default: "circular"},
      needUpdateSetStyle: {default: false},
      showCourseDetail: {default: true},

    },
    components: {
      "FavoriteButton4User": FavoriteButton4User,
      "CoursesTemplate": CoursesTemplate,
    },
    data () {
      return {
        relationType: APP_USER_RELATION_STUDENT_TEACHER,
        teacherShow: false,
        studentShow: false,
        publishCourse: "",
      }
    },
    created(){
    },
    updated(){
      if (this.needUpdateSetStyle) {
        js_serviec_sematicDriver4DropDwon();
      }
    },
    methods: {
      //获取该教师发布的所有课程
      getTeacherPublishCourse(){
        js_service_sematicDriver4Dimmer();
        js_service_getCourseByTeacher(this, this.teacher);
      },
      //打开文件流
      composePhotoFileOpenUrl(e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
      composePhotoFileUrl (e) {
        return js_compose_dfs_file_user_photo(e);
      },
      //点击教师头像
      teacherCardClick(e){
        js_toFindeTeacher(this, e);
      },
    },

  }
</script>

<style scoped>
</style>
