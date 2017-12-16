<template>
  <div class="ui fluid container" style="padding:0px;" :style="{margin:marginSize}">
    <div class="ui fluid container">
      <table class="ui striped table">
        <thead v-if="showTableHeader">
        <tr>
          <th colspan="2" style="padding: 0px;">
            <div class="ui secondary big menu" style="font-size: 18px; margin: 0px;">
              <!--课程标题-->
              <a class="item " @click.stop.prevent="courseCardClick(currentCourse)">
                <i class="film icon" :class="[currentCourseColor]"></i>课程: {{currentCourse.courseName}}
              </a>
              <!--返回按钮-->
              <div class="right menu">
                <AppGoBackButton
                  :c="currentCourseColor">
                </AppGoBackButton>
              </div>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr style="height: 100px; padding: 0px; margin-bottom: 0px;">
          <td style="padding: 2px; padding-top:8px;padding-left:8px;margin-bottom: 0px;">
            <img @click.stop.prevent="courseCardClick(currentCourse)" class="ui rounded image"
                 :src="composeDfsFileOpenUrl(currentCourse.coursePosterUrl)"
                 style="width: 100%; cursor: pointer;">
          </td>
          <td style="padding: 0px;margin-bottom: 0px;">
            <div class="ui internally celled grid">
              <div class="row">
                <div class="column">
                  <i class="film icon" :class="[currentCourseColor]"></i>标题: {{currentCourse.courseName}}
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <i class="idea icon" :class="[currentCourseColor]"></i>子标题:{{currentCourse.courseSubName}}
                </div>
              </div>

              <div class="row">
                <div class="column">
                  <div class="ui three column grid">
                    <div class="column">
                          <span class="left floated">
                            <i class="ui play circle outline icon" :class="[currentCourseColor]"></i>
                            播放量:{{currentCourse.coursePlayTimes}}
                        </span>
                    </div>
                    <div class="column">
                           <span class="right floated">
                             <i class="ui star icon right floated" :class="[currentCourseColor]"></i>
                             推荐值:{{currentCourse.courseRecommendStart}}
                           </span>
                    </div>
                    <!--关注按钮-->
                    <FavoriteButton
                      :e="currentCourse"
                      :w="w"
                      :c="currentCourseColor">
                    </FavoriteButton>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <i class="browser icon" :class="[currentCourseColor]"></i>描述：{{currentCourse.courseDescription}}
                </div>
              </div>

              <div class=" right floated row" style="margin-bottom: -10px;padding: 0px;">
                <!--播放按钮-->
                <CoursePlayButton
                  style="margin-top: -10px; "
                  :e="currentCourse"
                  :c="currentCourseColor">
                </CoursePlayButton>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="ui grid" style="margin-left: 0%;margin-right: 0%;">
      <div class="row">
        <!--左-->
        <div class="twelve wide column">
          <div
            v-if="(currentCourse!=null||currentCourse!=''||currentCourse!=undefined)&&currentCourse.materialFiles.length>0"
            class="ui fluid container">
            <h6>参考资料</h6>
            <CoursePdfListTemplate
              :course="currentCourse"
              :c="currentCourseColor"
              :iconSize="iconSize"
            >
            </CoursePdfListTemplate>
          </div>
          <div v-if="currtentCourseMate!=''||currtentCourseMate!=null" class="ui fluid container">
            <h6>课程粉丝</h6>
            <CourseMatesListTemplate
              :currtentCourseMate="currtentCourseMate"
              :c="currentCourseColor">
            </CourseMatesListTemplate>
          </div>

          <div v-if="currentCourse.comments.length>0" class="ui fluid container">
            <h6>课程评论</h6>
            <CourseCommentTemplate
              v-for="(comment,index) in currentCourse.comments"
              :comment="comment"
              :c="currentCourseColor">
            </CourseCommentTemplate>
          </div>

          <CourseCommentFormTemplate>

          </CourseCommentFormTemplate>

        </div>
        <!--右-->
        <div class="four wide column">
          <h6>课程讲师</h6>
          <TeacherCardTemplate
            v-if="currentCourseTeacher!=undefined||currentCourseTeacher!=null"
            :teacher="currentCourseTeacher"
            :c="currentCourseColor"
            :showCourseDetail="showCourseDetail">
          </TeacherCardTemplate>
        </div>
      </div>
    </div>


  </div>
