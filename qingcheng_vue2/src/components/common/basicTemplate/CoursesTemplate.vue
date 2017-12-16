<template>
  <div>
    <div class="ui special cards" :class="coursesColumnNumber">
      <div v-for="(ec,ic) of courses" @click="courseCardClickToPlay(ec)" class="ui raised centered card"
           style="cursor:pointer;">
        <div class="blurring dimmable image">
          <div class="ui dimmer">
            <div class="content">
              <div class="center">
                <i class="inverted video play outline icon" :class="[c,playIconSize]"></i>
              </div>
            </div>
          </div>
          <img :src="composeDfsFileOpenUrl(ec.coursePosterUrl)"
               style="width: 100%;height: 100%;">
        </div>
        <div class="content" style="padding-bottom: 2%">
          <img v-if="ec.coursePosterUrl!=undefined" class="ui avatar  image"
               :src="composeDfsFileOpenUrl(photoUrl)">
          {{ec.courseName}}
        </div>
        <div class="extra content" style="padding-bottom: 2%">
          <div class="ui two  equal column grid">
            <!--收藏按钮-->
            <div class="five wide column">
              <FavoriteButton
                :e="ec"
                :c="c">
              </FavoriteButton>
            </div>
            <!--材料按钮-->
            <div class="five wide  column right floated">
              <MaterialButton
                :e="ec"
                :c="c">
              </MaterialButton>
            </div>

            <!--详情按钮-->
            <div v-if="showCourseDetail" class="five wide  column right floated">
              <!--课程详情-->
              <CourseDetailButtonV4Icon
                :e="ec"
                :c="c">
              </CourseDetailButtonV4Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {js_compose_dfs_file_open_url, js_compose_dfs_file_open_url_photo} from "../../../common/AppRestUrlConstants";
  import FavoriteButton from "../common/FavoriteButton.vue";
  import MaterialButton from "../common/MaterialButton.vue";
  import CourseDetailButtonV4Icon from "../common/CourseDetailButtonV4Icon.vue";
  import {js_AppFlowPlayer_Modal_show_new} from "../basicTemplate/modals/Flowplayer/FlowPlayerProCaller.js";
  import {js_service_sematicDriver4Dimmer} from "../../../common/services/SematicDriver/SematicDriver";
  export default {
    props: {
      courses: {required: true},
      coursesColumnNumber: {default: "three"},
      playIconSize: {default: "big"},
      photoUrl: {required: true},
      c: {default: App_Random_Color()},
      showCourseDetail:{default: true},
    },
    components: {
      "FavoriteButton": FavoriteButton,
      "MaterialButton": MaterialButton,
      "CourseDetailButtonV4Icon": CourseDetailButtonV4Icon,
    },
    data () {
      return {
        teacherShow: false,
        studentShow: false,
      }
    },
    created(){
      js_service_sematicDriver4Dimmer();
    },
    updated(){
      js_service_sematicDriver4Dimmer();
    },
    methods: {
      //播放
      courseCardClickToPlay(e){
        js_AppFlowPlayer_Modal_show_new(this, e);
      },
      //打开文件流
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
    }
  }
</script>

<style scoped>
</style>
