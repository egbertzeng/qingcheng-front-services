<template>
  <div id="js_CourseDetailModal" style="margin-top: 0%" class="modal fade bs-example-modal-lg" data-backdrop="static"
       data-keyboard="false" tabindex="-1" role="dialog"
       aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document" style="width: 1200px;">
      <div class="modal-content" style="padding: 0px;">
        <div class="modal-header">
          <!--&lt;!&ndash;头像&ndash;&gt;-->
          <img v-if="currtentFocusCourse!=null&&currtentFocusCourse.coursePosterUrl!=undefined"
               class="ui avatar  image" :src="composeDfsFileOpenUrl(currtentFocusCourse.coursePosterUrl)">
          《{{currtentFocusCourse.courseName}}》课程的详细信息：
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body"style="padding: 0px;">
          <CourseDetailTemplate
            :showCourseDetail="false"
            :showTableHeader="false"
          >
          </CourseDetailTemplate>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>


<script type="text/javascript">
  import CourseDetailTemplate from "../../CourseDetailTemplate.vue"
  import {js_compose_dfs_file_open_url} from "../../../../../common/AppRestUrlConstants";
  export default {
    props: {},
    components: {
      "CourseDetailTemplate": CourseDetailTemplate,
    },
    data () {
      return {
        currtentFocusCourse: "",
      }
    },
    watch: {
      '$store.state.currtentFocusCourse4Detail': 'getStudent'
    },
    created(){
    },
    updated(){
    },
    methods: {
      getStudent(){
        this.currtentFocusCourse = this.$store.state.currtentFocusCourse4Detail;
      },
      //打开文件流
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
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
