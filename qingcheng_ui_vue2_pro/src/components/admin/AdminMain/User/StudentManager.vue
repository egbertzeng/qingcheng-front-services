<template>
  <UserManagerTemplate :users="allStudent"></UserManagerTemplate>
</template>

<script type="text/javascript">
  import {js_service_getAllStudent} from "../../../../common/services/StudentService";
  import UserManagerTemplate from "./UserManagerTemplate.vue";

  export default {
    props: {},
    components: {
      "UserManagerTemplate": UserManagerTemplate,
    },
    watch: {},
    data () {
      return {
        allStudent: [],

      }
    },
    created(){
      this.getAllStudent();
    },
    updated(){
    },
    methods: {
      getAllStudent(){
        js_service_getAllStudent(this).then(function (data) {
          this.allStudent = data;
        })
      },
    }
  }
</script>

<style scoped>
</style>
