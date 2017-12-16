<template>
  <div>
    admin filter
  </div>
</template>

<script type="text/javascript">
  import routerUrl from "../../common/FrontRouterConstants";
  export default {
    created(){
      this.$router.push(routerUrl.path.adminMain)
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
</style>
