<template>
  <div class="column">
    <span v-if="e!=''&&!e.userIsInFavorite" style="cursor: pointer" @click.stop.prevent="favoriteUser(e)">
         <i class="like  icon"></i>关注{{roleName}}
    </span>
    <span v-if="e!=''&&e.userIsInFavorite" style="cursor: pointer" @click.stop.prevent="cancleFavoriteUser(e)">
      <i class="like icon" :class="[c]"></i>取消关注
    </span>
  </div>
</template>

<script type="text/javascript">
  import {
    APP_CURRENT_USER_FAVORITE_COURSE, APP_USER_RELATION_STUDENT_TEACHER, APP_USER_RELATION_STATUS_OK,
    APP_CURRENT_SESSION_EMAIL, APP_USER_RELATION_STUDENT_STUDENT, APP_USER_RELATION_STATUS_CANCLE
  } from "../../../common/AppSysConstants";
  import {
    _api_getFavoriteUser, _api_updateFavoriteUser, _api_getRelationType, _api_getKeyByRelationType,
    _api_getRoleByRelationType
  } from "../../../common/AppRestApi";
  import {js_setUserFavoriteStyle} from "./SetFavoriteUserButtonStyle";

  export default {
    props: {
      e: {required: true},
      c: {required: true},
      relationType: {required: true},
    },
    data () {
      return {
        roleName: "",
      }
    },
    created(){
      this.setFavoriteUserStyle();
    },
    updated(){
    },
    watch: {
    },
    methods: {
      //过滤当前用户的状态
      setFavoriteUserStyle(){
        if (this.relationType == APP_USER_RELATION_STUDENT_STUDENT) {
          this.roleName = "同学";
        } else if (this.relationType == APP_USER_RELATION_STUDENT_TEACHER) {
          this.roleName = "老师";
        }
        js_setUserFavoriteStyle(this.e);
      },
      //取消
      cancleFavoriteUser(e){
        this.favoriteOrCancelUser(e, false);
      },
      //收藏
      favoriteUser(e){
        this.favoriteOrCancelUser(e, true);
      },
      //收藏
      favoriteOrCancelUser(e, doFavorite){
        this.setFavoriteUserStyle();
        //f,表示是否是添加收藏
        //设置关系状态
        let status = APP_USER_RELATION_STATUS_CANCLE;
        if (doFavorite) {
          status = APP_USER_RELATION_STATUS_OK;
        }
        //设置参数
        let params = {
          fromEmail: window.sessionStorage.getItem(APP_CURRENT_SESSION_EMAIL),
          toEmail: e.email,
          relationType: this.relationType,
          relationStatus: status,
        };
        //1.更新用户关系表
        _api_updateFavoriteUser(this, params).then(function (res) {
          if (res.status == 200) {
            //2.更新前端存储
            _api_getFavoriteUser(this, _api_getRoleByRelationType(params.relationType), params.relationType).then(function (data) {
              //判断关系类型
              window.sessionStorage.setItem(_api_getKeyByRelationType(params.relationType), JSON.stringify(data));
              this.setFavoriteUserStyle();
            });
          }
        });
      },

    }
  }
</script>

<style scoped>
</style>
