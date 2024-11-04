import ApiCommonRequest from '@/service'

export function fetchDashBoard() {
  return ApiCommonRequest({
    url: '/api/back/order/dashboard',
    method: 'GET',
  })
}
