<template>


  <div class="ui fluid card" style="padding: 4px;">
    <div class="ui relaxed divided list">


      <div v-for="(stu,i) in currtentCourseMate" class="item" @click="showStudentDetail(stu)" style="cursor: pointer;">


        <img class="ui avatar image middle aligned " :src="composePhotoFileOpenUrl(stu)">
        <span>{{stu.name}}</span>
        <span v-if="stu.gender">
          <i class="male icon" :class="[c]"></i>男
        </span>
        <span v-else="stu.gender">
          <i class="female icon" :class="[c]"></i>女
        </span>
        <!--<span>-->
         <!--<i class="announcement icon" :class="[c]"></i>{{stu.slogan}}-->
        <!--</span>-->

        <span class="right floated" style="padding-top: 1%">
          <FavoriteButton4User v-if="stu!=''"
            :e='stu'
            :c="c"
            :relationType="relationType">
          </FavoriteButton4User>
        </span>



      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {js_compose_dfs_file_open_url_photo} from "../../../common/AppRestUrlConstants";
  import {
    js_StudentDetail_Modal_Show
  } from "./modals/StudentDetail/StudentDetailCaller";
  import {APP_USER_RELATION_STUDENT_STUDENT} from "../../../common/AppSysConstants";

  import FavoriteButton4User from "../common/FavoriteButton4User.vue";
  export default {
    components: {
      "FavoriteButton4User": FavoriteButton4User,
    },
    props: {
      currtentCourseMate: {required: true},
      c: {default: App_Random_Color()},
    },
    data () {
      return {
        relationType: APP_USER_RELATION_STUDENT_STUDENT,
      }
    },
    created(){
    },
    updated(){
    },
    methods: {
      composePhotoFileOpenUrl (e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
      /**
       * 显示学生的详细信息
       * @param s
       */
      showStudentDetail(s){
        js_StudentDetail_Modal_Show(this, s)
      }
    }
  }
</script>

<style scoped>
</style>
