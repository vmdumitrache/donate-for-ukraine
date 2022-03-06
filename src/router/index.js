import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '@/services/firebase'
Vue.use(VueRouter)

const DEFAULT_TITLE = 'Donate For Ukraine'
const publicRoutes = [
  {
    path: '/',
    name: 'Where to donate',
    component: () => import('@/views/MainView.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/external-resources',
    name: 'External Resources',
    component: () => import('@/views/ResourcesView.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/contact-us',
    name: 'Contact Us',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/admin/organisations/add/:id?',
    name: 'Add organisation',
    meta: {
      public: false
    },
    component: () => import('@/views/admin/organisations/AddOrganisationView.vue')
  },

  {
    path: '/admin/register',
    name: 'Register',
    component: () => import('@/views/admin/Register.vue'),
    meta: {
      disableIfLoggedIn: true,
      public: true
    }
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import('@/views/admin/LoginView.vue'),
    meta: {
      disableIfLoggedIn: true,
      public: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '*',
    redirect: '/404'
  }

]

const adminRoutes = [
  {
    path: '/admin/users',
    name: 'ADMIN - Users',
    meta: {
      public: true
    },
    component: () => import('@/views/admin/users/UsersView.vue')
  },
  {
    path: '/admin/organisations',
    name: 'ADMIN - Organisations',
    meta: {
      public: true
    },
    component: () => import('@/views/admin/organisations/OrganisationsView.vue')
  }

]

const routes = publicRoutes.concat(adminRoutes)

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
            if (claims.admin) {
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
