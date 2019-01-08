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
export function SetPwd(data) {
  return request({
    url: '/Mgr/setPwd',
    method: 'post',
    data
  })
}
export function SetAvatar(data) {
  return request({
    url: '/Mgr/setAvatar',
    method: 'post',
    data
  })
}
