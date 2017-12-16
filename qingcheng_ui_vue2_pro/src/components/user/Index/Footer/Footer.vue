<template>
  <div id="appFooter" class=" navbar-fixed-bottom ui fluid inverted  stackable segment  "
  style=" position: relative;margin-top: 2%;width: 400%; margin-left:-2%;margin-bottom:-16px;z-index:99999">
    <div class="ui fluid inverted  segment footer ">
      <div class="ui fluid center  aligned container">
        <!--<div class="ui  inverted divided grid">-->
        <!--<div class="three wide column">-->
        <!--<h4 class="ui inverted header">课程动态</h4>-->
        <!--<div class="ui inverted link list">-->
        <!--<a href="#" class="item">Link One</a>-->
        <!--<a href="#" class="item">Link Two</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="three wide column">-->
        <!--<h4 class="ui inverted header">教员动态</h4>-->
        <!--<div class="ui inverted link list">-->
        <!--<a href="#" class="item">Link One</a>-->
        <!--<a href="#" class="item">Link Two</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="three wide column">-->
        <!--<h4 class="ui inverted header">学员动态</h4>-->
        <!--<div class="ui inverted link list">-->
        <!--<a href="#" class="item">Link One</a>-->
        <!--<a href="#" class="item">Link Two</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="seven wide column">-->
        <!--<h4 class="ui inverted header">公司动态</h4>-->
        <!--<div class="ui inverted link list">-->
        <!--<a href="#" class="item">Link One</a>-->
        <!--<a href="#" class="item">Link Two</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="ui inverted section divider"></div>-->
        <!--<img src="http://www.semantic-ui.cn/examples/assets/images/logo.png" class="ui centered mini image"/>-->
        <div class="ui horizontal inverted small divided link list">
          <!--<a class="item" href="#">®关于我们</a>-->
          <!--<a class="item" href="#">服务条款</a>-->
          <!--<a class="item" href="#">联系我们</a>-->
          <!--<a class="item" href="#">招贤纳士</a>-->
          <!--<a class="item" href="#">商务合作</a>-->
          <!--<a class="item" href="#">网站导航</a>-->
          <a class="item" href="#">{{app_copyright_info}}</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">
  import {APP_COPYRIGHT_INFO} from "../../../../common/AppSysConstants";
  export default {
    data () {
      return {
        app_copyright_info: APP_COPYRIGHT_INFO,
      }
    },
    mounted(){

    },
    methods: {}
  }
</script>

<style scoped>
</style>
