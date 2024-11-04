import ApiCommonRequest from '../service'

/**
 * 获取一级卡牌列表
 */
export function api_get_frist_card_list(data: ApiUser.UserBalanceListProps) {
  return ApiCommonRequest<ApiUser.UserBalanceListProps, ApiUser.UserGetFristCardListResponse[]>({
    url: '/api/back/admin/coupons_type_list',
    method: 'GET',
    data,
  })
}

/**
 * 删除一级卡牌
 */
export function api_get_del_card_type(data: ApiUser.UserGetDelFristCardProps) {
  return ApiCommonRequest<ApiUser.UserGetDelFristCardProps, ApiUser.UserGetDelFristCardData>({
    url: '/api/back/admin/del_coupons_type',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })
}

/**
 * 获取卡片图片列表
 */
export function api_get_card_media_list(data: ApiUser.UserGetFristCardListData) {
  return ApiCommonRequest<ApiUser.UserGetFristCardListData, ApiUser.UserGetCardMediaData[]>({
    url: '/api/back/media/images',
    method: 'GET',
    data,
  })
}

/**
 * 添加一级卡片
 */
export function api_post_add_coupons_type(data: ApiUser.UserPostAddFristCardProps) {
  return ApiCommonRequest<ApiUser.UserPostAddFristCardProps, ApiUser.UserGetDelFristCardData>({
    url: '/api/back/admin/add_coupons_type',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })
}

/**
 * 管理一级卡片
 */
export function api_post_manage_coupons_type(data: ApiUser.UserPostManageFristCardProps) {
  return ApiCommonRequest<ApiUser.UserPostManageFristCardProps, ApiUser.UserGetDelFristCardData>({
    url: '/api/back/admin/coupons_type_manage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })
}

/**
 * 获取2级卡牌列表
 */
export function api_get_second_card_list(data: ApiUser.UserGetSecondCardListProps) {
  return ApiCommonRequest<ApiUser.UserGetSecondCardListProps, ApiUser.UserGetSecondCardListData[]>({
    url: '/api/back/admin/cards_list',
    method: 'GET',
    data,
  })
}

/**
 * 添加2级卡片
 */
export function api_post_add_second_coupons_type(data: ApiUser.UserPostAddSecondCardProps) {
  return ApiCommonRequest<ApiUser.UserPostAddSecondCardProps, ApiUser.UserGetDelFristCardData>({
    url: '/api/back/admin/add_card',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })
}

/**
 * 删除2级卡牌
 */
export function api_get_del_second_card_type(data: ApiUser.UserGetDelSecondCardProps) {
  return ApiCommonRequest<ApiUser.UserGetDelSecondCardProps, ApiUser.UserGetDelFristCardData>({
    url: '/api/back/admin/del_card',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })
}

/**
 * 获取卡片类型下拉框
 */
export function api_get_coupons_type_list_downup() {
  return ApiCommonRequest<undefined, ApiUser.UserDropdownData[]>({
    url: '/api/back/admin/coupons_type_list_downup',
    method: 'GET',
  })
}

/**
 * 管理2级卡片
 */
export function api_post_manage_second_coupons_type(data: ApiUser.UserPostMenageSecondCardProps) {
  return ApiCommonRequest<ApiUser.UserPostMenageSecondCardProps, ApiUser.UserGetDelFristCardData>({
    url: '/api/back/admin/cards_list_manage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })
}
