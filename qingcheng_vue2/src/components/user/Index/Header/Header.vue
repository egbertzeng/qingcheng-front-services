<template>
  <div class="ui container qingcheng-header">
    <!--nav-->
    <div class="ui fixed inverted black big compact menu" style="margin-left: 0px; ">
      <div class="ui fluid container">
        <!--<div class="item">-->
        <!--<img src="/images/logo.png">-->
        <!--</div>-->
        <!--home-->
        <a class=" item" @mouseover="homeNavMouseOver()" @click="homeNavClick()" :class="[homeNavSelected]">
          <i class="inverted home icon" :class="[headerIconSize, homeColor]"></i>青橙科技
        </a>
        <!--navCategory-->
        <a class="  item" v-for="(e,i) in navCategory" @mouseover="navCategoryMouseOver(e)"
           @click="navCategoryClick(e)"
           :class="[e.categorySelected]">
          <i class="inverted  icon" :class="[headerIconSize, e.categoryIconName, e.categoryColor]"></i>
          {{e.categoryNameCn}}
        </a>
        <!--otherCategory-->
        <a v-if="shouldDisplayOtherCategory" class="dropdown item ">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <i class="student icon" :class="[otherCategoryColor,appSysIconSize]"></i>
            更多<b class="caret"></b>
          </a>
          <ul style="background-color: black" class="dropdown-menu">
            <li v-for="(e,i) in otherCategory" :class="[e.categorySelected]">
              <div class="divider"></div>
              <a style="cursor: pointer; color: white" @mouseover="otherCategoryItemMouseOver(e)"
                 @click="otherCategoryItemClick(e)"
                 tabindex="-1" role="menuitem">
                <i class="icon" :class="[otherCategoryIconSize,e.categoryIconName,e.categoryColor]"></i>
                <span style="font-size: small">{{e.categoryNameCn}}</span>
              </a>
            </li>
          </ul>
        </a>

        <!--<div v-if="shouldDisplayOtherCategory" class="button item">-->
        <!--<button style="background-color: black;" data-toggle="dropdown" type="button"-->
        <!--class="btn btn-inverse dropdown-toggle"><span style="font-size: smaller;">更多课程</span><span-->
        <!--class="caret"></span></button>-->
        <!--<ul style="background-color: black;" role="menu" class="dropdown-menu dropdown-menu-inverse">-->
        <!--<li :class="[e.categorySelected]" v-for="(e,i) in otherCategory" role="presentation">-->
        <!--<div class="divider"></div>-->
        <!--<a style="cursor: pointer;" @mouseover="otherCategoryItemMouseOver(e)" @click="otherCategoryItemClick(e)"-->
        <!--tabindex="-1" role="menuitem">-->
        <!--<i class="icon" :class="[otherCategoryIconSize,e.categoryIconName,e.categoryColor]"></i>-->
        <!--<span style="font-size: small">{{e.categoryNameCn}}</span>-->
        <!--</a>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->


        <!--searcher-->
        <a class="item">
          <div class="ui small inverted icon input focus">
            <input placeholder="搜索课程..." type="text" v-model.trim="searchKey"
                   @keyup="getCourseBySearchKey()"/>
            <i class="search link icon"></i>
          </div>
        </a>

        <!--用户状态信息-->
        <a class="item right dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <!--<i class="icon" :class="[appSysIconColor,appSysIcon,appSysIconSize]"></i>-->
            <img v-if="currentUser.email!=undefined" class="ui avatar  image"
                 :src="composePhotoFileOpenUrl(currentUser)">
            <span> {{currentUser.name}}</span>
            <b class="caret"></b>
          </a>
          <ul style="background-color: black;z-index: 9999;" class="dropdown-menu">
            <!--管理员入口-->
            <li v-if="currentUser.role == adminRole">
              <div class="divider"></div>
              <a style="color: white" @click="appAdminClick()">
                <i class="setting icon" :class="[otherCategoryIconSize,   adminIconColor]"></i>管理员入口
              </a>
            </li>
            <!--喜爱的教师入口-->
            <li>
              <div class="divider"></div>
              <a style="color: white" @click="appFavoriteTeacherClick()">
                <i class="spy icon" :class="[otherCategoryIconSize, favoriteTeacherIconColor]"></i>喜爱的教师
              </a>
            </li>
            <!--喜爱的同学入口-->
            <li>
              <div class="divider"></div>
              <a style="color: white" @click="appFavoriteMateClick()">
                <i class="student icon" :class="[otherCategoryIconSize, favoriteMaterIconColor]"></i>喜爱的同学
              </a>
            </li>
            <!--收藏课程入口-->
            <li>
              <div class="divider"></div>
              <a style="color: white" @click="appFavoriteCourseClick()">
                <i class="heart icon" :class="[otherCategoryIconSize,     favoriteCourseIconColor]"></i>喜爱的课程
              </a>
            </li>


            <!--历史记录入口-->
            <li>
              <div class="divider"></div>
              <a style="color: white" @click="appHistoryCourseClick()">
                <i class="history icon" :class="[otherCategoryIconSize,  historyIconColor]"></i>学过的课程
              </a>
            </li>
            <!--全部的教师入口-->
            <li>
              <div class="divider"></div>
              <a style="color: white" @click="appAllTeacherClick()">
                <i class="doctor icon" :class="[otherCategoryIconSize, allTeacherIconColor]"></i>全部的教师
              </a>
            </li>
            <!--<li>-->
            <!--<div class="divider"></div>-->
            <!--<a style="color: white" @click="appMessageClick()">-->
            <!--<i class="mail icon" :class="[otherCategoryIconSize, messageIconColor]"></i>系统消息-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<div class="divider"></div>-->
            <!--<a @click="appUserInfoClick()" style="color: white">-->
            <!--<i class="user icon" :class="[otherCategoryIconSize,  userInfoIconColor]"></i>用户信息-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<div class="divider"></div>-->
            <!--<a style="color: white" @click="appUserRegistClick()">-->
            <!--<i class="users icon" :class="[otherCategoryIconSize,registIconColor]"></i>用户注册-->
            <!--</a>-->
            <!--</li>-->
            <li>
              <div class="divider"></div>
              <a style="color: white" @click="appUserLogoutClick()">
                <i class="sign out icon" :class="[otherCategoryIconSize, loginIconColor]"></i>用户退出
              </a>
            </li>

            <!--&lt;!&ndash;todo 发布时，要注释掉，实验特性入口&ndash;&gt;-->
            <!--<li>-->
            <!--<div class="divider"></div>-->
            <!--<a style="color: white" @click="testClick()">-->
            <!--实验特性入口-->
            <!--</a>-->
            <!--</li>-->

          </ul>
        </a>
        <!--排行榜-->
        <a @click="appOrderMainEntryClick()" title="Tooltip on bottom" data-placement="bottom" data-toggle="tooltip"
           class="item right button" :class="[orderListNavSelected]">
          <i class="star icon" :class="[loginIconColor,appSysIconSize]"></i>
          排行榜
        </a>
      </div>
      <!--TODO:用户信息组件-->
      <UserInfo></UserInfo>

    </div>
  </div>
