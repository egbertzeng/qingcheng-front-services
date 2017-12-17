<template>
  <div class="ui styled fluid accordion">
    <div @click="getCourseMaterail(e)" class="title">
      <img v-if="e.coursePosterUrl!=undefined" class="ui avatar image"
           :src="composeDfsFileOpenUrl(e.coursePosterUrl)">
      {{e.courseName}}
      <i class="dropdown icon" :class="[c]"></i>课程资料
    </div>
    <div v-if="useTableTemplate" class="content" style="padding: 0px;">
      <div class="ui container fluid"
           style="background-color: whitesmoke; padding-left: 0px;padding-right:0px; "
           v-for="(k,i) of e.materialFiles">
        <CoursePdfTemplate4Table
          :m="k"
          :c="c">
        </CoursePdfTemplate4Table>
      </div>
    </div>
    <div v-else="useTableTemplate" class="content">
      <div class="ui two column grid" style="background-color: whitesmoke; padding: 0px;">
        <div class="column" v-for="(k,i) of e.materialFiles">
          <CoursePdfTemplate4Card
            :m="k"
            :c="c">
          </CoursePdfTemplate4Card>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/javascript">
  import {js_compose_dfs_file_open_url} from "../../../../common/AppRestUrlConstants";
  import CoursePdfTemplate4Table from "../../basicTemplate/CoursePdfTemplate4Table.vue"
  import CoursePdfTemplate4Card from "../../basicTemplate/CoursePdfTemplate4Card.vue"
  import {js_service_getMaterialFilesByDfsPath} from "../../../../common/services/DfsService";
  import {js_service_getMaterialFilesByCourse} from "../../../../common/services/MaterialService";
  export default {
    components: {
      "CoursePdfTemplate4Table": CoursePdfTemplate4Table,
      "CoursePdfTemplate4Card": CoursePdfTemplate4Card,
    },
    props: {
      //课程
      e: {required: true},
      //颜色
      c: {required: true},
    },
    data () {
      return {
        //是否启用table样式的，参考材料组件
        useTableTemplate: true,
      }
    },
    created(){

    },
    updated(){
    },
    methods: {
      getCourseMaterail(e){
        js_service_getMaterialFilesByCourse(this, e);
      },
      composeDfsFileOpenUrl(uri) {
        return js_compose_dfs_file_open_url(uri);
      },
    }
  }
</script>

<style scoped>
</style>
