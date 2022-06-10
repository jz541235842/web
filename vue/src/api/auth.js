import request from '@/utils/request'

export function route(data) {
  return request({
    url: '/admin/rule/queryMyRule', // 假地址 自行替换
    method: 'post',
    data
  })
}
