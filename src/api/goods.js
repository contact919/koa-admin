import request from '@/utils/request'

export function GoodsList(data) {
  return request({
    url: '/Goods/goodsList',
    method: 'post',
    data
  })
}
export function GoodsCreate(data) {
  return request({
    url: '/Goods/goodsCreate',
    method: 'post',
    data
  })
}
export function GoodsDelete(data) {
  return request({
    url: 'Goods/goodsDelete',
    method: 'post',
    data
  })
}
export function GoodsEdit(data) {
  return request({
    url: '/Goods/goodsEdit',
    method: 'post',
    data
  })
}
export function GoodsUpdate(data) {
  return request({
    url: '/Goods/goodsUpdate',
    method: 'post',
    data
  })
}