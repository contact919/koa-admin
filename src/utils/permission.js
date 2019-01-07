import router from '@/router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

// 全局路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 此处注意不能陷入死循环 ！
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
})

router.afterEach(() => {
  NProgress.done()
})