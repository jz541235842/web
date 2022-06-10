import request from '@/utils/request'
import { url } from './url'
export function login(data) {
  return request({
    url: url + 'authAdmin/passwordLogin',
    method: 'post',
    data
  })
}

export function getRoute(data) {
  return request({
    url: url + 'rule/queryMyRule',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: url + 'authAdmin/noLogin',
    method: 'post'
  })
}

export function queryAllMessage(data) { // 查询全部用户
  return request({
    url: url + 'manage/queryMessage',
    method: 'post',
    data
  })
}
// 沟通记录
export function queryCallRecordList(data) {
  return request({
    url: url + 'manage/queryCallRecord',
    method: 'post',
    data
  })
}
// 用户个人信息
export function queryUserMessage(data) {
  return request({
    url: url + 'manage/queryDetailedMessage',
    method: 'post',
    data
  })
}
// 系统消息查询
export function queryDetailedMessage(data) {
  return request({
    url: url + 'manage/queryUserMessage',
    method: 'post',
    data
  })
}
// 短信消息查询
export function queryUserSms(data) {
  return request({
    url: url + '/manage/queryUserSms',
    method: 'post',
    data
  })
}
