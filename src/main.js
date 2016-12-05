import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
import ratings from './components/ratings/ratings'

//npm安装必须要通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter);

const routes = [
  { path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings',component: ratings }
]
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

const app = new Vue({
  template:'<app/>',
  components:{ App },
  router
}).$mount('#app')

