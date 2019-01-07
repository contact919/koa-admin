const Token = 'authorization'

export function getToken() {
  return localStorage.getItem(Token)
}

export function setToken(val) {
  return localStorage.setItem(Token, val)
}

export function removeToken() {
  return localStorage.removeItem(Token)
}
