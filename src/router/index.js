import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DocView from '../views/DocView.vue'
import ProtocolView from '../views/ProtocolView.vue'
import DatabaseView from '../views/DatabaseView.vue'
import VpsView from '../views/VpsView.vue'
import ArchView from '../views/ArchView.vue'

const routes = [
  { path: '/', redirect: '/docs/arch/general' },
  { path: '/docs', redirect: '/docs/arch/general' },
  { path: '/docs/arch/:feature', component: ArchView },
  { path: '/docs/:section/:feature', component: DocView },
  { path: '/protocols', redirect: '/protocols/auth/login' },
  { path: '/protocols/:section/:feature', component: ProtocolView },
  { path: '/database', component: DatabaseView },
  { path: '/database/:collection', component: DatabaseView },
  { path: '/vps', redirect: '/vps/arquitectura' },
  { path: '/vps/:section', component: VpsView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
