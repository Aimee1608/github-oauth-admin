import request from './index'
const PATH = '/user'

export function login(data) {
  return request({
    url: `${PATH}/login`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: `${PATH}/logout`,
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: `${PATH}/getUserInfo`,
    method: 'get'
  })
}

export function getAllUser() {
  return request({
    url: `${PATH}/getAllUser`,
    method: 'get'
  })
}
