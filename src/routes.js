import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/index'
import Keystore from './pages/keystore'
import Terminal from './pages/terminal'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/keystore', component: Keystore },
    { path: '/terminal/:n', component: Terminal },
  ]
})

export default router
