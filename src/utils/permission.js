import router from '@/router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

// 全局路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 此处注意不能陷入死循环 一定要确保要调用 `next()` 方法，否则钩子就不会被 resolved！
  if (!getToken()) {
    if (to.path === '/login') {
      next()
    }else {
      next({ path: '/login' })
      NProgress.done()
    }
  }else {
    if (to.path === '/login') {
      next({ path: '/goodsList' })
      NProgress.done()
    } else {
      next()
    }
  }

  /** OR THIS
   * if(to.path == '/login'){
      if(token != 'null' && token != null){
        next('/goodslist')
      }
      next();
    }else{
      if(token != 'null' && token != null){
        next()
      }else{
        next('/login') // 否则跳转回登录页
      }
    }
   */
})

router.afterEach(() => {
  NProgress.done()
})