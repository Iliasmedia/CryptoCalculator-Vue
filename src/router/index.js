import Vue from 'vue'
import Router from 'vue-router'
import Crypto from '@/components/Crypto'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'crypto',
      component: Crypto
    }
  ]
})
