import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Window.store = store

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component:()=> import('../pages/index/template.vue'),
    },
    {
      path: '/login',
      component:()=> import('../pages/Login/template.vue'),
    },
    {
      path: '/detail/:blogId',
      component:()=> import('../pages/detail/template.vue'),
    },
    {
      path: '/edit/:blogId',
      component:()=> import('../pages/edit/template.vue'),
      meta: {requireAuth: true},
    },
    {
      path: '/create',
      component:()=> import('../pages/create/template.vue'),
      meta: {requireAuth: true},

    },
    {
      path: '/user',
      component:()=> import('../pages/user/template.vue'),
    },
    {
      path: '/my',
      component:()=> import('../pages/my/template.vue'),
      meta: {requireAuth: true},

    },
    {
      path: '/register',
      component:()=> import('../pages/register/template.vue'),
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    store.dispatch('checkLogin').then(isLogin => {
      if (!isLogin) {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})


export default router
