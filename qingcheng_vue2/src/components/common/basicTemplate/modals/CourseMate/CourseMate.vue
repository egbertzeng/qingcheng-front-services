<template>
  <div id="js_CourseMate_Modal" style="margin-top: 2%" class="modal fade bs-example-modal-lg" data-backdrop="static"
       data-keyboard="false" tabindex="-1" role="dialog"
       aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document" style="width: 1200px;">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="hideCourseMateModal()" type="button" class="close" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <span class="modal-title" id="gridSystemModalLabel">
            <img v-if="currtentFocusCourse!=null&&currtentFocusCourse.coursePosterUrl!=undefined"
                 class="ui avatar  image" :src="composeDfsFileOpenUrl(currtentFocusCourse.coursePosterUrl)">
            《{{currtentFocusCourse.courseName}}》课程的学友如下...
          </span>
        </div>
        <div class="modal-body">
          <CourseMateContentTemplate
            :needUpdateSetStyle="true">
          </CourseMateContentTemplate>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>
<script type="text/javascript">
  import {App_Ajax_Get} from "../../../../../common/AppVueResourceApi";
  import {
    js_compose_dfs_file_open_url_photo,
    js_compose_dfs_file_open_url
  } from "../../../../../common/AppRestUrlConstants";
  import {App_Random_Color} from "../../../../../common/AppColorConstants";
  import {js_CourseMate_Modal, js_CourseMate_Modal_hide} from "./CourseMateCaller";
  import CourseMateContentTemplate from "../../../basicTemplate/CourseMateContentTemplate.vue";
  import {js_serviec_sematicDriver4DropDwon} from "../../../../../common/services/SematicDriver/SematicDriver";

  export default {
    props: {
      c: {default: App_Random_Color()},
      needUpdateSetStyle: {default:true},
    },
    components: {
      "CourseMateContentTemplate": CourseMateContentTemplate,
    },
    data () {
      return {
        currtentFocusCourse: "",
      }
    },
    watch: {
      '$store.state.currtentFocusCourse4Student': 'getCourseMate'
    },
    created(){
      this.getCourseMate();
      this.setStyle();
    },
    updated(){
      this.setStyle();
    },
    methods: {
      //打开文件流
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      //获取收藏同款课程的同学
      getCourseMate(){
        this.currtentFocusCourse = this.$store.state.currtentFocusCourse4Student;
        this.setStyle();
      },
      //隐藏摸态框
      hideCourseMateModal(){
        js_CourseMate_Modal_hide();
      },
      setStyle(){
        if (this.needUpdateSetStyle) {
          js_serviec_sematicDriver4DropDwon();
        }
      },
    }
  }
</script>

<style scoped>
  .modal-body {
    height: 480px;
    overflow: scroll;
  }
</style>
