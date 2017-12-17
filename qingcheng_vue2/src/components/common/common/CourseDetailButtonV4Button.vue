<template>
  <div class="column" style="cursor: pointer;">
    <button class="ui right labeled icon button huge" :class="[c]" @click.stop.prevent="goToCourseDetail(e)">
      <!--<i class="chevron right icon "></i>-->
      <!--<i class="travel icon " ></i>-->
      <!--<i class="ellipsis horizontal icon " ></i>-->
      <i class="paw icon " ></i>
      课程详情
    </button>
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

//        js_goToCourseDetail(this, e);
      },
    }
  }
</script>

<style scoped>
</style>
