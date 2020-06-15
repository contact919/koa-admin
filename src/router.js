import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import(/* webpackChunkName: 'Layout' */ './views/Layout/index')
const error = r => import(/* webpackChunkName: 'error' */ './views/404')
const login = r => import(/* webpackChunkName: 'login' */ './views/Mgr/login')
const goodsList = r => import(/* webpackChunkName: 'goodsList' */ './views/Goods/goodsList')
const goodsCreate = r => import(/* webpackChunkName: 'goodsCreate' */ './views/Goods/goodsCreate')
const goodsEdit = r => import(/* webpackChunkName: 'goodsEdit' */ './views/Goods/goodsEdit')
const orderList = r => import(/* webpackChunkName: 'orderList' */ './views/Order/orderList')
const custList = r => import(/* webpackChunkName: 'custList' */ './views/Cust/custList')
const testList = r => import(/* webpackChunkName: 'testList' */ './views/Cust/testList')
const avatar = r => import(/* webpackChunkName: 'personalSet' */ './views/Mgr/avatar')
const password = r => import(/* webpackChunkName: 'personalSet' */ './views/Mgr/password')

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
  { path:'', name:'test', component:Layout, children:[
    {path:'test', name:'testList', component:testList, meta:{ title: 'TEST', icon: 'order'}},
  ]},
  { path:'', name:'set', component:Layout, meta:{ title: '设置', icon: 'set' }, children:[
    {path:'avatar', name:'avatar', component:avatar, meta:{ title: '更换头像'}},
    {path:'password', name:'password', component:password, meta:{ title: '修改密码'}},
  ]},

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes
})

