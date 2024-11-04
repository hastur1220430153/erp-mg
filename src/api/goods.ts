import ApiCommonRequest from '../service'

/**
 * 获取商品列表
 */
export function api_get_goods_list(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/goods/list',
    method: 'GET',
    data,
  })
}

/**
 * 获取商品详情
 */
export function api_get_goods_detail(data: { id: any }) {
  return ApiCommonRequest<{ id: any }, ApiGoods.GoodsDetailData>({
    url: '/api/back/goods/detail',
    method: 'GET',
    data,
  })
}

/**
 * 新增商品
 */
export function api_add_goods(data: any) {
  return ApiCommonRequest<undefined>({
    url: '/api/back/goods/create',
    method: 'POST',
    data,
  })
}

/**
 * 编辑商品
 */
export function api_edit_goods(data: ApiGoods.GoodsEditProps) {
  return ApiCommonRequest<ApiGoods.GoodsEditProps>({
    url: '/api/back/goods/update',
    method: 'POST',
    data,
  })
}

/**
 * 快速编辑商品
 */
export function api_quick_edit_goods(data: ApiGoods.GoodsQuickEditProps) {
  return ApiCommonRequest<ApiGoods.GoodsQuickEditProps>({
    url: '/api/back/goods/quickedit',
    method: 'POST',
    data,
  })
}

/**
 * 商品白名单列表
 */
export function api_get_goods_white_list(data: ApiGoods.GoodsWhiteListProps) {
  return ApiCommonRequest<ApiGoods.GoodsWhiteListProps>({
    url: '/api/back/goods/whitelist',
    method: 'GET',
    data,
  })
}

/**
 * 商品白名单导入
 */
export function api_add_goods_white_list(data: ApiGoods.GoodsAddWhiteListProps) {
  return ApiCommonRequest<ApiGoods.GoodsAddWhiteListProps>({
    url: '/api/back/goods/whitelist/add',
    method: 'POST',
    data,
  })
}

/**
 * 商品白名单批量删除
 */
export function api_delete_goods_white_list(data: ApiGoods.GoodsDeleteWhiteListProps) {
  return ApiCommonRequest<ApiGoods.GoodsDeleteWhiteListProps>({
    url: '/api/back/goods/whitelist/delete',
    method: 'POST',
    data,
  })
}

/**
 * 积分商品订单列表
 */
export function api_get_goods_order_list(data: ApiGoods.GoodsOrderListProps) {
  return ApiCommonRequest<ApiGoods.GoodsOrderListProps, ApiGoods.GoodsOrderListData[]>({
    url: '/api/back/order/list',
    method: 'GET',
    data,
  })
}

/**
 * 订单商品下拉列表
 */
export function api_get_goods_order_dropdown_goods_id_list() {
  return ApiCommonRequest<undefined, BaseDropDownData>({
    url: '/api/back/order/dropdown/goods_id',
    method: 'GET',
  })
}

/**
 * 订单状态下拉列表
 */
export function api_get_goods_order_dropdown_status_list() {
  return ApiCommonRequest<undefined, BaseDropDownData>({
    url: '/api/back/order/dropdown/status',
    method: 'GET',
  })
}

/**
 * 订单列表导出
 */
export function api_get_goods_order_export_excel(data: ApiGoods.GoodsOrderExportExcelProps) {
  return ApiCommonRequest<ApiGoods.GoodsOrderExportExcelProps>({
    url: '/api/back/order/export/excel',
    method: 'GET',
    data,
    responseType: 'blob',
  })
}

/**
 * 获取订单详情
 */
export function api_get_goods_order_detail(data: { id: any }) {
  return ApiCommonRequest<{ id: any }, ApiGoods.GoodsOrderDetailData>({
    url: '/api/back/order/detail',
    method: 'GET',
    data,
  })
}

/**
 * 获取订单详情
 */
export function api_edit_goods_order_detail(data: ApiGoods.EditGoodsOrderDetailProps) {
  return ApiCommonRequest<ApiGoods.EditGoodsOrderDetailProps>({
    url: '/api/back/order/update',
    method: 'POST',
    data,
  })
}

/**
 * 取消订单并退积分
 */
export function api_cancel_goods_order(data: ApiGoods.CancelGoodsProps) {
  return ApiCommonRequest<ApiGoods.CancelGoodsProps>({
    url: '/api/back/order/revert',
    method: 'POST',
    data,
  })
}

/**
 * 批量修改订单
 */
export function api_batch_edit_order(data: ApiGoods.BatchEditOrderProps) {
  return ApiCommonRequest<ApiGoods.BatchEditOrderProps>({
    url: '/api/back/order/updates',
    method: 'POST',
    data,
  })
}

/**
 * 直接删除订单(不退积分)
 */
export function api_delete_order(data: { ids: string }) {
  return ApiCommonRequest<{ ids: string }>({
    url: '/api/back/order/delete',
    method: 'POST',
    data,
  })
}