</template>

<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {
    js_compose_dfs_file_open_url,
    js_compose_dfs_file_user_photo,
    js_compose_dfs_file_open_url_photo
  } from "../../../common/AppRestUrlConstants";
  import {js_AppFlowPlayer_Modal_show_new} from "../basicTemplate/modals/Flowplayer/FlowPlayerProCaller";
  import FavoriteButton from "../common/FavoriteButton.vue";
  import AppGoBackButton from "../common/AppGoBackButton.vue";
  import CoursePlayButton from "../common/CoursePlayButton.vue";
  import TeacherCardTemplate from "./TeacherCardTemplate.vue";
  import CourseMatesListTemplate from "./CourseMatesListTemplate.vue";
  import CoursePdfListTemplate from "./CoursePdfListTemplate.vue";
  import CourseCommentTemplate from "./CourseCommentTemplate.vue";
  import CourseCommentFormTemplate from "./CourseCommentFormTemplate.vue";

  import {js_service_getMaterialFilesByCourse} from "../../../common/services/MaterialService";
  import {js_service_getTeacherByFocusCourse} from "../../../common/services/TeacherService";
  import {js_toFindCourseMate} from "../basicTemplate/modals/CourseMate/CourseMateCaller";
  import {js_service_getCourseMateByCourse} from "../../../common/services/CourseService";
  import {js_service_getCourseCommentByCourseID} from "../../../common/services/CourseCommentService.js";
  export default {

    props: {
      showCourseDetail: {default: true},
      showTableHeader: {default: true}
    },
    components: {
      "FavoriteButton": FavoriteButton,
      "AppGoBackButton": AppGoBackButton,
      "CoursePlayButton": CoursePlayButton,
      "TeacherCardTemplate": TeacherCardTemplate,
      "CourseMatesListTemplate": CourseMatesListTemplate,
      "CoursePdfListTemplate": CoursePdfListTemplate,
      "CourseCommentTemplate": CourseCommentTemplate,
      "CourseCommentFormTemplate": CourseCommentFormTemplate
    },
    data () {
      return {
        currentCourse: "",
        currentCourseColor: App_Random_Color(),
        currentCourseTeacher: "",
        currtentCourseMate: [],
        w: "four",
        iconSize: "large",
        marginSize: "2%"
      }
    },
    watch: {
      '$store.state.currtentFocusCourse4Detail': 'getCoureseRelationInfo'
    },
    created(){
      this.getCoureseRelationInfo();
    },
    updated(){
    },
    methods: {
      /**
       * 获取本课程相关的信息
       */
      getCoureseRelationInfo(){
        this.setStyle();
        this.currentCourse = this.$store.state.currtentFocusCourse4Detail;
        this.getCourseMaterail(this.currentCourse);
        this.getTeacherByFocusCourse(this.currentCourse);
        this.getCourseMaterByFocusCourse(this.currentCourse);
        this.getCourseComments(this.currentCourse);
      },
      /**
       * 获取课程的评论信息
       */
      getCourseComments(e){
        js_service_getCourseCommentByCourseID(this, e);
      },
      //获取课程材料信息
      getCourseMaterail(e){
        js_service_getMaterialFilesByCourse(this, e);
      },
      //获取授课教师的信息
      getTeacherByFocusCourse(e){
        js_service_getTeacherByFocusCourse(this, e).then(function (data) {
          this.currentCourseTeacher = data;
        });
      },
      //获取课程的粉丝
      getCourseMaterByFocusCourse(e){
        js_service_getCourseMateByCourse(this, e).then(function (data) {
          this.currtentCourseMate = data;
        });

      },
      composeDfsFileOpenUrl: function (uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      courseCardClick(e){
        js_AppFlowPlayer_Modal_show_new(this, e);
      },


      /**
       * 设置样式
       */
      setStyle(){
        if (this.showTableHeader) {
          this.marginSize = "6%";
        }
      }

    }
  }
</script>

<style scoped>
</style>
