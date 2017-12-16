<template>
  <div id="js_CourseMaterial_Modal" style="margin-top: 0%" class="modal fade bs-example-modal-lg" data-backdrop="static"
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
            《{{currtentFocusCourse.courseName}}》课程的参考资料如下...
          </span>
        </div>
        <div class="modal-body" style="background-color: whitesmoke;">
          <div class="ui two column grid"style="background-color: whitesmoke; padding-left: 0px;padding-right: 0px;">
            <div class="column"
                 v-for="(k,i) of currtentFocusCourse.materialFiles">
              <CoursePdfTemplate4Card
                :m="k"
                :needUpdateSetStyle="true"
                :c="c">
              </CoursePdfTemplate4Card>
            </div>
          </div>
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
  import CoursePdfTemplate4Card from "../../../basicTemplate/CoursePdfTemplate4Card.vue"
  import {js_CourseMaterial_Modal_hide} from "./CourseMaterialCaller";
  import {js_service_getMaterialFilesByDfsPath} from "../../../../../common/services/DfsService";
  import {js_service_getMaterialFilesByCourse} from "../../../../../common/services/MaterialService";
  import {js_serviec_sematicDriver4DropDwon} from "../../../../../common/services/SematicDriver/SematicDriver";

  export default {
    props: {
      c: {default: App_Random_Color()},
      needUpdateSetStyle: {default: false},
    },
    components: {
      "CoursePdfTemplate4Card": CoursePdfTemplate4Card,
    },
    data () {
      return {
        currtentFocusCourse: "",
      }
    },
    watch: {
      '$store.state.currtentFocusCourse4Material': 'getCourseMaterial'
    },
    created(){
      this.getCourseMaterial();
    },
    updated(){
    },
    methods: {
      //打开文件流
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
      //获取收藏同款课程的同学
      getCourseMaterial(){
        this.currtentFocusCourse = this.$store.state.currtentFocusCourse4Material;
        //获取课程的材料
        js_service_getMaterialFilesByCourse(this, this.currtentFocusCourse);
      },
      //隐藏摸态框
      hideCourseMateModal(){
        js_CourseMaterial_Modal_hide();
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
