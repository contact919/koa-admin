import request from '@/utils/request'

export function LoginByUsername(data) {
  return request({
    url: '/Mgr/loginByUsername',
    method: 'post',
    data
  })
}
export function LoginByToken(data) {
  return request({
    url: '/Mgr/loginByToken',
    method: 'post',
    data
  })
}
export function Info(tk) {
  return request({
    url: `/Mgr/info?token=${tk}`,
  })
}
export function ChangePwd(data) {
  return request({
    url: '/Mgr/changePwd',
    method: 'post',
    data
  })
}