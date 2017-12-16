<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>


    <div class="ui teal buttons">
      <div class="ui button">Save</div>
      <div class="ui combo top right pointing dropdown icon button">
        <i class="dropdown icon"></i>
        <div class="menu">
          <div class="item"><i class="edit icon"></i> Edit</div>
          <div class="item"><i class="delete icon"></i> Delete</div>
          <div class="item"><i class="hide icon"></i> Hide</div>
        </div>
      </div>
    </div>

    <hr/>
    <button @click="inc()">+</button>
    <button @click="dec()">-</button>
    {{ count }}
  </div>
</template>

<script>
  import $ from 'jquery'
  import {mapState} from "vuex";
  export default {
    name: 'hello',
    data(){
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: mapState([
      'count'
    ]),
    methods: {
      inc () {
        this.$store.commit('inc')
      },
      dec () {
        this.$store.commit('dec')
      }
    },
    mounted(){
      console.log(1)
      $('.combo.dropdown')
        .dropdown({
          action: 'combo'
        })
      ;
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
