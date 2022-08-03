import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/layout/home'),
      },
      {
        path: 'qa',
        component: () => import('@/views/layout/qa'),
      },
      {
        path: 'video',
        component: () => import('@/views/layout/video'),
      },
      {
        path: 'my',
        component: () => import('@/views/layout/my'),
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
  {
    path: '/user/collect',
    component: () => import('@/views/user/collect'),
    meta: {
      needToken: true,
    },
  },
  {
    path: '/user/history',
    component: () => import('@/views/user/history'),
    meta: {
      needToken: true,
    },
  },
  {
    path: '/search',
    component: () => import('@/views/search'),
  },
  {
    path: '/article/:article_id',
    component: () => import('@/views/article'),
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user/user-profile'),
    meta: {
      needToken: true,
    },
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needToken) {
    if (store.getters.token) {
      next()
    }
    else {
      next('/login?url=' + to.path)
    }
  }
  else {
    next()
  }
})

export default router
