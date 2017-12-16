<template>
  <div class="ui container">
    <div class="ui grid	centered">
      <div class="sixteen wide column" style="margin-top: 3%; margin-bottom: 0%;">
        <div v-for="(e,i) in  studentOrder" class="ui styled fluid accordion"
             style="margin-bottom: 4%; margin-top: 4%;">
          <StudentTemplate
            :student="e"
            :c="mainColor"
            :photoStyle="photoStyle"
            :needUpdateSetStyle="false">
          </StudentTemplate>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {
    APP_CURRENT_USER_FAVORITE_STUDENT,
    APP_CURRENT_SESSION_EMAIL,
    APP_USER_RELATION_STUDENT_STUDENT
  } from "../../../../common/AppSysConstants";
  import {js_compose_dfs_file_open_url, js_compose_dfs_file_open_url_photo} from "../../../../common/AppRestUrlConstants";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import StudentTemplate from "../../../common/basicTemplate/StudentTemplate.vue";
  import {js_service_getPublishCourseByUser} from "../../../../common/services/CourseService";
  import {js_service_getStudentByFollowerNumber} from "../../../../common/services/StudentService";
  import {js_serviec_sematicDriver4DropDwon} from "../../../../common/services/SematicDriver/SematicDriver";
  export default {
    components: {
      "StudentTemplate": StudentTemplate,
    },
    data () {
      return {
        studentOrder: "",
        mainColor: App_Random_Color(),
        //photoStyle: "circular",
        photoStyle: "rounded",
      }
    },

    created(){
      js_serviec_sematicDriver4DropDwon();
      js_service_getStudentByFollowerNumber(this).then(function (data) {
        this.studentOrder = data;
      });
    },
    updated(){
      js_serviec_sematicDriver4DropDwon();
    },
    methods: {}
  }
</script>

<style scoped>
</style>
