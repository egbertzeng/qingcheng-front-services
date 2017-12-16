<template>
  <div class="ui grid	centered">
    <div class="sixteen wide column">
      <div v-for="(e,i) in  currtentCourseMate" class="ui styled fluid accordion"
           style="margin-bottom: 2%; margin-top: 2%;">
        <StudentTemplate
          :student="e"
          :photoStyle="photoStyle"
          :titleMiniPhoto="true"
          :needUpdateSetStyle="false"
          :c="c">
        </StudentTemplate>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {App_Ajax_Get} from "../../../common/AppVueResourceApi";
  import {
    REST_URL_QINGCHENG_SQL_USER_GET_BY_COURSEID,
    js_compose_dfs_file_open_url_photo,
    js_compose_dfs_file_open_url
  } from "../../../common/AppRestUrlConstants";
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {js_CourseMate_Modal, js_CourseMate_Modal_hide} from "../basicTemplate/modals/CourseMate/CourseMateCaller";
  import StudentTemplate from "../basicTemplate/StudentTemplate.vue";
  import {APP_USER_RELATION_STUDENT_STUDENT} from "../../../common/AppSysConstants";
  import {js_serviec_sematicDriver4DropDwon} from "../../../common/services/SematicDriver/SematicDriver";
  import {js_service_getCourseMateByCourse} from "../../../common/services/CourseService";
  export default {
    props: {
      c: {default: App_Random_Color()},
      needUpdateSetStyle: {default: false},

    },
    components: {
      "StudentTemplate": StudentTemplate,
    },
    data () {
      return {
        currtentFocusCourse: "",
        currtentCourseMate: [],
        allCourseSortFlag: false,
        photoStyle: "rounded",
      }
    },
    watch: {
      '$store.state.currtentFocusCourse4Student': 'getCourseMate'
    },
    created(){
    },
    updated(){
      this.setStyle();
    },
    methods: {
      //获取收藏同款课程的同学
      getCourseMate(){
        let currtentFocusCourse = this.$store.state.currtentFocusCourse4Student;
        js_service_getCourseMateByCourse(this,currtentFocusCourse).then(function (data) {
          this.currtentCourseMate = data;
        });
      },
      //隐藏摸态框
      hideCourseMateModal(){
        js_CourseMate_Modal_hide();
      },
      composePhotoFileOpenUrl (e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
      setStyle(){
        if (this.needUpdateSetStyle) {
          js_serviec_sematicDriver4DropDwon();
        }
      },
    }
  }
</script>

<style scoped>
</style>
