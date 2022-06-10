import request from '@/utils/request'
import { urlc, url } from './url'
// 查询催收组接口 保存或更新催收组接口
export function queryGroup() {
  return request({
    url: urlc + 'collect/queryGroup',
    method: 'post'
  })
}
// 查询催收组接口 保存或更新催收组接口
export function saveOrUpdateGroup(data) {
  return request({
    url: urlc + 'collect/saveOrUpdateGroup',
    method: 'post',
    data
  })
}
// 查询催收员接口
export function queryCustomer(data) {
  return request({
    url: urlc + 'collect/queryCustomer',
    method: 'post',
    data
  })
}
// 保存或更新催收员接口
export function saveOrUpdateCustomer(data) {
  return request({
    url: urlc + 'collect/saveOrUpdateCustomer',
    method: 'post',
    data
  })
}

// 添加信审组和修改信审组
export function addLetterTeam(data) {
  return request({
    url: url + 'group/setTeam',
    method: 'post',
    data
  })
}
// 添加信审组和修改信审组
export function getLetterTeamList(data) {
  return request({
    url: url + 'group/groupTeam',
    method: 'post',
    data
  })
}
// 添加信审员和修改信审员
export function addLetterPeople(data) {
  return request({
    url: url + 'group/setMember',
    method: 'post',
    data
  })
}
// 获取  信审员列表
export function getLetterPeopleList(data) {
  return request({
    url: url + 'group/groupMember',
    method: 'post',
    data
  })
}
// 获取  产品配置列表
export function productConfigList(data) {
  return request({
    url: url + 'resource/listLongConfig',
    method: 'post',
    data
  })
}
// 获取  产品配置新增
export function addProductConfig(data) {
  return request({
    url: url + 'resource/insertLoanConfigInfo',
    method: 'post',
    data
  })
}
// 获取  产品配置修改
export function updateProductConfig(data) {
  return request({
    url: url + 'resource/updateLoanConfigInfo',
    method: 'post',
    data
  })
}

// 修改产品规则状态
export function changeStatus(data) {
  return request({
    url: url + 'resource/changeLoanConfigStatus',
    method: 'post',
    data
  })
}
