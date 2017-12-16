<template>
  <div class="column">
    <span style="cursor: pointer" v-if="e.courseIsInFavorite" @click.stop.prevent="cancleFavoriteCourse()">

      <i class="like icon" :class="[c]"></i>取消
    </span>
    <span style="cursor: pointer" v-if="!e.courseIsInFavorite" @click.stop.prevent="favoriteCourse()">
        <i class="like  icon"></i>收藏
    </span>
  </div>

</template>

<script type="text/javascript">
  import {APP_CURRENT_USER_FAVORITE_COURSE} from "../../../common/AppSysConstants";
  import {js_setCourseFavoriteStyle} from "./SetFavoriteButtonStyle.js";
  import {
    js_common_service_updateCurrentLoginUserFavoriteCourse,
    js_service_updateCurrentLoginUserFavoriteCourseToDB
  } from "../../../common/services/loginUser/CurrentLoginUserService";
  export default {
    props: {
      e: {required: true},
      c: {required: true},
      w: {default: ""},
    },
    data () {
      return {}
    },
    created(){
      this.setCourseFavoriteStyle();
    },
    updated(){

    },
    watch: {},
    methods: {
      //取消
      cancleFavoriteCourse(){
        this.addOrRemoveUserFavoriteCourse(false);
      },
      //收藏
      favoriteCourse(){
        this.addOrRemoveUserFavoriteCourse(true);
      },
      //添加或移除的公用方法
      addOrRemoveUserFavoriteCourse(f){
        //1.更改收藏
        js_service_updateCurrentLoginUserFavoriteCourseToDB(this, this.e, f).then(function (res) {
          if (res.status == 200) {
            this.setCourseFavoriteStyle();
            //2.更改状态
            this.getFavoriteCourse();
          }
        });
      },
      //更新用户收藏的课程信息，并过滤课程状态
      getFavoriteCourse(){
        js_common_service_updateCurrentLoginUserFavoriteCourse(this).then(function () {
          this.setCourseFavoriteStyle();
        });
      },
      //过滤课程的状态
      setCourseFavoriteStyle(){
        js_setCourseFavoriteStyle(this.e);
      },
    }
  }
</script>

<style scoped>
</style>
