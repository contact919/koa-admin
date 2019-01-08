const Token = 'authorization'
const Mgr = 'mgr'
// token
export function getToken() {
  return localStorage.getItem(Token)
}

export function setToken(val) {
  return localStorage.setItem(Token, val)
}

export function removeToken() {
  return localStorage.removeItem(Token)
}
// 管理员信息
export function getMgr() {
  return JSON.parse(localStorage.getItem(Mgr))
}

export function setMgr(mgr) {
  return localStorage.setItem(Mgr, JSON.stringify(mgr))
}

export function removeMgr() {
  return localStorage.removeItem(Mgr)
}

// clear all
export function clear() {
  return localStorage.clear()
}


