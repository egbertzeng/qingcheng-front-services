<template>
  <div class="ui fluid container">
    <!--用户信息展示表格-->
    <table class="ui celled compact striped selectable table">
      <thead>
      <tr>
        <th>序号</th>
        <th @click="sortByUserName()" style="cursor: pointer;">昵称</th>
        <th @click="sortByUserGender()" style="cursor: pointer;">性别</th>
        <th @click="sortByUserEmail()" style="cursor: pointer;">邮箱</th>
        <th @click="sortByUserSlogan()" style="cursor: pointer;">座右铭</th>
        <th @click="sortByUserActiveStatus()" style="cursor: pointer;">状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(e,i) of users">
        <td>{{i+1}}</td>
        <td @click="getUseDetailInfo(e)" style="cursor: pointer;">
          <img v-if="(e.photo!=undefined)" class="ui avatar image"
               :src="composePhotoFileOpenUrl(e)">
          <span v-if="e.role==teacherRole">老师，</span>
          <span v-if="e.role==studentRole">学生，</span>
          {{e.name}}
        </td>
        <td>
          <i v-if="e.gender" class="ui male icon" :class="[mainColor]"></i>
          <i v-else="e.gender" class="ui female icon" :class="[mainColor]"></i>
          {{e.gender}}
        </td>
        <td>
          <i class="ui mail icon" :class="[mainColor]"></i>
          {{e.email}}
        </td>
        <td>
          <i class="ui announcement icon" :class="[mainColor]"></i>
          {{e.slogan}}
        </td>
        <td>
          <i v-if="e.activeStatus" class="ui smile icon" :class="[greenColor]"></i>
          <i v-else="e.activeStatus" class="ui frown icon" :class="[redColor]"></i>
          {{e.activeStatus}}
        </td>
        <!--操作-->
        <td>
          <div class="ui small compact basic icon buttons">
            <!--获取详细信息-->
            <button @click="getUseDetailInfo(e)" class="ui button"><i class="unlock alternate icon"></i></button>
            <!--编辑用户信息-->
            <button @click="editUseDetailInfo(e)" class="ui button"><i class="edit icon"></i></button>

          </div>
        </td>
      </tr>

      </tbody>
    </table>

    <!--用户信息编辑摸态框-->
    <div id="js_UserInfoEditInfoModal" class="modal fade" tabindex="-1" role="dialog"
         aria-labelledby="gridSystemModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <img v-if="currentUser!=''" class="ui avatar image"
                 :src="composePhotoFileOpenUrl(currentUser)">
            <span class="modal-title" id="gridSystemModalLabel">{{currentUserRoleName}}，{{currentUser.name}}</span>
          </div>
          <div class="modal-body">
            <form class="ui form">
              <div class=" required field">
                <label>昵称：name</label>
                <input v-model="currentUser.name" type="text">
              </div>
              <div class="required field">
                <label>头像：photo</label>
                <input v-model="currentUser.photo" type="text">
              </div>
              <div class="disabled required field">
                <label>邮箱：email</label>
                <input v-model="currentUser.email" type="text">
              </div>
              <div class="two fields">
                <div class="disabled  required field">
                  <label>性别：gender {{currentUserGenderName}}</label>
                  <input v-model="currentUser.gender" type="text">
                </div>
                <div class="disabled  required field">
                  <label>角色：role {{currentUserRoleName}}</label>
                  <input v-model="currentUser.role" type="text">
                </div>

              </div>

              <div class="required field">
                <label>座右铭：slogan</label>
                <textarea v-model="currentUser.slogan" rows="3"></textarea>
              </div>

              <div class="ui grid">
                <div @click.stop.prevent="userActiveStatusCheck(currentUser)" class="four wide column">
                  <label class="checkbox" for="checkbox1">
                    <input v-if="currentUser.activeStatus" type="checkbox" data-toggle="checkbox" id="checkbox1"
                           required checked>
                    <input v-else="currentUser.activeStatus" type="checkbox" data-toggle="checkbox" id="checkbox1"
                           required>
                    用户状态
                  </label>
                </div>
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateUser()">修改</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script type="text/javascript">
  import {js_compose_dfs_file_open_url_photo} from "../../../../common/AppRestUrlConstants";
  import {
    js_util_sortbyUserName, js_util_sortbyUserGender, js_util_sortbyUserEmail, js_util_sortbyUserSlogan,
    js_util_sortbyUserActiveStatus
  } from "./UserUtil";
  import {App_Green_Color, App_Red_Color, App_Random_Color} from "../../../../common/AppColorConstants";
  import {APP_TARGET_USER_ROLE_TEACHER, APP_TARGET_USER_ROLE_STUDENT} from "../../../../common/AppSysConstants";
  import {js_toFindeTeacher} from "../../../common/basicTemplate/modals/CourseTeacher/CourseTeacherCaller";
  import {js_StudentDetail_Modal_Show} from "../../../common/basicTemplate/modals/StudentDetail/StudentDetailCaller";
  import {js_service_updateUser, js_service_openUserDetailModal} from "../../../../common/services/UserService";
  export default {
    props: {
      users: {required: true},
    },
    components: {},
    watch: {},
    data () {
      return {
        greenColor: App_Green_Color(),
        redColor: App_Red_Color(),
        mainColor: App_Random_Color(),
        teacherRole: APP_TARGET_USER_ROLE_TEACHER,
        studentRole: APP_TARGET_USER_ROLE_STUDENT,
        //当前选中的用户
        currentUser: "",
        currentUserGenderName: "",
        currentUserRoleName: "",
      }
    },
    created(){
    },
    updated(){
    },
    methods: {
      /**
       *获取用户详细信息
       */
      getUseDetailInfo(e){
        js_service_openUserDetailModal(this,e);
      },
      /**
       *  编辑用户信息
       */
      editUseDetailInfo(e){
        //赋值数据
        this.currentUser = e;
        //过滤当前用户的属性
        this.filterCurrentUser();
        //打开摸态框
        $('#js_UserInfoEditInfoModal').modal("show");

      },

      /**
       *更新用户信息
       */
      updateUser(){
        js_service_updateUser(this, this.currentUser).then(function (data) {
          if (data == 'ok') {
            alert("修改成功")
          }

        });
      },

      userActiveStatusCheck(u){
        u.activeStatus = !u.activeStatus;
      },
      composePhotoFileOpenUrl (e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
      /**
       * 以下是属性的过滤函数
       */
      filterCurrentUser(){
        if (this.currentUser != "") {
          this.filterGender();
          this.filterRole();
        }
      },

      filterGender(){
        if (this.currentUser) {
          this.currentUserGenderName = '男';
        } else {
          this.currentUserGenderName = '女';
        }
      },
      filterRole(){
        if (this.currentUser.role == APP_TARGET_USER_ROLE_TEACHER) {
          //教师
          this.currentUserRoleName = '老师';
        } else if (this.currentUser.role == APP_TARGET_USER_ROLE_STUDENT) {
          //学生
          this.currentUserRoleName = '学生';
        }
      },
      /**
       * 以下是排序函数
       */
      //根据学生名称排序
      sortByUserName(){
        js_util_sortbyUserName(this.users);
      },
      //根据学生性别排序
      sortByUserGender(){
        js_util_sortbyUserGender(this.users);
      },
      //根据学生邮箱排序
      sortByUserEmail(){
        js_util_sortbyUserEmail(this.users);
      },
      //根据学生口号排序
      sortByUserSlogan(){
        js_util_sortbyUserSlogan(this.users);
      },
      //根据学生口号排序
      sortByUserActiveStatus(){
        js_util_sortbyUserActiveStatus(this.users);
      },
    }
  }
</script>

<style scoped>
</style>
