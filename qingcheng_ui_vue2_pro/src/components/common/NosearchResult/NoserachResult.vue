<template>
  <!--搜索无结果的提示-->
  <div v-if="searchResultIsNull" class="ui icon  message":class="[mainColor]"
       style="margin-left:1%;margin-top: 2%;margin-bottom: 1%;cursor: pointer;">
    <i class="big frown icon"></i>
    <div class="content">
      <div class="header">非常抱歉!</div>
      <ol class="list">
        <li>非常抱歉,没有检索到您需要要的内容.</li>
        <li>如需继续搜索其他内容,请更换搜索条件.</li>
      </ol>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {App_Red_Color} from "../../../common/AppColorConstants";
  export default {
    data () {
      return {
        searchResultIsNull: "",
        mainColor:App_Red_Color(),
      }
    },
    created(){
      this.setNewsearchResult();
    },

    watch: {
      '$store.state.searchResultIsNull': 'setNewsearchResult'
    },
    methods: {
      setNewsearchResult(){
        this.searchResultIsNull=false;
        this.searchResultIsNull = this.$store.state.searchResultIsNull;
      }
    }
  }
</script>

<style scoped>
</style>
