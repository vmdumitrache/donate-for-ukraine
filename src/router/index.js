import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '@/services/firebase'
Vue.use(VueRouter)

const DEFAULT_TITLE = 'Donate For Ukraine'
const routes = [
  {
    path: '/',
    name: 'Where to donate',
    component: () => import('../views/MainView.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/external-resources',
    name: 'External Resources',
    component: () => import('../views/ResourcesView.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/contact-us',
    name: 'Contact Us',
    component: () => import('../views/ContactView.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/organisations/add',
    name: 'Add organisation',
    meta: {
      public: false
    },
    component: () => import('../views/AddOrganisation.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      disableIfLoggedIn: true,
      public: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      disableIfLoggedIn: true,
      public: true
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

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = DEFAULT_TITLE + ' - ' + to.name || DEFAULT_TITLE
  })
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(userAuth => {
    if (userAuth) {
      if (to.meta.disableIfLoggedIn) {
        next({ path: '/' })
      } else if (!to.meta.public) {
        firebase.auth().currentUser.getIdTokenResult()
          .then(function ({
            claims
          }) {
            console.log(claims)
            if (!claims.admin) {
              next()
            } else {
              next({ path: '/' })
            }
          })
      } else {
        next()
      }
    } else {
      if (!to.meta.public) {
        next({ path: '/' })
      } else {
        next()
      }
    }
  })
})

export default router
