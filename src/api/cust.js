import request from '@/utils/request'

export function CustList(data) {
  return request({
    url: '/Cust/custList',
    method: 'post',
    data
  })
}