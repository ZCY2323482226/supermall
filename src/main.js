import App from './App.vue'
import router from './router'
import Vue from 'vue'
import store from './store'
import toast from "./components/common/toast"
import FastClick from "fastclick"
import VueLzayLoad from "vue-lazyload"

Vue.config.productionTip = false
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 安装vue-lazyload插件
Vue.use(VueLzayLoad,{
  // 使用占位图
  loading:require('./assets/img/common/placeholder.png')
})

Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
