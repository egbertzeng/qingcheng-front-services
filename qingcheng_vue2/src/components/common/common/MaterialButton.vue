<template>
  <div v-if="e.materialDirName!=''" class="column"
       @click.stop.prevent="toFindeCourseMaterial(e)">
    <i class="book icon" :class="[c]"></i>资料
  </div>
</template>

<script type="text/javascript">
  import {js_toFindCourseMaterial} from "../basicTemplate/modals/CourseMaterial/CourseMaterialCaller";
    export default {
      props: {
        e: {required: true},
        c: {required: true},
      },
        data () {
            return {}
        },
        created(){
        },
        updated(){
        },
        methods: {
          //查看参考资料
          toFindeCourseMaterial(e){
            js_toFindCourseMaterial(this, e, true);
          },
        }
    }
</script>

<style scoped>
</style>
