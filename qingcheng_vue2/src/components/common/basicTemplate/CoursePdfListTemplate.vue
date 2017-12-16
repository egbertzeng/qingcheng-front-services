<template>
  <div>
    <div v-for="(m,i) in course.materialFiles">
      <CoursePdfTemplate4Card
        :m="m"
        :c="c"
        :iconSize="iconSize"
      >
      </CoursePdfTemplate4Card>
    </div>
  </div>
</template>

<script type="text/javascript">
  import CoursePdfTemplate4Card from "./CoursePdfTemplate4Card.vue";
  import {App_Random_Color} from "../../../common/AppColorConstants";

  export default {

    components: {
      "CoursePdfTemplate4Card": CoursePdfTemplate4Card,
    },
    props: {
      course: {require: true},
      c: {default: App_Random_Color()},
      iconSize:{default: "big"},
    },
    data () {
      return {}
    },
    created(){
    },
    updated(){
    },
    methods: {}
  }
</script>

<style scoped>
</style>
