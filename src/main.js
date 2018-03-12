// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './vuex'
import router from './router'
import animate from 'animate.css'
import echarts from 'echarts'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(animate);
Vue.prototype.$echarts = echarts;

Vue.http.interceptors.push((request, next) => {

  // modify method
  request.method = 'POST';
  request.headers.set('Athena-TenantId', '1');
  if(localStorage.hasOwnProperty("token")) {
  	request.headers.set('Authorization', localStorage.token);
  }else {
  	console.log('localStorage没登录token');
  	window.location.href = '#/Load';
  }

  next((response) => {
    if (!response.body.__abp) {
      console.log('不是ABP框架');
      window.location.href = '#/Load';
      // request.respondWith(response.body, {
      //   "errorText": '不是ABP框架'
      // })
    } else if(response.body.unAuthorizedRequest) {
      console.log('登录超时');
      window.location.href = '#/Load';
      // request.respondWith(response.body, {
      //   "errorText": '未登录'
      // })
    }
  })

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h =>h(App)
})
