import Vue from 'vue'
import Router from 'vue-router'

const Layout = r => require.ensure([], () => r(require('./views/Layout/index')), 'Layout')
const error = r => require.ensure([], () => r(require('./views/404')), 'error')
const login = r => require.ensure([], () => r(require('./views/Mgr/login')), 'login')
const goodsList = r => require.ensure([], () => r(require('./views/Goods/goodsList')), 'goodsList')
const goodsCreate = r => require.ensure([], () => r(require('./views/Goods/goodsCreate')), 'goodsCreate')
const goodsEdit = r => require.ensure([], () => r(require('./views/Goods/goodsEdit')), 'goodsEdit')
const orderList = r => require.ensure([], () => r(require('./views/Order/orderList')), 'orderList')
const custList = r => require.ensure([], () => r(require('./views/Cust/custList')), 'custList')
const avatar = r => require.ensure([], () => r(require('./views/Mgr/avatar')), 'avatar')
const password = r => require.ensure([], () => r(require('./views/Mgr/password')), 'password')

Vue.use(Router)

const routes = [
  { path:'/login',  name:'login', component:login, hidden:true },
  { path:'/404', name:'error', component:error, hidden:true },
  { path: '/', redirect: '/login', hidden: true },
 
  { path:'', name:'goods', component:Layout, children:[
    {path:'goodsList', name:'goodsList', component:goodsList, meta:{ title: '商品管理', icon: 'goods'}},
    {path:'goodsCreate', name:'goodsCreate', component:goodsCreate, meta:{ title: '商品创建' }, hidden: true},
    {path:'goodsEdit', name:'goodsEdit', component:goodsEdit, meta:{ title: '商品编辑' }, hidden:true},
  ]},
  { path:'', component:Layout, children:[
    {path:'orderList', name:'orderList', component:orderList, meta:{ title: '订单管理', icon: 'order' }},
  ]},
  { path:'', name:'cust', component:Layout, children:[
    {path:'custList', name:'custList', component:custList, meta:{ title: '用户管理', icon: 'cust'}},
  ]},
  { path:'', name:'set', component:Layout, meta:{ title: '设置', icon: 'set' }, children:[
    {path:'avatar', name:'avatar', component:avatar, meta:{ title: '更换头像'}},
    {path:'password', name:'password', component:password, meta:{ title: '修改密码'}},
  ]},

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes
})

