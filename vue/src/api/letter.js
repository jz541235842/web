import request from '@/utils/request'
import { url } from './url'
// 全部审批  初审  复审
export function allApplications(data) {
  return request({
    url: url + 'examine/getExamineList?_test=true',
    method: 'post',
    data
  })
}
// 初审首页 和  复审
export function firstTrial(data) {
  return request({
    url: url + 'examine/setExamineResult?_test=true',
    method: 'post',
    data
  })
}
// 审批页
export function approvalDetails(data) {
  return request({
    url: url + 'examine/getUserDetailed',
    method: 'post',
    data
  })
}

// 哈哈哈哈  获取审批状态
export function getExamineStatus(data) {
  return request({
    url: url + 'examine/getExamineStatus',
    method: 'post',
    data
  })
}
// 获取审批状态 复审
export function getRepatStatus() {
  return request({
    url: url + 'examine/repatStatus',
    method: 'post'
  })
}
// 获取审批状态
export function getMachinelResult() {
  return request({
    url: url + 'examine/machineAudit',
    method: 'post'
  })
}
// 获取审批状态
export function getApprovalRecord(data) {
  return request({
    url: url + 'examine/getExamineLog',
    method: 'post',
    data
  })
}
// 添加电审记录
export function addPhoneRecord(data) {
  return request({
    url: url + 'examine/setExaminePhone',
    method: 'post',
    data
  })
}
// 订单分配
export function distribution(data) {
  return request({
    url: url + 'examine/distri',
    method: 'post',
    data
  })
}

// 哈哈哈  获取信审管理员
export function getExamineAdmin(data) {
  return request({
    url: url + 'examine/getExamineAdmin',
    method: 'post',
    data
  })
}

// 预先获取电审结果
export function getPhoneResult() {
  return request({
    url: url + 'examine/getElectricalExaminationStatus',
    method: 'post'
  })
}
// 初审 获取初审下拉菜单的审批状态
export function getIssue() {
  return request({
    url: url + 'examine/getIssue',
    method: 'post'
  })
}
// 初审 获取初审下拉菜单的审批状态
export function getReasonsForRefusal() {
  return request({
    url: url + 'examine/ReasonsForRefusal',
    method: 'post'
  })
}
// 初审和复审 审批
export function goApproval(data) {
  return request({
    url: url + 'examine/setExamineResult',
    method: 'post',
    data
  })
}
