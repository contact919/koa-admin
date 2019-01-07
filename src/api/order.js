import request from '@/utils/request'

export function OrderList(data) {
  return request({
    url: '/Order/OrderList',
    method: 'post',
    data
  })
}