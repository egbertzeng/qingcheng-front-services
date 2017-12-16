<template>
  <div class="ui card" style="cursor: pointer;">
    <div class="blurring dimmable image" @click="teacherCardClick(teacher)">
      <div class="ui dimmer">
        <div class="content">
          <div class="center">
            <i class="huge inverted find icon" :class="[c]"></i>
          </div>
        </div>
      </div>
      <img :src="composePhotoFileOpenUrl (teacher)">
    </div>
    <div class="content">
      <div class="header">
        <i v-if="teacher.gender" class="male icon" :class="[c]"></i>
        <i v-else="teacher.gender" class="female icon" :class="[c]"></i>
        昵称：{{teacher.name}}
      </div>
      <div class="meta" style="cursor: default;">
            <span v-if="teacher.gender">
              <i class="man icon" :class="[c]"></i>性别：男
            </span>
        <span v-else="teacher.gender">
              <i class="woman icon" :class="[c]"></i>性别：女
            </span>
        <FavoriteButton4User v-if="teacher!=''"
          :e='teacher'
          :c="c"
          :relationType="relationType">
        </FavoriteButton4User>
        <span>
              <i class="mail icon" :class="[c]"></i> 邮箱：{{teacher.email}}
            </span>
      </div>
      <div class="description">
        <i class="announcement icon" :class="[c]"></i> {{teacher.slogan}}
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {js_compose_dfs_file_open_url_photo} from "../../../common/AppRestUrlConstants";
  import FavoriteButton4User from "../common/FavoriteButton4User.vue";
  import {APP_USER_RELATION_STUDENT_TEACHER} from "../../../common/AppSysConstants";
  import {js_toFindeTeacher} from "../basicTemplate/modals/CourseTeacher/CourseTeacherCaller";

  export default {
    props: {
      teacher: {required: true},
      c: {default: App_Random_Color()},
    },
    components: {
      "FavoriteButton4User": FavoriteButton4User,
    },
    data () {
      return {
        relationType: APP_USER_RELATION_STUDENT_TEACHER,
      }
    },
    created(){
    },
    updated(){
    },
    methods: {
      //点击教师卡片
      teacherCardClick(e){
        js_toFindeTeacher(this, e);
      },
      composePhotoFileOpenUrl (e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
    }
  }
</script>

<style scoped>
</style>
