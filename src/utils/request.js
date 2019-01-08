import axios from 'axios'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => response,

  error => {
    if (error.response.status === 401) { //token验证错误
      MessageBox.alert('身份过期，请重新登录', '未登录', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        removeToken()
        location.reload()
        // store.dispatch('FedLogOut').then(() => {
        // })
      })
      return Promise.reject('error')
    }else{
      Message({
        message: error.message, //其它错误统一处理
        type: 'error',
      })
    }
    return Promise.reject(error)
  }
)

export default service
