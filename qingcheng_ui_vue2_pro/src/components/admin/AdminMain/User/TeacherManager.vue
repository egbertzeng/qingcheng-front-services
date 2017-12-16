<template>
  <UserManagerTemplate :users="allTeacher"></UserManagerTemplate>
</template>

<script type="text/javascript">
  import {js_service_getAllTeacher} from "../../../../common/services/TeacherService";
  import UserManagerTemplate from "./UserManagerTemplate.vue";
  export default {
    props: {},
    components: {
      "UserManagerTemplate": UserManagerTemplate,
    },
    watch: {},
    data () {
      return {
        allTeacher: [],
      }
    },
    created(){
      this.getAllTeacher();
    },
    updated(){
    },
    methods: {
      getAllTeacher(){
        js_service_getAllTeacher(this).then(function (data) {
          this.allTeacher = data;
        })
      },
    }
  }
</script>

<style scoped>
</style>
