<template>
  <div class="ui grid	fluid">
    <div class=" column">
      <div class="ui grid	centered">
        <div class="three wide column centered ">
          <div style="cursor: pointer;" class="centered ">
            <img class="ui small image" :class="[photoStyle]" :src="composePhotoFileOpenUrl(student)"
                 style="height: 80%;width: 80%;margin-left: 8%;margin-bottom: 4%">
          </div>
        </div>
        <div class="thirteen wide column">
          <NoserachResult></NoserachResult>
          <!--学友信息-->
          <div class="ui two column grid">
            <div class="column">
              <i v-if="student.gender" class="male icon" :class="[c]"></i>
              <i v-else="" class="female icon" :class="[c]"></i>
              昵称: {{student.name}}
            </div>
            <div class="column">
              <i v-if="student.gender" class="man icon" :class="[c]"></i>
              <i v-else="" class="woman icon" :class="[c]"></i>
              性别:
              <span v-if="student.gender">男</span>
              <span v-else="">女</span>
            </div>
            <div class="column">
              <i class="mail icon" :class="[c]"></i>邮箱:{{student.email}}
            </div>
            <div class="column">
              <FavoriteButton4User
                :e='student'
                :c="c"
                :relationType="relationType">
              </FavoriteButton4User>
            </div>
          </div>

          <div class="ui two column grid">
            <div class="column">
              <i class="announcement icon" :class="[c]"></i>
              <strong>寄语：</strong>{{student.slogan}}
            </div>
            <div v-if="student.followerNumber>0" class="column">
              <span :style="{color:c}">
                <i class="ui thumbs outline up icon right floated" :class="[c]"></i>
                粉丝量:{{student.followerNumber}}
              </span>
            </div>
            <div v-if="student.followCourseNumber>0" class="column">
              <span :style="{color:c}">
                <i class="ui thumbs outline up icon right floated" :class="[c]"></i>
                藏课量:{{student.followCourseNumber}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!--同学关注的课程-->
      <div class="title" @click="getStudentFavoriteCourse(student)">
        <img v-if="(titleMiniPhoto)&&(student.email!=undefined)" class="ui avatar image"
             :src="composePhotoFileOpenUrl(student)">
        {{student.name}}
        <i class="dropdown icon" :class="[c]"></i>
        关注了哪些课程?
      </div>
      <div class="content ">
        <CoursesTemplate
          :c="c"
          :courses="student.favoriteCourse"
          :photoUrl="composePhotoFileUrl(student)"
          :showCourseDetail="showCourseDetail"
        >
        </CoursesTemplate>
      </div>

      <!--同学关注的老师-->
      <div class="title" @click="getStudentFavoriteTeacher(student)">
        <img v-if="(titleMiniPhoto)&&(student.email!=undefined)" class="ui avatar image"
             :src="composePhotoFileOpenUrl(student)">
        {{student.name}}
        <i class="dropdown icon" :class="[c]"></i>
        关注了哪些老师?
      </div>
      <div class="content ">
        <div v-for="(sft,i) in  studentFavoriteTeachers" class="ui styled fluid accordion"
             style="margin-bottom: 2%; margin-top: 2%;">
          <TeacherTemplate
            :teacher="sft"
            :photoStyle="photoStyle4Teacher"
            :titleMiniPhoto="true"
            :c="c">
          </TeacherTemplate>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {
    js_compose_dfs_file_open_url_photo,
    js_compose_dfs_file_open_url,
    js_compose_dfs_file_user_photo
  } from "../../../common/AppRestUrlConstants";
  import FavoriteButton4User from "../common/FavoriteButton4User.vue";
  import CoursesTemplate from "./CoursesTemplate.vue";
  import TeacherTemplate from "./TeacherTemplate.vue";
  import {APP_USER_RELATION_STUDENT_STUDENT, APP_USER_RELATION_STUDENT_TEACHER} from "../../../common/AppSysConstants";
  import  NoserachResult from '../../../components/common/NosearchResult/NoserachResult.vue'

  import {_api_getFavoriteUserByFromEmail, _api_getRoleByRelationType} from "../../../common/AppRestApi";
  import {js_service_getPublishCourseByUser} from "../../../common/services/CourseService";
  import {js_serviec_sematicDriver4DropDwon} from "../../../common/services/SematicDriver/SematicDriver";
  import {js_StudentDetail_Modal_Show} from "../../common/basicTemplate/modals/StudentDetail/StudentDetailCaller.js"
  export default {
    props: {
      //默认显示模板
      student: {required: true},
      titleMiniPhoto: {default: true},
      c: {default: App_Random_Color()},
      photoStyle: {default: "rounded"},
      showCourseDetail: {default: true},
    },
    components: {
      "FavoriteButton4User": FavoriteButton4User,
      "CoursesTemplate": CoursesTemplate,
      "TeacherTemplate": TeacherTemplate,
      "NoserachResult": NoserachResult,
    },
    data () {
      return {
        //用户关注的老师的属性
        relationType: APP_USER_RELATION_STUDENT_STUDENT,
        photoStyle4Teacher: "circular",
        studentFavoriteTeachers: "",
      }
    },
    created(){
    },
    updated(){
    },
    methods: {
      //获取喜爱的课程
      getStudentFavoriteCourse(e){
        js_service_getPublishCourseByUser(this, e);
      },
      //获取用户关注的老师
      getStudentFavoriteTeacher(e){
        //2.更新前端存储
        _api_getFavoriteUserByFromEmail(this, e.email, _api_getRoleByRelationType(APP_USER_RELATION_STUDENT_TEACHER), APP_USER_RELATION_STUDENT_TEACHER).then(function (data) {
          this.studentFavoriteTeachers = data;
        });
      },
      //打开文件流
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },

      composePhotoFileUrl (e) {
        return js_compose_dfs_file_user_photo(e);
      },
      composePhotoFileOpenUrl (e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
    },

  }
</script>

<style scoped>
</style>
