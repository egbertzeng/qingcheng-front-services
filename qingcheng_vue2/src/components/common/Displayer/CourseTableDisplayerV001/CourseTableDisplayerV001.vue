<template>

  <div class="ui  fluid container" style="margin-top: 1%;">
    <div style="margin-left: 1%" class="ui ribbon label" :class="[choiceCourseLabelSize,choiceCourseColor]">
      <i class="icon" :class="[choiceCourseIcon,choiceCourseIconSize]"></i>{{choiceCourseLabelText}}
    </div>
    <div class="ui container fluid " :class="[choiceCourseColor]"
         style="border-top: 2px dashed;font-size: small;margin-bottom: 0px;" :style="[{color:choiceCourseColor}]">
    </div>
    <!--没有结果提示区域-->
    <NoserachResult></NoserachResult>
    <table v-if="choiceCourse.length>0" v-for="(e,i) of choiceCourse" class="ui  compact table"
           style="margin-top: 1%;margin-bottom: 5%;">
      <tbody>
      <tr>
        <td>
          <div class="ui grid	centered">
            <div class="seven wide column centered " @click.stop.prevent="courseCardClick(e)">
              <div style="cursor: pointer;" class="centered ">
                <div class="blurring dimmable image">
                  <div class="ui dimmer">
                    <div class="content">
                      <div class="center">
                        <i class="huge inverted video play outline icon" :class="[choiceCourseColor]"></i>
                      </div>
                    </div>
                  </div>
                  <a v-if="choiceCourseShowCornerLabel" class="ui right corner mini label"
                     :class="[choiceCourseColor]">
                    <i class="icon" :class="[choiceCourseIcon]"></i>
                  </a>
                  <img class="ui rounded image" :src="composeDfsFileOpenUrl(e.coursePosterUrl)"
                       style="height: 100%;width: 100%;">
                </div>
              </div>
            </div>
            <div class="nine wide column" style="padding-left: 0px;">
              <!--课程信息-->
              <div class="ui one column grid" style="margin-left: 2%;margin-top: 1%;">
                <div class="column">
                  <i class="film icon" :class="[choiceCourseColor]"></i>标题: {{e.courseName}}
                </div>
                <div class="column">
                  <i class="idea icon" :class="[choiceCourseColor]"></i>子标题:{{e.courseSubName}}
                </div>
                <div class="column">
                  <i class="browser icon" :class="[choiceCourseColor]"></i>描述：{{e.courseDescription}}
                </div>
                <div class="column">
                  <div class="ui three column grid">
                    <div class="column">
                          <span v-if="choiceCourseShowRecommendValue" class="left floated"><i
                            class="ui play circle outline icon" :class="[choiceCourseColor]"></i>
                        播放量:{{e.coursePlayTimes}}
                        </span>
                    </div>
                    <div class="column">
                         <span v-if="choiceCourseShowRecommendValue" class="right floated">
                       <i class="ui star icon right floated" :class="[choiceCourseColor]"></i>
                        推荐值:{{e.courseRecommendStart}}
                    </span>
                    </div>
                    <div v-if="e.courseFollowerNumber!=null" class="column">
                         <span class="right floated">
                        <span :style="{color:choiceCourseColor}">
                          <i class="ui thumbs outline up icon right floated" :class="[choiceCourseColor]"></i>
                          粉丝量:{{e.courseFollowerNumber}}
                        </span>
                    </span>
                    </div>
                  </div>
                </div>
                <div style="cursor: pointer;" class="column">
                  <div class="ui two column grid">
                    <!--课程按钮三套件-->
                    <FavoriteButton
                      :e="e"
                      :c="choiceCourseColor">
                    </FavoriteButton>
                    <!--课程详情-->
                    <CourseDetailButtonV4Button
                      :e="e"
                      :c="choiceCourseColor">
                    </CourseDetailButtonV4Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ui grid	centered" style="margin-top: 0px;">
            <div class="sixteen wide column centered">
              <!--课程材料-->
              <CoursePdfDisplayerV001
                v-if="e.materialDirName!=''"
                :e="e"
                :c="choiceCourseColor">
              </CoursePdfDisplayerV001>
              <!--课程讲师-->
              <CourseTeacherDisplayerV001
                :e="e"
                :c="choiceCourseColor">
              </CourseTeacherDisplayerV001>
              <!--课程粉丝-->
              <CourseMaterDisplayerV001
                :e="e"
                :c="choiceCourseColor">
              </CourseMaterDisplayerV001>
              <!--课程评论-->
              <CourseCommentDisplayerV001
                :e="e"
                :c="choiceCourseColor">
              </CourseCommentDisplayerV001>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/javascript">
  import {js_compose_dfs_file_open_url,} from "../../../../common/AppRestUrlConstants";
  import  NoserachResult from '../../NosearchResult/NoserachResult.vue'
  import {NO_SEARCH_RESULT_CALLER} from "../../NosearchResult/NoserachResultCaller";
  import {js_AppFlowPlayer_Modal_show_new} from "../../basicTemplate/modals/Flowplayer/FlowPlayerProCaller";
  import FavoriteButton from "../../../common/common/FavoriteButton.vue";
  import CourseDetailButtonV4Button from "../../../common/common/CourseDetailButtonV4Button.vue";
  import CourseMaterDisplayerV001 from "../CourseTableDispalyerCommon/CourseMaterDisplayerV001.vue";
  import CourseTeacherDisplayerV001 from "../CourseTableDispalyerCommon/CourseTeacherDisplayerV001.vue";
  import CoursePdfDisplayerV001 from "../CourseTableDispalyerCommon/CoursePdfDisplayerV001.vue";
  import CourseCommentDisplayerV001 from "../CourseTableDispalyerCommon/CourseCommentDisplayerV001.vue";
  import {App_Displayer_Props} from "../Displayer";
  import {js_serviec_sematicDriver4DropDwon} from "../../../../common/services/SematicDriver/SematicDriver";
  export default {
    components: {
      "NoserachResult": NoserachResult,
      "FavoriteButton": FavoriteButton,
      "CourseDetailButtonV4Button": CourseDetailButtonV4Button,
      "CourseMaterDisplayerV001": CourseMaterDisplayerV001,
      "CourseTeacherDisplayerV001": CourseTeacherDisplayerV001,
      "CoursePdfDisplayerV001": CoursePdfDisplayerV001,
      "CourseCommentDisplayerV001": CourseCommentDisplayerV001,

    },
    props: App_Displayer_Props,
    data () {
      return {}
    },
    beforeCreate(){

    },

    created(){
    },
    updated(){
      //设置是否显示搜索没有结果的提示信息
      NO_SEARCH_RESULT_CALLER(this, this.choiceCourse);
      js_serviec_sematicDriver4DropDwon()
    },
    methods: {
      composeDfsFileOpenUrl: function (uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      courseCardClick(e){
        js_AppFlowPlayer_Modal_show_new(this, e);
      },
    },
  }
</script>

<style scoped>
</style>
