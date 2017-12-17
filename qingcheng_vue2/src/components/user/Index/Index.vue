<template>
  <div class="ui fluid container " style="margin-bottom: 0px;padding-bottom: 0px;">
    <myheader></myheader>
    <transition name="bounce">
      <router-view class="app " ></router-view>
    </transition>
  </div>
</template>
<script type="text/javascript">

  import $ from 'jquery'
  import {App_Ajax_Get} from  '../../../common/VueResourceApi'
  import  Footer from './Footer/Footer.vue'
  import  Header from './Header/Header.vue'
  export default {
    components: {
      "myheader": Header,
      "myfooter": Footer,
    },
    created(){
    },

    mounted() {
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style scoped>
  .app {
    /*解决footer不能固定到底部的问题*/
    min-height: 660px;
  }

  /*!*动画效果*!*/
  /*.bounce-enter-active {*/
    /*animation: bounce-in .2s;*/
  /*}*/

  /*.bounce-leave-active {*/
    /*animation: bounce-in .2s reverse;*/
  /*}*/

  /*@keyframes bounce-in {*/
    /*0% {*/
      /*transform: scale(0);*/
    /*}*/
    /*30% {*/
      /*transform: scale(0.1);*/
    /*}*/
    /*40% {*/
      /*transform: scale(0.3);*/
    /*}*/
    /*50% {*/
      /*transform: scale(0.5);*/
    /*}*/
    /*100% {*/
      /*transform: scale(1);*/
    /*}*/
  /*}*/
</style>
