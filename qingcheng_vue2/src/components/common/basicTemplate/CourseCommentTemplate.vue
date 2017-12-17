<template>

  <!--<div class="ui comments">-->
  <!--<div class="comment">-->
  <!--<a class="avatar">-->
  <!--<img v-if="(commentUser!={})" class="ui avatar image"-->
  <!--:src="composePhotoFileOpenUrl(commentUser)">-->
  <!--</a>-->
  <!--<div class="content">-->
  <!--<a class="author">-->
  <!--<i v-if="commentUser.gender" class="ui male icon":class="[c]"></i>-->
  <!--<i v-else="commentUser.gender" class="ui female icon":class="[c]"></i>-->
  <!--{{commentUser.name}}-->
  <!--</a>-->
  <!--<div class="metadata">-->
  <!--<div class="date">2 days ago</div>-->
  <!--<div class="rating"><i class="star icon"></i> 5 Faves </div>-->
  <!--</div>-->
  <!--<div class="text">-->
  <!--<i class="ui comment outline icon":class="[c]"></i>-->
  <!--{{comment.commentContent}}-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->


  <div class="ui comments">
    <div class="comment">
      <a class="avatar" style="cursor: pointer;" @click="getUseDetailInfo()">
        <img v-if="(commentUser!={})" class="ui avatar image"
             :src="composePhotoFileOpenUrl(commentUser)">
      </a>
      <div class="content">
        <a class="author" @click="getUseDetailInfo()">
          <i v-if="commentUser.gender" class="ui male icon" :class="[c]"></i>
          <i v-else="commentUser.gender" class="ui female icon" :class="[c]"></i>
          {{commentUser.name}}
        </a>
        <div class="text">
          <i class="ui comment outline icon" :class="[c]"></i>
          {{comment.commentContent}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {js_service_getUserInfoByEmail, js_service_openUserDetailModal} from "../../../common/services/UserService";
  import {js_compose_dfs_file_user_photo, js_compose_dfs_file_open_url_photo} from "../../../common/AppRestUrlConstants";
  export default {
    props: {
      comment: {required: true},
      c: {default: App_Random_Color()},
    },
    components: {},
    watch: {},
    data () {
      return {
        //发表评论的用户
        commentUser: {},
      }
    },
    created(){
      this.getUserInfoByEmail();
    },
    updated(){
    },
    methods: {
      /**
       * 根据用户的email，获取用户的信息。
       */
      getUserInfoByEmail(){
        js_service_getUserInfoByEmail(this, this.comment.email).then(function (data) {
          this.commentUser = data;
        });
      },
      /**
       *获取用户详细信息
       */
      getUseDetailInfo(){
        js_service_openUserDetailModal(this, this.commentUser);
      },
      composePhotoFileOpenUrl (u) {
        return js_compose_dfs_file_open_url_photo(u);
      },
    }
  }
</script>

<style scoped>
</style>
