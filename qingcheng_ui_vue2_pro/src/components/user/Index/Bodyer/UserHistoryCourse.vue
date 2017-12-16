<template>
  <div class="ui fluid container" style="margin-top:4%;padding-bottom: 6%">
    <Displayer
      :choiceCourse="choiceCourse"
      :choiceCourseIcon="choiceCourseIcon"
      :choiceCourseDisplayerName="choiceCourseDisplayerName"
      :choiceCourseLabelText="choiceCourseLabelText">
    </Displayer>
  </div>
</template>
<script type="text/javascript">
  import {
    REST_URL_QINGCHENG_SQL_COURSE_GET_BY_EMAIL,
    js_compose_dfs_file_open_url
  } from "../../../../common/AppRestUrlConstants";
  import {APP_CURRENT_SESSION_EMAIL} from "../../../../common/AppSysConstants";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import {App_Ajax_Get} from "../../../../common/AppVueResourceApi";
  import Displayer from "../../../common/Displayer/Displayer.vue"
  import {App_Displayer_Name_TV001} from "../../../common/Displayer/Displayer.js"
  export default {
    components: {
      "Displayer": Displayer,
    },
    data () {
      return {
        choiceCourse: [],
        choiceCourseIcon: "history",
        choiceCourseLabelText: "",
        choiceCourseDisplayerName: App_Displayer_Name_TV001,
      }
    },
    created(){
      this.getCourseByEmail();
    },
    methods: {
      //根据输入框获取course信息
      getCourseByEmail() {
        //重新生成颜色
        this.choiceCourseColor = App_Random_Color();
        this.choiceCourseLabelText = "您学习课程留下的历史记录如下...";
        let url = REST_URL_QINGCHENG_SQL_COURSE_GET_BY_EMAIL;
        let params = {email: window.sessionStorage.getItem(APP_CURRENT_SESSION_EMAIL), favorite: false};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.choiceCourse = data;
        });
      },
    }
  }
</script>
<style scoped>
</style>
