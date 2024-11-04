import ApiCommonRequest from '../service'

/**
 * 抽奖记录列表
 */
export function api_get_roulette_record_list(data: ApiLuckyDraw.RouletteListProps) {
  return ApiCommonRequest<ApiLuckyDraw.RouletteListProps, ApiLuckyDraw.RouletteListData[]>({
    url: '/api/back/roulette/logs/list',
    method: 'GET',
    data,
  })
}

/**
 * 免费抽奖记录列表
 */
export function api_get_free_roulette_record_list(data: ApiLuckyDraw.RouletteListProps) {
  return ApiCommonRequest<ApiLuckyDraw.RouletteListProps, ApiLuckyDraw.FreeRouletteListData[]>({
    url: '/api/back/free/roulette/logs/list',
    method: 'GET',
    data,
  })
}
