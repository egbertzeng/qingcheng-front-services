<template>
  <div class="ui fluid container" style="margin-top: 6%; margin-bottom: 0% ">
    <div v-for="(e,i) in teacherOrder" class="ui fliud container" style="margin-bottom: 5%;">
      <div class="ui styled fluid accordion">
        <div class="active content" style="padding-bottom: 0%;">
          <TeacherTemplate
            :teacher="e"
            :photoStyle="photoStyle"
            :titleMiniPhoto="true"
            :needUpdateSetStyle="true"
            :c="mainColor">
          </TeacherTemplate>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import TeacherTemplate from "../../../common/basicTemplate/TeacherTemplate.vue";

  import {APP_USER_RELATION_STUDENT_TEACHER} from "../../../../common/AppSysConstants";
  import {js_service_getTeachersByFollowerNumber, js_service_getTeacherBypublishCourse} from "../../../../common/services/TeacherService";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import {js_serviec_sematicDriver4DropDwon} from "../../../../common/services/SematicDriver/SematicDriver";
  export default {
    components: {
      "TeacherTemplate": TeacherTemplate,
    },
    data () {
      return {
        photoStyle: "circular",
        //        photoStyle: "rounded",
        relationType: APP_USER_RELATION_STUDENT_TEACHER,
        teacherOrder: [],
        mainColor: App_Random_Color(),
      }
    },
    created(){
      js_serviec_sematicDriver4DropDwon();
      js_service_getTeacherBypublishCourse(this).then(function (data) {
        this.teacherOrder = data;
      });
    },
    updated(){

    },
    methods: {}
  }
</script>

<style scoped>
</style>
