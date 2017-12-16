<template>
  <a class="ui item " @click.stop.prevent="goBack()">
    <i class="chevron left icon " :class="[c]"></i>返回
  </a>
</template>

<script type="text/javascript">
  import {App_Random_Color} from "../../../common/AppColorConstants";
  import {js_routeGoBack} from "../../../common/services/router/AppRouterUtil";
  export default {
    props: {
      c: {default: App_Random_Color()}
    },
    components: {},
    watch: {},
    data () {
      return {}
    },
    created(){
    },
    updated(){
    },
    methods: {
      goBack(){
        js_routeGoBack(this)
      }
    }
  }
</script>

<style scoped>
</style>
