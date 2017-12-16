<template>
  <div class="ui styled fluid accordion">
    <div @click="courseMaterClick()" class="title">
      <img v-if="e.coursePosterUrl!=undefined" class="ui avatar image"
           :src="composeDfsFileOpenUrl(e.coursePosterUrl)">
      {{e.courseName}}
      <i class="dropdown icon" :class="[c]"></i>课程粉丝
    </div>
    <div class="content">
      <CourseMateContentTemplate
        :c="c">
      </CourseMateContentTemplate>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {js_compose_dfs_file_open_url} from "../../../../common/AppRestUrlConstants";
  import CourseMateContentTemplate from "../../basicTemplate/CourseMateContentTemplate.vue";
  import {js_toFindeCourseTeacher_flat} from "../../basicTemplate/modals/CourseTeacher/CourseTeacherCaller";
  import {js_toFindCourseMate} from "../../basicTemplate/modals/CourseMate/CourseMateCaller";
  import {js_serviec_sematicDriver4DropDwon} from "../../../../common/services/SematicDriver/SematicDriver";

  export default {
    components: {
      "CourseMateContentTemplate": CourseMateContentTemplate,
    },
    props: {
      //课程
      e: {required: true},
      //颜色
      c: {required: true},
    },
    data () {
      return {}
    },
    created(){
    },
    updated(){
      js_serviec_sematicDriver4DropDwon();
    },
    methods: {
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      courseMaterClick(){
        js_toFindCourseMate(this, this.e, false);
      },

    }
  }
</script>

<style scoped>
</style>
