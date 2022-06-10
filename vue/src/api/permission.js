import request from '@/utils/request'
import { url } from './url'
export function queryAllRule() {
  return request({
    url: url + 'rule/queryAllRule',
    method: 'post'
  })
}
export function queryAuthById(data) {
  return request({
    url: url + 'rule/queryAuthById',
    method: 'post',
    data
  })
}

export function editAuthRule(data) {
  return request({
    url: url + '/rule/editAuthRule',
    method: 'post',
    data
  })
}
export function addAuthRule(data) {
  return request({
    url: url + 'rule/addAuthRule',
    method: 'post',
    data
  })
}
export function queryAuthGroupList() {
  return request({
    url: url + 'group/queryAuthGroupList',
    method: 'post'
  })
}
export function editAuthGroup(data) {
  return request({
    url: url + 'group/editAuthGroup',
    method: 'post',
    data
  })
}

export function addAuthGroup(data) {
  return request({
    url: url + 'group/addAuthGroup',
    method: 'post',
    data
  })
}

export function queryRoleList(data) {
  return request({
    url: url + 'role/queryRoleList',
    method: 'post',
    data
  })
}

export function unbanAdmin(data) {
  return request({
    url: url + 'authAdmin/unbanAdmin',
    method: 'post',
    data
  })
}

export function queryRoleById(data) {
  return request({
    url: url + 'role/queryRoleById',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: url + 'role/editRole',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: url + 'role/addRole',
    method: 'post',
    data
  })
}

export function queryAdminList(data) {
  return request({
    url: url + 'authAdmin/queryAdminList',
    method: 'post',
    data
  })
}

export function banAdmin(data) {
  return request({
    url: url + 'authAdmin/banAdmin',
    method: 'post',
    data
  })
}
export function editAuthAdmin(data) {
  return request({
    url: url + 'authAdmin/editAuthAdmin',
    method: 'post',
    data
  })
}

export function addAuthAdmin(data) {
  return request({
    url: url + 'authAdmin/addAuthAdmin',
    method: 'post',
    data
  })
}

export function banRole(data) {
  return request({
    url: url + '/role/banRole',
    method: 'post',
    data
  })
}

export function unbanRole(data) {
  return request({
    url: url + '/role/unbanRole',
    method: 'post',
    data
  })
}

export function queryBasicRole() {
  return request({
    url: url + '/role/queryBasicRole',
    method: 'post'
  })
}
