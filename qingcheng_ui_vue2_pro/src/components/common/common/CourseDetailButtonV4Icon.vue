<template>
  <div class="column" style="cursor: pointer;" @click.stop.prevent="goToCourseDetail(e)">
    <!--<i class="chevron right icon " :class="[c]"></i>-->
    <!--<i class="travel icon " :class="[c]"></i>-->
    <!--<i class="ellipsis horizontal icon " :class="[c]"></i>-->
    <i class="paw icon " :class="[c]"></i>
    详情
  </div>
</template>

<script type="text/javascript">
  import routerUrl from "../../../common/FrontRouterConstants";
  import {js_goToCourseDetail} from "../../../common/services/router/AppRouterUtil"
  import {js_CourseDetailModal_show} from "../basicTemplate/modals/CourseDetail/CourseDetailCaller";
  export default {
    props: {
      e: {required: true},
      c: {required: true}
    },
    data () {
      return {}
    },
    created(){
    },
    updated(){
    },
    methods: {
      goToCourseDetail(e){
        js_CourseDetailModal_show(this, e);
        //js_goToCourseDetail(this, e);
      },
    }
  }
</script>

<style scoped>
</style>
