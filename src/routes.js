import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/index'
import Keystore from './pages/keystore'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/keystore', component: Keystore }
  ]
})

export default router
