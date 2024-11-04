import ApiCommonRequest from '../service'

/**
 * 获取用户列表
 */
export function api_get_user_list(data: ApiUser.UserListProps) {
  return ApiCommonRequest<ApiUser.UserListProps, ApiUser.UserData[]>({
    url: '/api/back/admin/user_list',
    method: 'GET',
    data,
  })
}

/**
 * 获取用户提现列表
 */
export function api_get_user_withdraw_list(data: ApiUser.UserWithdrawListProps) {
  return ApiCommonRequest<ApiUser.UserWithdrawListProps, ApiUser.UserWithdrawListData[]>({
    url: '/api/back/admin/user_withdraw_list',
    method: 'GET',
    data,
  })
}

/**
 * 获取提现状态列表
 */
export function api_get_user_status_downup_list() {
  return ApiCommonRequest<undefined, ApiUser.WithdrawStatusListData[]>({
    url: '/api/back/admin/status_downup',
    method: 'GET',
  })
}
/**
 * 更改提现状态
 */
export function api_post_user_withdraw_review(data: ApiUser.UserUseWithdrawReviewProps) {
  return ApiCommonRequest<ApiUser.UserUseWithdrawReviewProps, ApiUser.WithdrawStatusListData[]>({
    url: '/api/back/admin/user_withdraw_review',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
  })
}

/**
 * 获取用户余额流水列表
 */
export function api_get_user_order_list(data: ApiUser.UserBalanceListProps) {
  return ApiCommonRequest<ApiUser.UserBalanceListProps, ApiUser.UserBalanceListData[]>({
    url: '/api/back/admin/order_list',
    method: 'GET',
    data,
  })
}

/**
 * 获取用户详情
 */
export function api_get_user_detail(data: { id: any }) {
  return ApiCommonRequest<{ id: any }, ApiUser.UserDeatilData>({
    url: '/api/back/user/detail',
    method: 'GET',
    data,
  })
}

/**
 * 改变用户封禁状态
 */
export function api_ban_user(data: ApiUser.UserBanProps) {
  return ApiCommonRequest<ApiUser.UserBanProps>({
    url: '/api/back/user/is_banned/update',
    method: 'POST',
    data,
  })
}

/**
 * 改变用户拉黑状态
 */
export function api_user_list_manage(data: ApiUser.UserManageProps) {
  return ApiCommonRequest<ApiUser.UserManageProps>({
    url: '/api/back/admin/user_list_manage',
    method: 'GET',
    data,
  })
}

/**
 * 用户余额流水导出
 */
export function api_user_export_order_list() {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/export_order_list',
    method: 'GET',
  })
}

/**
 * 用户提现列表导出
 */
