<template>
  <div class="ui fluid container" style="margin-top:4%;padding-bottom: 4%">

    <!--全网首发-->
    <Displayer
      :choiceCourse="loopCourse"
      :choiceCourseColor="loopCourseColor"
      :choiceCourseIcon="loopCourseIcon"
      :choiceCourseDisplayerName="choiceCourseDisplayerName"
      :choiceCourseLabelText="loopCourseLabelText">
    </Displayer>
    <!--精挑细选-->
    <Displayer
      :choiceCourse="choiceCourse"
      :choiceCourseColor="choiceCourseColor"
      :choiceCourseIcon="choiceCourseIcon"
      :choiceCourseDisplayerName="choiceCourseDisplayerName"
      :choiceCourseLabelText="choiceCourseLabelText">
    </Displayer>
    <!--校长推荐-->
    <Displayer
      :choiceCourse="recommendStarCourse"
      :choiceCourseColor="recommendStarCourseColor"
      :choiceCourseIcon="recommendStarCourseIcon"
      :choiceCourseDisplayerName="choiceCourseDisplayerName"
      :choiceCourseLabelText="recommendStarCourseLabelText">
    </Displayer>
    <!--最受欢迎-->
    <Displayer
      :choiceCourse="playTimesCourse"
      :choiceCourseColor="playTimesCourseColor"
      :choiceCourseIcon="playTimesCourseIcon"
      :choiceCourseDisplayerName="choiceCourseDisplayerName"
      :choiceCourseLabelText="playTimesCourseLabelText">
    </Displayer>
  </div>
</template>
<script type="text/javascript">
  import {App_Ajax_Get} from "../../../../common/AppVueResourceApi";
  import {
    REST_URL_COURSE_ALL_LIST_REST_URL,
    REST_URL_COURSE_RECOMMENDBY_RECOMMENDSTART_LIST_REST_URL,
    REST_URL_COURSE_RECOMMENDBY_PLAYTIMES_LIST_REST_URL,
    REST_URL_COURSE_RECOMMEND_FOR_LOOP_LIST_REST_URL,
    REST_URL_QINGCHENG_SQL_USER_UPDATE_FAVORITE_COURSE
  } from "../../../../common/AppRestUrlConstants";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import Displayer from "../../../common/Displayer/Displayer.vue"
  import {App_Displayer_Name_TV001, App_Displayer_Name_CV001} from "../../../common/Displayer/Displayer";

  export default {
    components: {
      "Displayer": Displayer,
    },
    data () {
      return {
        choiceCourseDisplayerName: App_Displayer_Name_CV001,
        //choiceCourseDisplayerName: App_Displayer_Name_TV001,
        //轮播课程
        loopCourse: [],
        loopCourseColor: App_Random_Color(),
        loopCourseIcon: "flag",
        loopCourseLabelText: "全网首发",

        //精选课程
        choiceCourse: [],
        choiceCourseColor: App_Random_Color(),
        choiceCourseIcon: "gift",
        choiceCourseLabelText: "精挑细选",
        //店长推荐
        recommendStarCourse: [],
        recommendStarCourseColor: App_Random_Color(),
        recommendStarCourseIcon: "star",
        recommendStarCourseLabelText: "校长推荐",
        //播放量推荐
        playTimesCourse: [],
        playTimesCourseColor: App_Random_Color(),
        playTimesCourseIcon: "trophy",
        playTimesCourseLabelText: "最受欢迎",

      }
    },
    created: function () {

      //获取轮播课程
      this.getLoopCourse();
      //获取全部课程
      this.getAllCourse();
      //获取推荐课程
      this.getRecommendStarCourse();
      //获取播放量最大的课程
      this.getPlayTimesCourse();
    },
    updated(){

    },
    methods: {
      //获取用于轮播的Course信息
      getLoopCourse: function () {
        //获取Course信息
        let url = REST_URL_COURSE_RECOMMEND_FOR_LOOP_LIST_REST_URL;
        let params = {};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.loopCourse = data;
        });
      },
      //获取所有Course信息
      getAllCourse: function () {
        //获取Course信息
        let url = REST_URL_COURSE_ALL_LIST_REST_URL;
        let params = {};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.choiceCourse = data;
        });
      },
      //获取店长推荐Course信息
      getRecommendStarCourse: function () {
        let url = REST_URL_COURSE_RECOMMENDBY_RECOMMENDSTART_LIST_REST_URL;
        let params = {};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.recommendStarCourse = data;
        });
      },
      //获取播放量推荐Course信息
      getPlayTimesCourse: function () {
        let url = REST_URL_COURSE_RECOMMENDBY_PLAYTIMES_LIST_REST_URL;
        let params = {};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.playTimesCourse = data;
        });
      },
    }
  }
</script>
<style scoped>
</style>
