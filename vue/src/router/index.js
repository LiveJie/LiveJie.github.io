import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component(resolve) {
        require.ensure(['../components/main.vue'], () => {
          resolve(require('../components/main.vue'));
        })
      }
    }
  ]
})
