import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Buscador from '../views/Buscador.vue'
import Recomendador from '../views/Recomendador.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/buscador',
    name: 'buscador',
    component: Buscador
  },
  {
    path: '/recomendador',
    name: 'recomendador',
    component: Recomendador
  }
]

const router = new VueRouter({
  routes
})

export default router
