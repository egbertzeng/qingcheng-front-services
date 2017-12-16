<template>
  <div class="ui fluid container" style="margin-top:4%;padding-bottom: 0%">
    <Displayer
      :choiceCourse="choiceCourse"
      :choiceCourseIcon="choiceCourseIcon"
      :choiceCourseColor="choiceCourseColor"
      :choiceCourseDisplayerName="choiceCourseDisplayerName"
      :choiceCourseLabelText="choiceCourseLabelText">
    </Displayer>
  </div>
</template>
<script type="text/javascript">
  import {App_Ajax_Get} from "../../../../common/AppVueResourceApi";
  import {
    REST_URL_GET_COURSE_LIST_BY_CATEGORYID_REST_URL,
    js_compose_dfs_file_open_url
  } from "../../../../common/AppRestUrlConstants";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import routerUrl from "../../../../common/FrontRouterConstants";
  import {
    APP_TOKEN_LOCALSTORAGE_NAME,
    APP_SEARCH_CATEGORY_CNNAME,
    APP_SEARCH_CATEGORY_ID, APP_SEARCH_CATEGORY_ICON, APP_SEARCH_CATEGORY_COLOR
  } from "../../../../common/AppSysConstants";
  import Displayer from "../../../common/Displayer/Displayer.vue"
  import {App_Displayer_Name_TV001} from "../../../common/Displayer/Displayer.js"
  export default {
    components: {
      "Displayer": Displayer,
    },
    data () {
      return {
        choiceCourseDisplayerName: App_Displayer_Name_TV001,
        choiceCourse: [],
        choiceCourseColor: "",
        choiceCourseIcon: "gift",
        choiceCourseLabelText: "",
        searchKey: ""
      }
    },
    created(){
      //创建组件时，获取数据
      this.fetchCourseListByCategoryId();
    },
    watch: {
      //路由有变化时，重新获取数据（此方法用于解决，动态路由情况下，组件状态不能更新的问题。）
      //'$route': 'fetchCourseListByCategoryId',
      //state有变化时，重新获取数据（此方法用于解决，动态路由情况下，组件状态不能更新的问题。）
      '$store.state.searchCategory': 'fetchCourseListByCategoryId'
    },
    methods: {
      fetchCourseListByCategoryId() {
        //重新生成颜色
        this.choiceCourseColor = window.sessionStorage.getItem(APP_SEARCH_CATEGORY_COLOR);
        this.currentCategoryName = window.sessionStorage.getItem(APP_SEARCH_CATEGORY_CNNAME);
        this.choiceCourseIcon = window.sessionStorage.getItem(APP_SEARCH_CATEGORY_ICON);
        this.choiceCourseLabelText = "搜索<<" + this.currentCategoryName + ">>获得的课程如下..."
        this.getCourseListByCategoryId(window.sessionStorage.getItem(APP_SEARCH_CATEGORY_ID));
      },
      //根据categoryID获取Course信息
      getCourseListByCategoryId: function (id) {
        let url = REST_URL_GET_COURSE_LIST_BY_CATEGORYID_REST_URL;
        let params = {categoryid: id};
        //先清空原来的数据
        this.choiceCourse = [];
        App_Ajax_Get(this, url, params).then(function (data) {
          //再赋值为最新请求的数据
          this.choiceCourse = data;
        });
      },
    }
  }
</script>
<style scoped>
</style>
