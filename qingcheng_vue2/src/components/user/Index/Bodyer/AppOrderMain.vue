<template>
  <div class="ui grid">
    <div class="one wide column">
      <div class="ui  inverted right fixed vertical large menu"
           style=" margin-top: 0%;z-index: 1;width: 40px; font-size: 12%;">
        <a class="item"></a>
        <a class="item"></a>

        <a class="item " :class="[activeStyle[0]]" @click="appCourseFollowerNumberClick()">
          <i class="star icon" :class="[otherCategoryIconSize,courseFollowerNumberOrderIconColor]"></i>
          <br/>
          名课榜
        </a>
        <a class="item" :class="[activeStyle[1]]" @click="appTeacherFollowerNumberClick()">
          <i class="star icon" :class="[otherCategoryIconSize,teacherFollowerNumberOrderIconColor]"></i>
          <br/>
          名师榜
        </a>
        <a class="item" :class="[activeStyle[2]]" @click="appStudentFollowerNumberClick()">
          <i class="star icon" :class="[otherCategoryIconSize,studentFollowerNumberOrderIconColor]"></i>
          <br/>
          达人榜
        </a>
        <a class="item " :class="[activeStyle[3]]" @click="appTeacherPublishCourseNumberClick()">
          <i class="star icon" :class="[otherCategoryIconSize,teacherPublishCourseNumberOrderIconColor]"></i>
          <br/>
          授课榜
        </a>
        <a class="item " :class="[activeStyle[4]]" @click="appCourseFollowCourseNumberClick()">
          <i class="star icon" :class="[otherCategoryIconSize, studentFollowerCourseNumberOrderIconColor]"></i>
          <br/>
          藏课榜
        </a>
        <a class="item disable"></a>
      </div>
    </div>
    <div class="fifteen wide column" style="margin-left:-5%;margin-top:1%; margin-right:2%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
  import routerUrl from "../../../../common/FrontRouterConstants";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  export default {
    data () {
      return {
        otherCategoryIconSize: 'large',
        courseFollowerNumberOrderIconColor: App_Random_Color(),
        teacherFollowerNumberOrderIconColor: App_Random_Color(),
        studentFollowerNumberOrderIconColor: App_Random_Color(),
        studentFollowerCourseNumberOrderIconColor: App_Random_Color(),
        teacherPublishCourseNumberOrderIconColor: App_Random_Color(),
        test: "appTeacherFollowerNumberClick()",
        activeStyle: ["active", "", "", ""],
      }
    },
    created(){

    },
    updated(){
      $('.ui.sticky')
        .sticky()
      ;
    },
    methods: {
      //课程粉丝排行榜
      appCourseFollowerNumberClick(){
        this.reSetActiveStyle();
        this.activeStyle[0] = "active";
        this.$router.push({path: routerUrl.path.CourseFollowerNumberOrder});
      },
      //老师粉丝排行榜
      appTeacherFollowerNumberClick(){
        this.reSetActiveStyle();
        this.activeStyle[1] = "active";
        this.$router.push({path: routerUrl.path.TeacherFollowerNuberOrder});
      },
      //学生粉丝排行榜
      appStudentFollowerNumberClick(){
        this.reSetActiveStyle();
        this.activeStyle[2] = "active";
        this.$router.push({path: routerUrl.path.StudentFollowerNuberOrder});
      },


      //老师在课程发布量上的排行榜
      appTeacherPublishCourseNumberClick(){
        this.reSetActiveStyle();
        this.activeStyle[3] = "active";
        this.$router.push({path: routerUrl.path.TeacherCoursePublishNuberOrder});
      },

      //学生在课程关注量上的排行榜
      appCourseFollowCourseNumberClick(){
        this.reSetActiveStyle();
        this.activeStyle[4] = "active";
        this.$router.push({path: routerUrl.path.StudentCourseFollowNuberOrder});
      },


      //设置样式
      reSetActiveStyle(){
        for (let i = 0; i < this.activeStyle.length; i++) {
          this.activeStyle[i] = "";
        }
      },
    }
  }
</script>

<style scoped>
  /*.ui.fixed.sticky + p {*/
  /*margin-top: 160px;*/
  /*}*/
</style>
