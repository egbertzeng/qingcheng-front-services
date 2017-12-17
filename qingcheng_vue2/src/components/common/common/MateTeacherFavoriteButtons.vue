<template>
  <div class="ui four column  grid" style="cursor: pointer">
    <div v-if="studentShow" class="column"
         @click.stop.prevent="toFindCourseMate(e)">
      <i class="user icon" :class="[c]"></i>粉丝
    </div>
    <div v-if="teacherShow" class="column"
         @click.stop.prevent="toFindeCourseTeacher(e)">
      <i class="spy icon" :class="[c]"></i>老师
    </div>
    <MaterialButton :e="e" :c="c"></MaterialButton>
    <FavoriteButton v-if="heartShow" :e="e" :c="c"></FavoriteButton>
  </div>
</template>

<script type="text/javascript">
  import {js_toFindeCourseTeacher} from "../basicTemplate/modals/CourseTeacher/CourseTeacherCaller";
  import {js_toFindCourseMate} from "../basicTemplate/modals/CourseMate/CourseMateCaller";
  import FavoriteButton from "./FavoriteButton";
  import MaterialButton from "./MaterialButton";
  import {js_toFindCourseMaterial} from "../basicTemplate/modals/CourseMaterial/CourseMaterialCaller";
  export default {
    components: {
      "FavoriteButton": FavoriteButton,
      "MaterialButton": MaterialButton,
    },
    props: {
      e: {required: true},
      c: {required: true},
      teacherShow: {default: true},
      studentShow: {default: true},
      heartShow: {default: true},
    },

    data () {
      return {}
    },
    created(){
    },
    updated(){
    },
    methods: {
      //查看授课教师
      toFindeCourseTeacher(e){
        js_toFindeCourseTeacher(this, e);
      },
      //查看同样关注此课程的同学
      toFindCourseMate(e){
        js_toFindCourseMate(this, e, true);
      },
    }
  }
</script>

<style scoped>
</style>
