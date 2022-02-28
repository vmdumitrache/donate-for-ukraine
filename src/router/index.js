import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Where to donate',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/about',
    name: 'About us',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/organisations/add',
    name: 'Add organisation',
    component: () => import('../views/AddOrganisation.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      disableIfLoggedIn: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      disableIfLoggedIn: true
    }
  },
  {
    path: '*',
    redirect: '/404'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
