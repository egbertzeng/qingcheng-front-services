<template>
  <div id="app" style="background-color:white ;">
    <!--<div class="ui container fluid" style="background-color: whitesmoke">-->
    <div class="ui container fluid" style="background-color: grey;padding-top:4%;padding:1%;padding-bottom: 1%;">
      <!--课程讲师，弹窗-->
      <CourseTeacher></CourseTeacher>
      <!--课程学友，弹窗-->
      <CourseMate></CourseMate>
      <!--学生详细信息-->
      <StudentDetail></StudentDetail>
      <!--课程详细信息-->
      <CourseDetail></CourseDetail>
      <!--参考材料，弹窗-->
      <CourseMaterial></CourseMaterial>
      <!--播放器,弹窗-->
      <FlowPlayerPro></FlowPlayerPro>
      <!--路由组件-->
      <router-view class="ui fluid container"
                   style="background-color: white;margin: 0px;padding: 0px;">
      </router-view>
    </div>
    <!--</div>-->
    <myfooter></myfooter>
  </div>
</template>
<script>
  import CourseMate from "./components/common/basicTemplate/modals/CourseMate/CourseMate.vue";
  import CourseMaterial from "./components/common/basicTemplate/modals/CourseMaterial/CourseMaterial.vue";
  import CourseTeacher from "./components/common/basicTemplate/modals/CourseTeacher/CourseTeacher";
  import  FlowPlayerPro from './components/common/basicTemplate/modals/Flowplayer/FlowPlayerPro.vue'
  import  StudentDetail from './components/common/basicTemplate/modals/StudentDetail/StudentDetail.vue'
  import  CourseDetail from './components/common/basicTemplate/modals/CourseDetail/CourseDetail.vue'
  import  Footer from './components/user/Index/Footer/Footer.vue'

  export default {
    components: {
      "myfooter": Footer,
      "CourseTeacher": CourseTeacher,
      "FlowPlayerPro": FlowPlayerPro,
      "CourseMate": CourseMate,
      "CourseMaterial": CourseMaterial,
      "StudentDetail": StudentDetail,
      "CourseDetail": CourseDetail,
    },
    name: 'app',
    methods: {}
  }
</script>

<style scoped>

</style>