</template>
<script type="text/javascript">
  import {App_Ajax_Get} from "../../../../common/VueResourceApi";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import routerUrl from "../../../../common/FrontRouterConstants";
  import {
    REST_URL_CATEGORY_ALL_LIST_REST_URL,
    REST_URL_QINGCHENG_FIND_ACCOUNT_BY_EMAIL, js_compose_dfs_file_open_url_photo
  } from "../../../../common/AppRestUrlConstants";
  import {
    APP_TOKEN_LOCALSTORAGE_NAME,
    APP_SEARCH_CATEGORY_CNNAME,
    APP_SEARCH_CATEGORY_ID, APP_SEARCH_KEY, APP_SEARCH_CATEGORY_ICON, APP_SEARCH_CATEGORY_COLOR,
    APP_CURRENT_SESSION_EMAIL, APP_CURRENT_LOGIN_USER, APP_TARGET_USER_ROLE_ADMIN, APP_CURRENT_USER_FAVORITE_COURSE,
    APP_CURRENT_USER_FAVORITE_TEACHER, APP_USER_RELATION_STUDENT_STUDENT,
    APP_USER_RELATION_STUDENT_TEACHER, APP_TARGET_USER_ROLE_STUDENT, APP_TARGET_USER_ROLE_TEACHER
  } from "../../../../common/AppSysConstants";
  import  UserInfo from './UserInfo/UserInfo.vue'
  import {App_Ajax_Post} from "../../../../common/AppVueResourceApi";
  import {
    _api_getFavoriteUser,
    _api_getRoleByRelationType,
    _api_getKeyByRelationType
  } from "../../../../common/AppRestApi";
  import {
    js_common_service_updateCurrentLoginUserFavoriteCourse
  } from "../../../../common/services/loginUser/CurrentLoginUserService";
  import {js_service_getCurrentLoginUser} from "../../../../common/services/UserService.js"
  export default {
    components: {
      "UserInfo": UserInfo,
    },
    data () {
      return {
        //开启鼠标滑过功能
        //enableMouseOver: true,
        enableMouseOver: false,
        //全部类别的课程
        allCategory: [],
        headerIconSize: 'big',
        homeNavSelected: "active",
        homeColor: App_Random_Color(),
        otherCategoryColor: App_Random_Color(),
        navCategorySize: 5,
        navCategory: [],
        shouldDisplayOtherCategory: false,
        otherCategory: [],
        otherCategoryIconSize: 'large',
        selectedConstantsActive: "active",
        otherNavSelected: "",
        labelSizeForCourse: "large",
        searchKey: "",

        //系统操作相关信息
        appSysIconSize: "big",
        appSysIcon: "male",
        appSysIconColor: App_Random_Color(),
        registIconColor: App_Random_Color(),
        messageIconColor: App_Random_Color(),
        userInfoIconColor: App_Random_Color(),
        loginIconColor: App_Random_Color(),
        adminIconColor: App_Random_Color(),
        favoriteCourseIconColor: App_Random_Color(),
        historyIconColor: App_Random_Color(),
        favoriteMaterIconColor: App_Random_Color(),
        mainOrderIconColor: App_Random_Color(),
        favoriteTeacherIconColor: App_Random_Color(),
        allTeacherIconColor: App_Random_Color(),
        //当前登录的用户
        currentUser: window.sessionStorage.getItem(APP_CURRENT_LOGIN_USER),
        //
        orderListNavSelected: "",
        //
        adminRole: APP_TARGET_USER_ROLE_ADMIN,


      }
    },
    created(){

      //获取当前用户
      this.getCurrentUser();
      //设置用户所关注的课程
      this.initCurrentStatus();
      //获取全部门类信息
      this.getAllCategory();

    },
    updated: function () {
      //开启下来菜单的功能
      //开启下来菜单的功能
      $('#otherCategoryHtmlHolder').dropdown();
      $('.ui.dropdown').dropdown();
      $('#otherCategory').dropdown();
    },
    methods: {
      //测试新特效入口
      testClick(){
        this.$router.push({path: routerUrl.path.test});
      },
      //排行榜入口
      appOrderMainEntryClick(){
        this.clearKeyAndCategorySearchStyle();
        this.orderListNavSelected = this.selectedConstantsActive;
        this.$router.push({path: routerUrl.path.AppOrderMain});
      },
      clearOrderListStyle(){
        this.orderListNavSelected = "";
      },
      //初始化login用户的状态
      initCurrentStatus(){
        this.initUserFavoriteCourse();
        this.initUserFavoriteTeacher();
        this.initUserFavoriteStudent();
      },
      initUserFavoriteCourse(){
        js_common_service_updateCurrentLoginUserFavoriteCourse(this);
      },
      initUserFavoriteTeacher(){
        this.getUserFavoriteCommon(_api_getRoleByRelationType(APP_USER_RELATION_STUDENT_TEACHER), APP_USER_RELATION_STUDENT_TEACHER);
      },
      initUserFavoriteStudent(){
        this.getUserFavoriteCommon(_api_getRoleByRelationType(APP_USER_RELATION_STUDENT_STUDENT), APP_USER_RELATION_STUDENT_STUDENT);
      },
      getUserFavoriteCommon(r, rt){
        _api_getFavoriteUser(this, r, rt).then(function (data) {
          //判断关系类型
          window.sessionStorage.setItem(_api_getKeyByRelationType(rt), JSON.stringify(data));
        });
      },
      //获取全部Category信息
      getAllCategory: function () {
        //获取Category信息
        let url = REST_URL_CATEGORY_ALL_LIST_REST_URL;
        let params = {};
        App_Ajax_Get(this, url, params).then(function (data) {
          //全部Category信息
          this.allCategory = data;
          //为Category添加辅助字段
          for (let i = 0; i < this.allCategory.length; i++) {
            //添加颜色字段
            this.allCategory[i].categoryColor = App_Random_Color();
            //添加选中字段
            this.allCategory[i].categorySelected = "";
          }
          //将全部Category信息拆分为navH和other两部分
          if (this.allCategory.length > this.navCategorySize) {
            this.navCategory = this.allCategory.slice(0, this.navCategorySize);
            this.otherCategory = this.allCategory.slice(this.navCategorySize, this.allCategory.length);
            this.shouldDisplayOtherCategory = true;
          } else {
            this.navCategory = this.allCategory;
          }
          this.refreshStyleSetter();
        });
      },
      //刷新以后页面样式设置
      refreshStyleSetter(){
        //设置样式
        let id = window.sessionStorage.getItem(APP_SEARCH_CATEGORY_ID);
        if (id == "") {
          return;
        }
        let e = "";
        let index = "";
        //查询刷新前的类别id
        for (let i = 0; i < this.allCategory.length; i++) {
          if (id == this.allCategory[i].categoryId) {
            e = this.allCategory[i];
            index = i;
            break;
          }
        }
        //判断刷新后应该给那些项目设置样式
        if (e !== "" && index !== "") {
          if (index <= this.navCategorySize) {
            this.navCategoryClick(e);
          } else {
            this.otherCategoryItemClick(e);
          }
        }
      },
      //点击[home]
      homeNavClick(){
        this.clearKeyAndCategorySearchStyle();
        this.clearOrderListStyle();
        this.homeNavSelected = this.selectedConstantsActive;

        //清空状态
        window.sessionStorage.setItem(APP_SEARCH_CATEGORY_CNNAME, "");
        window.sessionStorage.setItem(APP_SEARCH_CATEGORY_ID, "");
        window.sessionStorage.setItem(APP_SEARCH_CATEGORY_ICON, "");
        window.sessionStorage.setItem(APP_SEARCH_CATEGORY_COLOR, "");
        window.sessionStorage.setItem(APP_SEARCH_KEY, "");
        //路由跳转
        this.$router.push({path: routerUrl.path.index});
      },

      //点击[navCategory]
      navCategoryClick(e){
        this.navAndOtherCategoryClick(e);
      },
      //点击[otherCategory]
      otherCategoryItemClick(e){
        this.navAndOtherCategoryClick(e);
      },
      //滑过[home]
      homeNavMouseOver(){
        if (this.enableMouseOver) {
          this.homeNavClick();
        }
      },
      //滑过[navCategory]
      navCategoryMouseOver(e){
        if (this.enableMouseOver) {
          this.navCategoryClick(e);
        }
      },
      //滑过[otherCategory]
      otherCategoryItemMouseOver(e){
        if (this.enableMouseOver) {
          this.otherCategoryItemClick(e);
        }
      },
      appUserRegistClick(){
        alert("appUserRegistClick()")
      },
      appMessageClick(){
        alert("appMessageClick()")
      },
      appUserLogoutClick(){
        //清空所有sessionStorage状态
        window.sessionStorage.clear();
        //路由到登陆组件
        this.$router.push({path: routerUrl.path.login});
      },
      //nav和other共同的方法
      navAndOtherCategoryClick(e){
        //清空searchkey
        this.searchKey = "";
        //清空排行榜的状态
        this.clearOrderListStyle();
        //样式设置
        this.navCategoryStyleSet(e);
        //路由跳转
        this.$router.push({name: routerUrl.name.indexCategory, params: {categoryId: e.categoryId}})
        //更改状态
        this.$store.state.searchCategory = e;
        //替换成sessionstorge
        window.sessionStorage.setItem(APP_SEARCH_CATEGORY_CNNAME, e.categoryNameCn);
        window.sessionStorage.setItem(APP_SEARCH_CATEGORY_ID, e.categoryId);
        window.sessionStorage.setItem(APP_SEARCH_CATEGORY_ICON, e.categoryIconName);
        window.sessionStorage.setItem(APP_SEARCH_CATEGORY_COLOR, e.categoryColor);
        window.sessionStorage.setItem(APP_SEARCH_KEY, "");
      },
      //设置通用样式
      navCategoryStyleSet: function (e) {
        //设置home的样式
        this.homeNavSelected = "";
        //设置category的样式
        for (let i = 0; i < this.allCategory.length; i++) {
          if (e === this.allCategory[i]) {
            this.allCategory[i].categorySelected = this.selectedConstantsActive;
          } else {
            this.allCategory[i].categorySelected = "";
          }
        }
      },
      //清空home和所有category的样式
      resetHomeAndAllCategoryStyle(){
        //清空category样式
        for (let i = 0; i < this.allCategory.length; i++) {
          this.allCategory[i].categorySelected = "";
        }
        //设置home的样式
        this.homeNavSelected = "";
      },
      //进入admin
      appAdminClick(){
        this.$router.push(routerUrl.path.adminFilter);
      },
      //点击收藏课程
      appFavoriteCourseClick(){
        this.clearKeyAndCategorySearchStyle();
        //路由跳转
        this.$router.push({name: routerUrl.path.userFavoriteCourse});
      },
      //清除按key搜索和按category搜索的状态
      clearKeyAndCategorySearchStyle(){
        this.searchKey = "";
        this.navCategoryStyleSet("");
        this.otherNavSelected = "";

      },
      //点击历史记录
      appHistoryCourseClick(){
        //路由跳转
        this.$router.push({name: routerUrl.path.userHistoryCourse});
      },
      //喜爱的老师入口
      appFavoriteTeacherClick(){
        this.commonTeacherClick();
        this.$store.state.isAllTeacher = false;
      },
      //全部老师入口
      appAllTeacherClick(){
        this.commonTeacherClick();
        this.$store.state.isAllTeacher = true;
      },
      //老师入口通用入口
      commonTeacherClick(){
        this.clearKeyAndCategorySearchStyle();
        //路由跳转
        this.$router.push({name: routerUrl.path.AppTeachers});
        this.$store.state.timestamp = Date.parse(new Date());
      },

      //关注的同学入口
      appFavoriteMateClick(){
        //路由跳转
        this.$router.push({name: routerUrl.path.AppMatesBody});
        this.$store.state.timestamp4FavoriteUser = Date.parse(new Date());
      },


      //根据输入框获取course信息
      getCourseBySearchKey: function () {
        if (this.searchKey !== "") {
          this.resetHomeAndAllCategoryStyle();
          //路由跳转
          this.$router.push({name: routerUrl.name.searchScreenBodyForKey, query: {k: this.searchKey}})
          //更改状态
          window.sessionStorage.setItem(APP_SEARCH_CATEGORY_ID, "");
          this.$store.state.searchKey = this.searchKey;
          window.sessionStorage.setItem(APP_SEARCH_KEY, this.searchKey);
        } else {
          this.homeNavClick();
        }
      },
      composePhotoFileOpenUrl (e) {
        return js_compose_dfs_file_open_url_photo(e);
      },
      getCurrentUser(){
        js_service_getCurrentLoginUser(this).then(function (data) {
          //获取当前登录的用户
          this.currentUser = data;
        });
      },
    },
  }
</script>

<style scoped>

</style>
