// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'Axios'


// 1.導入組件
import Goods from './components/Goods/Goods'
import Ratings from './components/Ratings/Ratings'
import Seller from './components/Seller/Seller'
Vue.config.productionTip = false

// 安裝vue-router套件
Vue.use(VueRouter);
//如果在其他組件中使用axios命令，需要改寫為vue原生屬性
Vue.prototype.$axios = Axios;


// 2.定義路由 {path:'命名路由',component:映射的組件}
const routes = [
  { //重新定向讓初始頁面跳轉道goods產生內容
    path:'/',redirect:'/goods'
  },
  {
    path:'/goods',component:Goods
  },
  {
    path:'/ratings',component:Ratings
  },
  {
    path:'/seller',component:Seller
  }
];
// 3.創建router實例  也就是把上一步定義好的路由導入
const router = new VueRouter({
  routes,
  // 選中後的類名,(默認值router-link-active)
  linkActiveClass:'active'
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 4.創建&掛載根實例
  router
})
