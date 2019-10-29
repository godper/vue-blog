import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'

import ElementUI from 'element-ui';
import './css/index.css';
Vue.use(ElementUI); 

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
