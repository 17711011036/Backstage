<template>
  <div id="app">
    <div class="login" v-if="$root.a">
      <login> </login>
    </div>
    <div class="index" v-else>
      <myheader class="header"> </myheader>
      <mainNav class="Nav"> </mainNav>
      <div id="myindex" :style="{background: this.$bg}">
        <div class="my">
          <router-view> </router-view>
        </div>
      </div>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import nav from './components/index/mainnav'
import index from './components/index/index'
import header from './components/index/myheader'
import login from './components/index/login'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: { },
  created () {
    this.$axios.get('/xxm/jinru')
      .then(resp => {
        this.$login(resp.data)
        console.log(resp.data)
      })
  },
  components: {
    mainNav: nav,
    index: index,
    myheader: header,
    login: login
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
*{
  margin: 0;
  padding: 0;
}
html,body {
  height: 100%;
  width: 100%;
}
body{
  position: relative;
  background: url("./assets/bg.png") fixed;
  overflow-y: hidden;
}
#app {
  height: 100%;
}
#myindex{
  width: 85%;
  float: right;
  /*width: 1145px;*/
  height: 930px;
  margin-top: 65px;
  background: white;
  overflow: scroll;
  /*overflow-y: visible;*/
}
.my{
  width: 100%;
  height: 140%;
}
.header{
  position: fixed;
}
.Nav{
  position: fixed;
  top: 65px;
}
.login{
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