export function api_user_export_withdraw_list() {
  return ApiCommonRequest<undefined>({
    url: '/api/back/admin/export_withdraw_list',
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
}

/**
 * 改变用户积分
 */
export function api_edit_user_credits(data: ApiUser.EditUserCreditsProps) {
  return ApiCommonRequest<ApiUser.EditUserCreditsProps>({
    url: '/api/back/user/credits/update',
    method: 'POST',
    data,
  })
}

/**
 * 用户导出excel
 */
export function api_user_list_export_excel(data: ApiUser.UserListExportExcelProps) {
  return ApiCommonRequest<ApiUser.UserListExportExcelProps>({
    url: '/api/back/user/export/excel',
    method: 'GET',
    data,
    responseType: 'blob',
  })
}

/**
 * 获取积分记录列表
 */
export function api_get_user_credits_record_list(data: ApiUser.UserCreditsRecordListProps) {
  return ApiCommonRequest<ApiUser.UserCreditsRecordListProps, ApiUser.UserCreditsRecordListData[]>({
    url: '/api/back/user/credits/log/list',
    method: 'GET',
    data,
  })
}

/**
 * 积分记录列表导出excel
 */
export function api_user_credits_record_list_export_excel(data: ApiUser.UserCreditsRecordListExportExcelProps) {
  return ApiCommonRequest<ApiUser.UserCreditsRecordListExportExcelProps>({
    url: '/api/back/user/credits/log/export/excel',
    method: 'GET',
    data,
    responseType: 'blob',
  })
}

/**
 * 获取唯艺藏品信息
 */
export function api_get_weiyi_info_list(data: BasePageProps) {
  return ApiCommonRequest<BasePageProps, ApiUser.WeiyiInfoListData[]>({
    url: '/api/back/weiyi/treasure/info/list',
    method: 'GET',
    data,
  })
}

/**
 * 添加唯艺藏品信息
 */
export function api_add_weiyi_info(data: ApiUser.AddWeiyiInfoProps) {
  return ApiCommonRequest<ApiUser.AddWeiyiInfoProps>({
    url: '/api/back/weiyi/treasure/info/create',
    method: 'POST',
    data,
  })
}

/**
 * 编辑唯艺藏品信息
 */
export function api_edit_weiyi_info(data: ApiUser.EditWeiyiInfoProps) {
  return ApiCommonRequest<ApiUser.EditWeiyiInfoProps>({
    url: '/api/back/weiyi/treasure/info/update',
    method: 'POST',
    data,
  })
}

/**
 * 删除唯艺藏品信息
 */
export function api_delete_weiyi_info(data: { id: any }) {
  return ApiCommonRequest<{ id: any }>({
    url: '/api/back/weiyi/treasure/info/delete',
    method: 'POST',
    data,
  })
}

/**
 * 荻取用户唯艺藏品列表
 */
export function api_get_user_weiyi_info_list(data: ApiUser.UserWeiyiListProps) {
  return ApiCommonRequest<ApiUser.UserWeiyiListProps, ApiUser.UserWeiyiListData[]>({
    url: '/api/back/user/weiyi/treasure/list',
    method: 'GET',
    data,
  })
}

/**
 * 唯艺藏品导出
 */
export function api_user_weiyi_list_export_excel(data: ApiUser.UserWeiyiListExportExcelProps) {
  return ApiCommonRequest<ApiUser.UserWeiyiListExportExcelProps>({
    url: '/api/back/user/weiyi/treasure/export/excel',
    method: 'GET',
    data,
    responseType: 'blob',
  })
}

/**
 * 获取用户消息列表
 */
export function api_get_user_message_list(data: ApiUser.UserWeiyiListProps) {
  return ApiCommonRequest<ApiUser.UserWeiyiListProps, ApiUser.UserMessageListData[]>({
    url: '/api/back/user/message/list',
    method: 'GET',
    data,
  })
}

/**
 * 获取用户消息详情
 */
export function api_get_user_message_detail(data: { id: any }) {
  return ApiCommonRequest<{ id: any }, ApiUser.UserMessageDetailData>({
    url: '/api/back/user/message/detail',
    method: 'GET',
    data,
  })
}
/**
 * 编辑用户消息
 */
export function api_edit_user_message(data: ApiUser.EditUserMessageData) {
  return ApiCommonRequest<ApiUser.EditUserMessageData>({
    url: '/api/back/user/message/update',
    method: 'POST',
    data,
  })
}

/**
 * 删除用户消息
 */
export function api_delete_user_message_list(data: { ids: string }) {
  return ApiCommonRequest<{ ids: string }>({
    url: '/api/back/user/message/delete',
    method: 'POST',
    data,
  })
}

/**
 * 批量添加用户消息
 */
export function api_add_user_message(data: ApiUser.AddUserMessageProps) {
  return ApiCommonRequest<ApiUser.AddUserMessageProps>({
    url: '/api/back/user/message/create',
    method: 'POST',
    data,
  })
}

/**
 * 获取用户积分转增记录列表
 */
export function api_get_user_credits_transfer_list(data: ApiUser.UserCreditsTransferListProps) {
  return ApiCommonRequest<ApiUser.UserCreditsTransferListProps, ApiUser.UserCreditsTransferListData[]>({
    url: '/api/back/user/credits/transfer/list',
    method: 'GET',
    data,
  })
}

/**
 * 用户积分转增记录列表导出
 */
export function api_user_credits_transfer_list_export_excel(data: ApiUser.UserCreditsTransferListProps) {
  return ApiCommonRequest<ApiUser.UserCreditsTransferListProps>({
    url: '/api/back/user/credits/transfer/export/excel',
    method: 'GET',
    data,
    responseType: 'blob',
  })
}

/**
 * 获取用户返利任务列表
 */
export function api_get_user_rebate_task_list(data: ApiUser.UserRebateTaskListProps) {
  return ApiCommonRequest<ApiUser.UserRebateTaskListProps, ApiUser.UserRebateTaskListData[]>({
    url: '/api/back/user/rebate/task/list',
    method: 'GET',
    data,
  })
}

/**
 * 获取用户返利任务详情
 */
export function api_get_user_rebate_task_detail(data: { id: any }) {
  return ApiCommonRequest<{ id: any }, ApiUser.UserRebateTaskDetailData>({
    url: '/api/back/user/rebate/task/detail',
    method: 'GET',
    data,
  })
}

/**
 * 空投宝石
 */
export function api_airdrop_gems(data: ApiUser.AirDropGems) {
  return ApiCommonRequest<ApiUser.AirDropGems>({
    url: '/api/back/newapp/airdrop_gems',
    method: 'POST',
    data,
  })
}

/**
 * 空投卡牌
 */
export function api_airdrop_card(data: ApiUser.AirDropCard) {
  return ApiCommonRequest<ApiUser.AirDropCard>({
    url: '/api/back/newapp/airdrop_collections',
    method: 'POST',
    data,
  })
}

/**
 * 获取 空投卡牌记录列表
 */
export function api_get_airdrop_card_list(data: ApiUser.AirDropCardRecordListProps) {
  return ApiCommonRequest<ApiUser.AirDropCardRecordListProps>({
    url: '/api/back/newapp/airdrop_collection_list',
    method: 'GET',
    data,
  })
}

/**
 * 空投卡牌记录列表导出
 */
export function api_airdrop_card_list_export_excel(data: ApiUser.AirDropCardRecordListProps) {
  return ApiCommonRequest<ApiUser.AirDropCardRecordListProps>({
    url: '/api/back/newapp/airdrop_collection_excel',
    method: 'GET',
    data,
    responseType: 'blob',
  })
}

/**
 * 空投优先购资格
 */

export function api_airdrop_user_white_list(data: ApiUser.AirDropWhiteList) {
  return ApiCommonRequest<ApiUser.AirDropWhiteList>({
    url: '/api/back/admin/add_user_white_list',
    method: 'POST',
    data,
  })
}

/**
 * 空投抵扣券
 */

export function api_airdrop_user_discount_coupon(data: ApiUser.AirDropWhiteList) {
  return ApiCommonRequest<ApiUser.AirDropWhiteList>({
    url: '/api/back/admin/add_user_discount_coupon',
    method: 'POST',
    data,
  })
}

/**
 * 空投抵扣券
 */

export function api_airdrop_user_fuel_card(data: ApiUser.AirDropWhiteList) {
  return ApiCommonRequest<ApiUser.AirDropWhiteList>({
    url: '/api/back/admin/add_user_fuel_card',
    method: 'POST',
    data,
  })
}

/**
 * 空投藏品
 */

export function api_airdrop_user_goods(data: ApiUser.AirDropGoodsProps) {
  return ApiCommonRequest<ApiUser.AirDropGoodsProps>({
    url: '/api/back/admin/add_user_goods',
    method: 'POST',
    data,
  })
}

/**
 * 空投积分
 */

export function api_airdrop_user_credits(data: ApiUser.AirDropcreditsProps) {
  return ApiCommonRequest<ApiUser.AirDropcreditsProps>({
    url: '/api/back/admin/add_user_credits',
    method: 'POST',
    data,
  })
}

/**
 * 空投盲盒
 */

export function api_airdrop_user_blind_box(data: ApiUser.AirDropWhiteList) {
  return ApiCommonRequest<ApiUser.AirDropWhiteList>({
    url: '/api/back/admin/add_blind_box',
    method: 'POST',
    data,
  })
}

/**
 * 优先购资格空投下拉框
 */
export function api_airdrop_white_list_downup() {
  return ApiCommonRequest<ApiUser.AirDropDownupProps>({
    url: '/api/back/admin/user_white_list_downup',
    method: 'GET',
  })
}

/**
 * 藏品空投下拉框
 */
export function api_airdrop_goods_downup() {
  return ApiCommonRequest<ApiUser.AirDropDownupProps>({
    url: '/api/back/admin/user_goods_downup',
    method: 'GET',
  })
}

/**
 * 优盲盒空投下拉框
 */
export function api_airdrop_blindbox_downup() {
  return ApiCommonRequest<ApiUser.AirDropDownupProps>({
    url: '/api/back/admin/blind_box_downup',
    method: 'GET',
  })
}

/**
 * 燃料卡空投下拉框
 */
export function api_airdrop_fuel_card_downup() {
  return ApiCommonRequest<ApiUser.AirDropDownupProps>({
    url: '/api/back/admin/user_fuel_card_downup',
    method: 'GET',
  })
}

/**
 * 抵扣券空投下拉框
 */
export function api_airdrop_discount_downup() {
  return ApiCommonRequest<ApiUser.AirDropDownupProps>({
    url: '/api/back/admin/user_discount_downup',
    method: 'GET',
  })
}

/**
 * 获取用户空投记录列表
 */
export function api_get_user_airdrop_histroy_list(data: ApiUser.UserAirDropHistoryListProps) {
  return ApiCommonRequest<ApiUser.UserAirDropHistoryListProps, ApiUser.UserAirDropHistoryListData[]>({
    url: '/api/back/admin/airdrop_records',
    method: 'GET',
    data,
  })
}

/**
 * 用户空投记录下拉框
 */
export function api_airdrop_records_downup() {
  return ApiCommonRequest<ApiUser.AirDropDownupProps>({
    url: '/api/back/admin/airdrop_records_downup',
    method: 'GET',
  })
}
