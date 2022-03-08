import Vue from 'vue'
import VueRouter from 'vue-router'
// import firebase from '@/services/firebase'
import store from '@/store'
Vue.use(VueRouter)

const DEFAULT_TITLE = 'Donate For Ukraine'
const publicRoutes = [
  {
    path: '/',
    name: 'Where to donate',
    component: () => import('@/views/MainView.vue'),
    meta: {
      requirements: {
        loggedIn: false,
        admin: false
      }
    }
  },
  {
    path: '/external-resources',
    name: 'External Resources',
    component: () => import('@/views/ResourcesView.vue'),
    meta: {
      requirements: {
        loggedIn: false,
        admin: false
      }
    }
  },
  {
    path: '/legal/terms-and-conditions',
    name: 'Terms and Conditions',
    meta: {
      requirements: {
        loggedIn: false,
        admin: false
      }
    },
    component: () => import('@/views/legal/TermsAndConditions.vue')
  },
  {
    path: '/legal/privacy-policy',
    name: 'Privacy Policy',
    meta: {
      requirements: {
        loggedIn: false,
        admin: false
      }
    },
    component: () => import('@/views/legal/PrivacyPolicy.vue')
  },
  {
    path: '/legal/cookie-policy',
    name: 'Cookie Policy',
    meta: {
      requirements: {
        loggedIn: false,
        admin: false
      }
    },
    component: () => import('@/views/legal/CookiePolicy.vue')
  },
  {
    path: '/contact-us',
    name: 'Contact Us',
    meta: {
      requirements: {
        loggedIn: false,
        admin: false
      }
    },
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/admin/organisations/add',
    name: 'Add organisation',
    meta: {
      requirements: {
        loggedIn: true,
        admin: true
      }
    },
    component: () => import('@/views/admin/organisations/AddOrganisationView.vue')
  },
  {
    path: '/admin/organisations/edit/:id?',
    name: 'Edit organisation',
    meta: {
      requirements: {
        loggedIn: true,
        admin: true
      }
    },
    component: () => import('@/views/admin/organisations/AddOrganisationView.vue')
  },

  {
    path: '/admin/register',
    name: 'Register',
    meta: {
      requirements: {
        loggedIn: false,
        admin: false,
        strictAnonymous: true
      }
    },
    component: () => import('@/views/admin/Register.vue')
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import('@/views/admin/LoginView.vue'),
    meta: {
      requirements: {
        loggedIn: false,
        admin: false,
        strictAnonymous: true
      }
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      requirements: {
        loggedIn: false,
        admin: false
      }
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
      requirements: {
        loggedIn: true,
        admin: true
      }
    },
    component: () => import('@/views/admin/users/UsersView.vue')
  },
  {
    path: '/admin/organisations',
    name: 'ADMIN - Organisations',
    meta: {
      requirements: {
        loggedIn: true,
        admin: true
      }
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
  const isLoggedIn = store.state.user.loggedIn
  const isAdmin = store.state.user.admin

  if (
    (to.meta.requirements.admin && !isAdmin) ||
    (to.meta.requirements.loggedIn && !isLoggedIn) ||
    (to.meta.requirements.strictAnonymous && isLoggedIn)
  ) {
    next({ path: '/404' })
  }
  if (to !== from) {
    next()
  }
})

export default router
