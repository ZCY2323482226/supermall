<template>
  <div id="app">
    <!-- keep-alive让Home不要随意销毁掉 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-Bar></main-tab-Bar>

  </div>
</template>

<script>

import MainTabBar from './components/content/mainTabbar/MainTabbar.vue'
export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import './assets/css/base.css';

</style>
