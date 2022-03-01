import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from '@/store'
import VueGtag from 'vue-gtag'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false

Vue.use(VueCookie)

const cookiesEnabled = VueCookie.get('acceptedCookies') === 'true' ?? true

console.log({ cookiez: cookiesEnabled })

Vue.use(VueGtag, {
  config: { id: 'G-XHHDMJLZSD' },
  enabled: cookiesEnabled,
  pageTrackerScreenviewEnabled: true,
  appName: 'Donate for Ukraine'
}, router)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
