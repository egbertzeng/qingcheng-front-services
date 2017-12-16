<template>
  <div class="ui fluid container" style="margin-top:4%;padding-bottom: 0%">
    <Displayer
      :choiceCourse="choiceCourse"
      :choiceCourseDisplayerName="choiceCourseDisplayerName"
      :choiceCourseIcon="choiceCourseIcon"
      :choiceCourseLabelText="choiceCourseLabelText">
    </Displayer>
  </div>
</template>
<script type="text/javascript">
  import {App_Ajax_Get} from "../../../../common/AppVueResourceApi";
  import {
    REST_URL_GET_COURSE_LIST_BY_CATEGORYID_REST_URL, js_compose_dfs_file_open_url,
    REST_URL_GET_COURSE_LIST_BY_SEARCHKEY_REST_URL
  } from "../../../../common/AppRestUrlConstants";
  import {App_Random_Color} from "../../../../common/AppColorConstants";
  import {mapState} from "vuex";
  import {
    APP_TOKEN_LOCALSTORAGE_NAME,
    APP_SEARCH_CATEGORY_CNNAME,
    APP_SEARCH_CATEGORY_ID, APP_SEARCH_KEY
  } from "../../../../common/AppSysConstants";
  import routerUrl from "../../../../common/FrontRouterConstants";
  import Displayer from "../../../common/Displayer/Displayer.vue"
  import {App_Displayer_Name_TV001} from "../../../common/Displayer/Displayer.js"
  import {js_service_sematicDriver4Dimmer} from "../../../../common/services/SematicDriver/SematicDriver";
  export default {
    components: {
      "Displayer": Displayer,
    },
    data () {
      return {
        choiceCourseDisplayerName: App_Displayer_Name_TV001,
        choiceCourse: [],
        choiceCourseIcon: "search",
        choiceCourseLabelText: "",
      }
    },
    created(){
      //创建组件时，获取数据
      this.getCourseBySearchKey();
      js_service_sematicDriver4Dimmer();
    },
    updated: function () {
      js_service_sematicDriver4Dimmer();
    },
    watch: {
      //state有变化时，重新获取数据（此方法用于解决，动态路由情况下，组件状态不能更新的问题。）
      '$store.state.searchKey': 'getCourseBySearchKey'
    },
    methods: {
      //根据输入框获取course信息
      getCourseBySearchKey: function () {
        //重新生成颜色
        this.choiceCourseColor = App_Random_Color();
        this.searchKey = window.sessionStorage.getItem(APP_SEARCH_KEY);
        this.choiceCourseLabelText = "搜索<" + this.searchKey + ">" + "获得的课程如下...";
        let url = REST_URL_GET_COURSE_LIST_BY_SEARCHKEY_REST_URL;
        let params = {k: this.searchKey};
        App_Ajax_Get(this, url, params).then(function (data) {
          this.choiceCourse = data;
          //设置是否显示搜索没有结果的提示信息
          NO_SEARCH_RESULT_CALLER(this, this.choiceCourse);
        });
      },
      composeDfsFileOpenUrl: function (uri) {
        return js_compose_dfs_file_open_url(uri);
      },
    }
  }
</script>

<style scoped>
</style>
