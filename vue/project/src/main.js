// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueRescource from 'vue-resource';
import goods from  './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
Vue.use(VueRouter);
Vue.use(VueRescource);
const routes = [
  {path:'/goods',component:goods},
  {path:'/ratings',component:ratings},
  {path:'/seller',component:seller},
];
const router = new VueRouter({
  routes:routes
})
new Vue({
  router,
  render: h => h(App)
//components: { App }  vue1.0的写法
// render: h => h(App)    vue2.0的写法
}).$mount('#app');
router.push ('/goods');
