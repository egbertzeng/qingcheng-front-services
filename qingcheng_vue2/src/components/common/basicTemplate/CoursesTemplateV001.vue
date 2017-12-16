<template>
  <div class="ui three column grid">
    <div v-for="(ec,ic) of courses" @click="courseCardClickToPlay(ec)"
         class="column">
      <div style="cursor:pointer;" class="ui fluid  special card">
        <div class="image">
          <img :src="composeDfsFileOpenUrl(ec.coursePosterUrl)"
               style="width: 100%;height: 100%;">
        </div>
        <div class="content">
          <img v-if="ec.coursePosterUrl!=undefined" class="ui avatar  image"
          :src="composeDfsFileOpenUrl(photoUrl)">
          {{ec.courseName}}
          <br/>
          <br/>
          <MateTeacherFavoriteButtons
            :e=ec
            :teacherShow="teacherShow"
            :studentShow="studentShow"
            :c="c">
          </MateTeacherFavoriteButtons>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {js_compose_dfs_file_open_url, js_compose_dfs_file_open_url_photo} from "../../../common/AppRestUrlConstants";
  import MateTeacherFavoriteButtons from "../common/MateTeacherFavoriteButtons";
  import {FLOWPLAYER_CALLER_NEW} from "../Flowplayer/FlowPlayerProCaller.js";

  export default {
    props: {
      courses: {required: true},
      photoUrl: {required: true},
      c: {default: App_Random_Color()},
    },
    components: {
      "MateTeacherFavoriteButtons": MateTeacherFavoriteButtons,
    },
    data () {
      return {
        teacherShow: false,
        studentShow: false,
      }
    },
    created(){
        console.log(this.photoUrl)
    },
    updated(){
    },
    methods: {
      //播放
      courseCardClickToPlay(e){
        FLOWPLAYER_CALLER_NEW(this, e);
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
