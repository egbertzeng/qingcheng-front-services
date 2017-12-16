<template>
  <div class="ui fluid container">
    <!--CardDisplayer,用于显示卡片布局-->
    <CourseCardDisplayerV001
      v-if="choiceCourseDisplayerName==cv001"
      :choiceCourse="choiceCourse"
      :choiceCourseLabelText="choiceCourseLabelText"
      :choiceCourseColor="choiceCourseColor"
      :choiceCourseColumnNum="choiceCourseColumnNum"
      :choiceCourseIcon="choiceCourseIcon"
      :choiceCourseIconSize="choiceCourseIconSize"
      :choiceCourseLabelSize="choiceCourseLabelSize"
      :choiceCourseShowSubTitle="choiceCourseShowSubTitle"
      :choiceCourseShowDescription="choiceCourseShowDescription"
      :choiceCourseShowButtons="choiceCourseShowButtons"
      :choiceCourseShowCornerLabel="choiceCourseShowCornerLabel"
      :choiceCourseShowPlayTimes="choiceCourseShowPlayTimes"
      :choiceCourseShowRecommendValue="choiceCourseShowRecommendValue"
      :needUpdateSetStyle="needUpdateSetStyle">
    </CourseCardDisplayerV001>
    <!--TableDisplayer，用于显示表格布局-->
    <CourseTableDisplayerV001
      v-if="choiceCourseDisplayerName==tv001"
      :choiceCourse="choiceCourse"
      :choiceCourseLabelText="choiceCourseLabelText"
      :choiceCourseColor="choiceCourseColor"
      :choiceCourseColumnNum="choiceCourseColumnNum"
      :choiceCourseIcon="choiceCourseIcon"
      :choiceCourseIconSize="choiceCourseIconSize"
      :choiceCourseLabelSize="choiceCourseLabelSize"
      :choiceCourseShowSubTitle="choiceCourseShowSubTitle"
      :choiceCourseShowDescription="choiceCourseShowDescription"
      :choiceCourseShowButtons="choiceCourseShowButtons"
      :choiceCourseShowCornerLabel="choiceCourseShowCornerLabel"
      :choiceCourseShowPlayTimes="choiceCourseShowPlayTimes"
      :choiceCourseShowRecommendValue="choiceCourseShowRecommendValue"
      :needUpdateSetStyle="needUpdateSetStyle">
    </CourseTableDisplayerV001>
  </div>
</template>
<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import CourseCardDisplayerV001 from "./CourseCardDisplayerV001/CourseCardDisplayerV001";
  import CourseTableDisplayerV001 from "./CourseTableDisplayerV001/CourseTableDisplayerV001";
  import {App_Displayer_Name_CV001, App_Displayer_Name_TV001, App_Displayer_Name_TV002} from "./Displayer";

  export default {
    components: {
      "CourseCardDisplayerV001": CourseCardDisplayerV001,
      "CourseTableDisplayerV001": CourseTableDisplayerV001,
    },
    data () {
      return {
        cv001: App_Displayer_Name_CV001,
        tv001: App_Displayer_Name_TV001,
        tv002: App_Displayer_Name_TV002,
      }
    },
    props: {
      //要显示的课程
      choiceCourse: {required: true},
      //课程的标题
      choiceCourseLabelText: {required: true},
      //主icon
      choiceCourseIcon: {required: true},
      //主颜色
      choiceCourseColor: {default: App_Random_Color()},
      //默认显示模板
      choiceCourseDisplayerName: {default: App_Displayer_Name_CV001},
      //每行显示多少列
      choiceCourseColumnNum: {default: "three"},
      //icon大小
      choiceCourseIconSize: {default: "large"},
      //头部的标签大小
      choiceCourseLabelSize: {default: "large"},
      //显示子标题
      choiceCourseShowSubTitle: {default: true},
      //显示描述
      choiceCourseShowDescription: {default: true},
      //显示按钮
      choiceCourseShowButtons: {default: true},
      //显示右上角的标签
      choiceCourseShowCornerLabel: {default: true},
      //显示播放量
      choiceCourseShowPlayTimes: {default: true},
      //显示推荐值
      choiceCourseShowRecommendValue: {default: true},
      //控制是否启用折叠效果
      needUpdateSetStyle: {default: false},
    },
    created(){
    },
    updated(){

    },
    methods: {}
  }
</script>

<style scoped>
</style>
