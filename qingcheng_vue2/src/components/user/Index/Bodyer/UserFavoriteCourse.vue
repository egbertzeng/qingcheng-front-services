<template>
  <div class="ui fluid container" style="margin-top:4%;padding-bottom: 0%">
    <Displayer
      :choiceCourse="choiceCourse"
      :choiceCourseIcon="choiceCourseIcon"
      :choiceCourseColor="choiceCourseColor"
      :needUpdateSetStyle="true"
      :choiceCourseDisplayerName="choiceCourseDisplayerName"
      :choiceCourseLabelText="choiceCourseLabelText">
    </Displayer>
  </div>
</template>
<script type="text/javascript">
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import Displayer from "../../../common/Displayer/Displayer.vue"
  import {APP_CURRENT_USER_FAVORITE_COURSE} from "../../../../common/AppSysConstants";
  import {App_Displayer_Name_TV001, App_Displayer_Name_CV001} from "../../../common/Displayer/Displayer";
  import {js_serviec_sematicDriver4DropDwon} from "../../../../common/services/SematicDriver/SematicDriver";
  import {js_common_service_updateCurrentLoginUserFavoriteCourse} from "../../../../common/services/loginUser/CurrentLoginUserService";

  export default {
    components: {
      "Displayer": Displayer,
    },
    data () {
      return {
        choiceCourseDisplayerName: App_Displayer_Name_CV001,
        //choiceCourseDisplayerName: App_Displayer_Name_TV001,
        choiceCourse: "",
        choiceCourseIcon: "heart",
        choiceCourseLabelText: "您收藏的课程如下...",
        choiceCourseColor: App_Random_Color(),
      }
    },
    created(){
      //创建组件时，获取数据
      this.fetchFavoriteCourse();
    },
    updated(){
      //创建组件时，获取数据
      //this.fetchFavoriteCourse();
    },
    watch: {},
    methods: {
      fetchFavoriteCourse(){
        js_common_service_updateCurrentLoginUserFavoriteCourse(this).then(function (data) {
          this.choiceCourse = data;
        });
      },
    }
  }
</script>
<style scoped>
</style>

