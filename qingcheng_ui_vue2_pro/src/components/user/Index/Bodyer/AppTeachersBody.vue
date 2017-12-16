<template>
  <div class="ui fluid container" style="padding-top:4%;padding-bottom: 0%">
    <div class="ui fluid container">
      <div class="ui fluid container">
        <div class="ui fluid container">
          <div class="ui fluid container">
            <a style="margin-left: 1%" class="ui ribbon label" :class="[mainColor]">
              <i class=" large icon" :class="[mainIcon]"></i>{{labelText}}
            </a>
            <div class="ui special raised link cards " :class="[columnNum]"
                 style="border-top: 2px dashed;font-size: small;"
                 :style="[{color:mainColor}]">
              <NoserachResult></NoserachResult>
              <div v-for="(e,i) in favoriteTeachers" class="card">
                <div class="blurring dimmable image" @click="teacherCardClick(e)">
                  <div class="ui dimmer">
                    <div class="content">
                      <div class="center">
                        <i class="huge inverted find icon" :class="[mainColor]"></i>
                      </div>
                    </div>
                  </div>
                  <img :src="composeDfsFileOpenUrl(e)">
                </div>
                <div class="content">
                  <div class="header">
                    <i v-if="e.gender" class="large male icon" :class="[mainColor]"></i>
                    <i v-else="e.gender" class="large female icon" :class="[mainColor]"></i>
                    昵称：{{e.name}}
                  </div>

                  <div class="meta" style="cursor: default;">

            <span v-if="e.gender">
              <i class="man icon" :class="[mainColor]"></i>性别：男
            </span>
                    <span v-else="e.gender">
              <i class="woman icon" :class="[mainColor]"></i>性别：女
            </span>
                    <FavoriteButton4User
                      :e='e'
                      :c="mainColor"
                      :relationType="relationType">
                    </FavoriteButton4User>
                    <span>
              <i class="mail icon" :class="[mainColor]"></i> 邮箱：{{e.email}}
            </span>
                  </div>
                  <div class="description">
                    <i class="announcement icon" :class="[mainColor]"></i> {{e.slogan}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {App_Ajax_Get} from "../../../../common/AppVueResourceApi";
  import {
    js_compose_dfs_file_open_url,
    js_compose_dfs_file_open_url_photo, REST_URL_QINGCHENG_GET_ALL_ACTIVE_TEACHER
  } from "../../../../common/AppRestUrlConstants";
  import {
    APP_CURRENT_SESSION_EMAIL,
    APP_CURRENT_USER_FAVORITE_TEACHER,
    APP_USER_RELATION_STUDENT_TEACHER
  } from "../../../../common/AppSysConstants";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import  NoserachResult from '../../../common/NosearchResult/NoserachResult.vue'
  import {js_toFindeTeacher} from "../../../common/basicTemplate/modals/CourseTeacher/CourseTeacherCaller";
  import {NO_SEARCH_RESULT_CALLER} from "../../../common/NosearchResult/NoserachResultCaller";
  import FavoriteButton4User from "../../../common/common/FavoriteButton4User.vue";
  import {js_service_sematicDriver4Dimmer} from "../../../../common/services/SematicDriver/SematicDriver";

  export default {
    components: {
      "NoserachResult": NoserachResult,
      "FavoriteButton4User": FavoriteButton4User,
    },
    data () {
      return {
        labelText: "您所关注的教师如下：",
        columnNum: 'four',
        mainColor: App_Random_Color(),
        mainIcon: "",
        favoriteTeachers: [],
        relationType: APP_USER_RELATION_STUDENT_TEACHER,
      }
    },
    created(){
      this.getFavoriteTeacher();
      js_service_sematicDriver4Dimmer();
    },
    updated(){
      js_service_sematicDriver4Dimmer();

    },
    watch: {},
    methods: {
      //获取老师信息总入口
      getTeacher(){
        if (this.$store.state.isAllTeacher) {
          this.mainIcon = "doctor";
          //全部教师
          this.getAllActiveTeacher();
        } else {
          this.mainIcon = "spy";
          //喜爱教师
          this.getFavoriteTeacher()
        }
      },
      //获取所有已经激活状态的老师
      getAllActiveTeacher(){
        let url = REST_URL_QINGCHENG_GET_ALL_ACTIVE_TEACHER;
        let params = {};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.favoriteTeachers = data;
          NO_SEARCH_RESULT_CALLER(this, this.favoriteTeachers);
        });

      },
      //获取用户喜爱的老师
      getFavoriteTeacher(){
        this.favoriteTeachers = JSON.parse(window.sessionStorage.getItem(APP_CURRENT_USER_FAVORITE_TEACHER));
        NO_SEARCH_RESULT_CALLER(this, this.favoriteTeachers);
      },
      //点击教师卡片
      teacherCardClick(e){
        js_toFindeTeacher(this, e);
      },
      composeDfsFileOpenUrl: function (e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
    }
  }
</script>

<style scoped>
</style>
