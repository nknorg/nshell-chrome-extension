import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas, fab, far)
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'faSvg',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {

    },
  },
});
