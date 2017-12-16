<template>
  <div class="ui styled fluid accordion">
    <div @click="courseCommentClick()" class="title">
      <img v-if="e.coursePosterUrl!=undefined" class="ui avatar image"
           :src="composeDfsFileOpenUrl(e.coursePosterUrl)">
      {{e.courseName}}
      <i class="dropdown icon" :class="[c]"></i>课程评论
    </div>
    <div class="content">
      <div class="ui container">
        <CourseCommentTemplate
          v-for="comment in e.comments"
          :comment="comment"
          :c="c">
        </CourseCommentTemplate>
        <CourseCommentFormTemplate>

        </CourseCommentFormTemplate>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {js_compose_dfs_file_open_url} from "../../../../common/AppRestUrlConstants";
  import CourseCommentTemplate from "../../../common/basicTemplate/CourseCommentTemplate.vue";
  import CourseCommentFormTemplate from "../../../common/basicTemplate/CourseCommentFormTemplate.vue";
  import {js_service_getCourseCommentByCourseID} from "../../../../common/services/CourseCommentService";
  export default {
    props: {
      //课程
      e: {required: true},
      //颜色
      c: {required: true},
    },
    components: {
      "CourseCommentTemplate": CourseCommentTemplate,
      "CourseCommentFormTemplate": CourseCommentFormTemplate
    },
    data () {
      return {}
    },
    created(){

    },
    updated(){
    },
    methods: {
      /**
       * 点击事件，触发获取课程评论
       */
      courseCommentClick(){
        this.getCourseComments();
      },
      /**
       * 获取课程的评论信息
       */
      getCourseComments(){
        js_service_getCourseCommentByCourseID(this, this.e);
      },
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
    }
  }
</script>

<style scoped>
</style>
