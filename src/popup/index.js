import Vue from 'vue'
import store from '../store'
import router from '../routes'
import AppComponent from './App/App.vue'
import vuetify from '../plugins/vuetify'
import I18nHelper from '../helpers/i18n.helper'
import {rules} from '../helpers/validation.helper'
import SyncStorage from '../helpers/syncStorage.helper'

Vue.prototype.$syncStorage = new SyncStorage()
Vue.prototype.$rules = rules
Vue.prototype.$i18n = I18nHelper
Vue.component("app-component", AppComponent)

new Vue({
  el: "#app",
  store,
  router,
  vuetify,
  render: createElement => {
    return createElement(AppComponent);
  }
});
