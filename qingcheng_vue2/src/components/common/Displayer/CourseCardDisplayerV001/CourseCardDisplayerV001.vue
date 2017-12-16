<template>
  <div class="ui  fluid container" style="margin-top: 1%;">
    <div class="sixteen wide column">
      <a style="margin-left: 1%" class="ui ribbon label" :class="[choiceCourseLabelSize,choiceCourseColor]">
        <i class="icon" :class="[choiceCourseIcon,choiceCourseIconSize]"></i>{{choiceCourseLabelText}}
      </a>
      <div class="ui special  link cards " :class="[choiceCourseColumnNum,choiceCourseColor]"
           style="border-top: 2px dashed;font-size: small" :style="[{color:choiceCourseColor}]">
        <!--没有结果提示区域-->
        <NoserachResult></NoserachResult>
        <!--搜索结果显示区域-->
        <div class="special card" v-for="(e,i) of choiceCourse" >
          <a v-if="choiceCourseShowCornerLabel" class="ui right corner mini label" :class="[choiceCourseColor]">
            <i class="icon" :class="[choiceCourseIcon]"></i>
          </a>
          <div class="blurring dimmable image" @click.stop.prevent="courseCardClick(e)">
            <div class="ui dimmer">
              <div class="content">
                <div class="center">
                  <i class="huge inverted video play outline icon" :class="[choiceCourseColor]"></i>
                </div>
              </div>
            </div>
            <img :src="composeDfsFileOpenUrl(e.coursePosterUrl)">
          </div>
          <div class="content" @click.stop.prevent="goToCourseDetail(e)">
            <a class="header">{{e.courseName}}</a>
            <div class="meta">
              <span v-if="choiceCourseShowSubTitle" class="date">
                {{e.courseSubName}}
              </span>
            </div>
            <div class="description">
              <span v-if="choiceCourseShowDescription" class="left floated">
                  {{e.courseDescription}}
              </span>
              <br/>
              <span v-if="choiceCourseShowRecommendValue" class="left floated">
                 <i class="star icon" :class="[choiceCourseColor]"></i>推荐值：{{e.courseRecommendStart}}
              </span>
              <span v-if="choiceCourseShowPlayTimes" class="right floated">
                 <i class="video play outline icon" :class="[choiceCourseColor]"></i>播放量：{{e.coursePlayTimes}}
              </span>


            </div>
          </div>
          <div v-if="choiceCourseShowButtons" class="extra content">
            <!--按钮件套-->
            <MateTeacherFavoriteButtons :e="e" :c="choiceCourseColor"></MateTeacherFavoriteButtons>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {js_compose_dfs_file_open_url,} from "../../../../common/AppRestUrlConstants";
  import  NoserachResult from '../../NosearchResult/NoserachResult.vue'
  import {NO_SEARCH_RESULT_CALLER} from "../../NosearchResult/NoserachResultCaller";
  import {js_AppFlowPlayer_Modal_show_new} from "../../basicTemplate/modals/Flowplayer/FlowPlayerProCaller";
  import MateTeacherFavoriteButtons from "../../../common/common/MateTeacherFavoriteButtons.vue";
  import {App_Displayer_Props} from "../Displayer";
  import {js_service_sematicDriver4Dimmer} from "../../../../common/services/SematicDriver/SematicDriver";
  import {js_goToCourseDetail} from "../../../../common/services/router/AppRouterUtil";
  import {js_CourseDetailModal_show} from "../../basicTemplate/modals/CourseDetail/CourseDetailCaller";
  export default {
    components: {
      "NoserachResult": NoserachResult,

      "MateTeacherFavoriteButtons": MateTeacherFavoriteButtons,
    },
    props: App_Displayer_Props,
    created(){
      js_service_sematicDriver4Dimmer();
    },
    updated: function () {
      js_service_sematicDriver4Dimmer();
      //设置是否显示搜索没有结果的提示信息
      NO_SEARCH_RESULT_CALLER(this, this.choiceCourse);
    },
    methods: {
      composeDfsFileOpenUrl: function (uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      courseCardClick(e){
        js_AppFlowPlayer_Modal_show_new(this, e);
      },
      goToCourseDetail(e){
          console.log(e)

        js_CourseDetailModal_show(this, e);
        //js_goToCourseDetail(this, e);
      },
    },
  }
</script>
<style scoped>
</style>
