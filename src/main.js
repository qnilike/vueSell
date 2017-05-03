import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
import ratings from './components/ratings/ratings'


//npm安装必须要通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings',component: ratings }
]
const router = new VueRouter({
  linkActiveClass:'active',//配置路由选中状态(router-link-active)
  routes // （缩写）相当于 routes: routes
})

const app = new Vue({
  template:'<app/>',
  components:{ App },
  router
}).$mount('#app')
router.push('/goods');

