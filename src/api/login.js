import request from '@/utils/request'

export function LoginByUsername(data) {
  return request({
    url: '/Login/loginByUsername',
    method: 'post',
    data
  })
}
export function LoginByToken(data) {
  return request({
    url: '/Login/loginByToken',
    method: 'post',
    data
  })
}