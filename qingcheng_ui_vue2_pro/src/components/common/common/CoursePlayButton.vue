<template>
  <div class="column" style="cursor: pointer;">
    <button class="ui right labeled icon button huge" :class="[c]" @click.stop.prevent="courseCardClick(e)">
      <i class="ui play circle outline icon "></i>学习课程
    </button>
  </div>
</template>
<script type="text/javascript">
  import routerUrl from "../../../common/FrontRouterConstants";
  import {js_AppFlowPlayer_Modal_show_new} from "../basicTemplate/modals/Flowplayer/FlowPlayerProCaller";
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
      courseCardClick(e){
        js_AppFlowPlayer_Modal_show_new(this, e);
      },
    }
  }
</script>

<style scoped>
</style>
