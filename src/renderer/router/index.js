import Vue from 'vue'
import Router from 'vue-router'
// import home from '../views/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('../views/home/home.vue')
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/views/login/login').default
    }
  ]
})