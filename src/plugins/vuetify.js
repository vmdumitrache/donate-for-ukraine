import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret, faBuildingColumns, faCreditCard, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

import { faCcPaypal, faBitcoin } from '@fortawesome/free-brands-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret, faCcPaypal, faBuildingColumns, faBitcoin, faCreditCard, faUpRightFromSquare)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: true }
})
