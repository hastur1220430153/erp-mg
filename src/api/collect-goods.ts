import ApiCommonRequest from '../service'

/**
 * 获取收藏店商品列表
 */
export function api_get_collect_goods_list(data: BasePageProps) {
  return ApiCommonRequest<BasePageProps>({
    url: '/api/back/pre_order/goods/list',
    method: 'GET',
    data,
  })
}

/**
 * 获取收藏店商品详情
 */
export function api_get_collect_goods_detail(data: { id: any }) {
  return ApiCommonRequest<{ id: any }, ApiCollectGoods.GoodsDetailData>({
    url: '/api/back/pre_order/goods/detail',
    method: 'GET',
    data,
  })
}

/**
 * 新增收藏店商品
 */
export function api_add_collect_goods(data: ApiCollectGoods.GoodsAddProps) {
  return ApiCommonRequest<ApiCollectGoods.GoodsAddProps>({
    url: '/api/back/pre_order/goods/create',
    method: 'POST',
    data,
  })
}

/**
 * 编辑收藏店商品
 */
export function api_edit_collect_goods(data: ApiCollectGoods.GoodsEditProps) {
  return ApiCommonRequest<ApiCollectGoods.GoodsEditProps>({
    url: '/api/back/pre_order/goods/update',
    method: 'POST',
    data,
  })
}

/**
 * 快速编辑收藏店商品
 */
export function api_quick_edit_collect_goods(data: ApiCollectGoods.GoodsQuickEditProps) {
  return ApiCommonRequest<ApiCollectGoods.GoodsQuickEditProps>({
    url: '/api/back/pre_order/goods/quickedit',
    method: 'POST',
    data,
  })
}

/**
 * 收藏店商品白名单列表
 */
export function api_get_collect_goods_white_list(data: ApiCollectGoods.GoodsWhiteListProps) {
  return ApiCommonRequest<ApiCollectGoods.GoodsWhiteListProps>({
    url: '/api/back/pre_order/goods/whitelist',
    method: 'GET',
    data,
  })
}

/**
 * 收藏店商品白名单导入
 */
export function api_add_collect_goods_white_list(data: ApiCollectGoods.GoodsAddWhiteListProps) {
  return ApiCommonRequest<ApiCollectGoods.GoodsAddWhiteListProps>({
    url: '/api/back/pre_order/goods/whitelist/add',
    method: 'POST',
    data,
  })
}

/**
 * 收藏店商品白名单批量删除
 */
export function api_delete_collect_goods_white_list(data: ApiCollectGoods.GoodsDeleteWhiteListProps) {
  return ApiCommonRequest<ApiCollectGoods.GoodsDeleteWhiteListProps>({
    url: '/api/back/pre_order/goods/whitelist/delete',
    method: 'POST',
    data,
  })
}

/**
 * 积分收藏店商品订单列表
 */
export function api_get_collect_goods_order_list(data: ApiCollectGoods.GoodsOrderListProps) {
  return ApiCommonRequest<ApiCollectGoods.GoodsOrderListProps, ApiCollectGoods.GoodsOrderListData[]>({
    url: '/api/back/pre_order/order/list',
    method: 'GET',
    data,
  })
}

/**
 * 订单列表导出
 */
export function api_get_collect_goods_order_export_excel(data: ApiCollectGoods.GoodsOrderExportExcelProps) {
  return ApiCommonRequest<ApiCollectGoods.GoodsOrderExportExcelProps>({
    url: '/api/back/pre_order/order/export/excel',
    method: 'GET',
    data,
    responseType: 'blob',
  })
}

/**
 * 获取订单详情
 */
export function api_get_collect_goods_order_detail(data: { id: any }) {
  return ApiCommonRequest<{ id: any }, ApiCollectGoods.GoodsOrderDetailData>({
    url: '/api/back/pre_order/order/detail',
    method: 'GET',
    data,
  })
}

/**
 * 优先购支付状态下拉列表
 */
export function api_get_collect_goods_order_dropdown_pay_status() {
  return ApiCommonRequest<undefined, BaseDropDownData>({
    url: '/api/back/pre_order/order/dropdown/pay_status',
    method: 'GET',
  })
}
