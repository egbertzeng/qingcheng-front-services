<template>
  <div class="ui container">
    <!--<button class="ui button" @click="pdfModalClick()">pdf1</button>-->
    <!--<div class="ui button" @click="pdfModalClick2()">pdf2</div>-->
    <!--<div class="ui button" @click="blog()">blog</div>-->

    <!--<div class="embed-responsive embed-responsive-16by9" style="height: 3000px; width: 100% ;">-->
    <!--<iframe class="embed-responsive-item" src="/libs/public/index.html"></iframe>-->
    <!--</div>-->

    <!--<img :src="imagescr" style="width: 100px;height: 100px;background-color: green;">-->
    <!--{{imagescr}}-->


  </div>
</template>

<script type="text/javascript">
  import {PDFLAYER_CALLER} from "../common/PdfPlayer/PdfPlayerFullScreenCaller";
  export default {
    data () {
      return {
        imagescr: "test"
      }
    },
    created(){
      this.getBlog();
    },
    updated(){
      //this.getBlog();
    },
    methods: {
      getBlog(){
      },

    }
  }
</script>

<style scoped>
</style>
