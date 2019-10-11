import request from '@/utils/request'
import { url } from './url'
export function queryAllLoans(data) { // 查询全部案件
  return request({
    url: url + 'collect/queryAllLoans',
    method: 'post',
    data
  })
}
export function queryCustomerList() { // 查询催收员
  return request({
    url: url + 'collect/queryCustomerList',
    method: 'post'
  })
}
export function RyCollectCall(data) { // 保存外呼信息接口
  return request({
    url: url + 'collect/saveCall',
    method: 'post',
    data
  })
}
export function saveResult(data) { // 保存催收结果接口
  return request({
    url: url + 'collect/saveResult',
    method: 'post',
    data
  })
}
export function queryLoanDetails(data) { // 查询借款详情接口
  return request({
    url: url + 'collect/queryLoanDetails',
    method: 'post',
    data
  })
}

export function queryCollectResult(data) { // 催收记录
  return request({
    url: url + 'collect/queryCollectResult',
    method: 'post',
    data
  })
}
export function queryCollectCall(data) { // 外呼记录
  return request({
    url: url + 'collect/queryCollectCall',
    method: 'post',
    data
  })
}

export function AllocateRequest(data) {
  return request({
    url: url + 'collect/batchAllocate',
    method: 'post',
    data
  })
}

export function queryMyAllLoans(data) {
  return request({
    url: url + 'collect/queryMyAllLoans',
    method: 'post',
    data
  })
}
