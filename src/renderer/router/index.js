import Vue from 'vue'
import Router from 'vue-router'
// import home from '../views/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //name:'home',
      component: () => import('../views/home/home.vue'),
      children: [
        // 这个重定向做的是错误的，导致了页面不渲染
        //{
        //   path: '/',
        //   redirect: () => import('../views/apply/apply.vue')
        // },
        {
          path: 'apply', //注意子组件这里是没有 / 的,没有为什么，就是 vue-router 的格式要求
          name: 'apply',
          component: () => import('../views/apply/apply.vue')
        },
        {
          path: 'success',
          name: 'success',
          component: () => import('../views/success/success.vue')
        },
        {
          path: 'fail',
          name: 'fail',
          component: () => import('../views/fail/fail.vue')
        }
      ]
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