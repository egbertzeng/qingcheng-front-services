<template>
  <div id="js_StudentDetailModal" style="margin-top: 0%" class="modal fade bs-example-modal-lg" data-backdrop="static"
       data-keyboard="false" tabindex="-1" role="dialog"
       aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document" style="width: 1200px;">
      <div class="modal-content">
        <div class="modal-header">
          <!--头像-->
          <img v-if="student!=null&&student!=undefined"
               class="ui avatar  image" :src="composePhotoFileOpenUrl(student)">
          <span>学生，{{student.name}}:</span>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          <div class="ui styled fluid accordion"
               style="margin-bottom: 2%; margin-top: 2%;">
            <StudentTemplate
              v-if="student!=null&&student!=undefined"
              :student="student"
              :titleMiniPhoto="true"
              :needUpdateSetStyle="false"
              :c="c">
            </StudentTemplate>
          </div>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script type="text/javascript">
  import {App_Random_Color} from "../../../../../common/AppColorConstants";
  import StudentTemplate from "../../StudentTemplate.vue"
  import {js_compose_dfs_file_open_url_photo} from "../../../../../common/AppRestUrlConstants";
  export default {
    props: {},
    components: {
      "StudentTemplate": StudentTemplate,
    },
    watch: {
      "$store.state.currtentFocusStudent4Detail": "updatetCurrentFocusStudent"
    },
    data () {
      return {
        c: App_Random_Color(),
        student: this.$store.state.currtentFocusStudent4Detail,
      }
    },
    created(){

    },
    updated(){

    },
    methods: {
      //获取关注的学生
      updatetCurrentFocusStudent(){
        this.student = this.$store.state.currtentFocusStudent4Detail;
      },
      composePhotoFileOpenUrl (e) {
        return js_compose_dfs_file_open_url_photo(e);
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
