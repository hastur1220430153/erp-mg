declare namespace ApiGoods {
  interface GoodsListData {
    id: any
    name: string
    sort: number
    status: boolean
    inventory: number
    create_time: string
  }

  interface GoodsDetailData {
    id: any
    create_time: string
    sort: number
    name: string
    image: string
    description: string
    original_price: number
    inventory: number
    inventory_total: number
    status: boolean
    discount_price: number
    discount_time_end?: any
    sale_time_end?: string
    sale_time_start?: any
    daily_limit?: any
    minimum_credits?: any

    is_whitelist: boolean
  }

  type GoodsEditProps = NullablePartial<
    {
      id: any
      sort?: number
      name: string
      image: string
      description: string
      original_price: number
      inventory: number
      inventory_total: number
      status: boolean
      discount_price: number
      discount_time_end?: string
      sale_time_start?: string
      sale_time_end?: string
      daily_limit?: number
      minimum_credits?: number
      is_whitelist?: boolean
    },
    'status' | 'is_whitelist'
  >

  type GoodsQuickEditProps = {
    id: any
    sort?: number
    status?: boolean
  }

  type GoodsWhiteListProps = { goods_id: any }

  type GoodsWhiteListData = {
    id: any
    can_buy: number
    can_buy_total: number
    user_id: number
    user_phone: string
    user_nickname: string
    goods_id: number
  }

  type GoodsAddWhiteListProps = { goods_id: any; text: string }

  type GoodsDeleteWhiteListProps = { goods_id: any; ids: string }

  type GoodsOrderListProps = Nullable<{
    page: any
    size: any
    create_time_start: string
    create_time_end: string
    status: string
    goods_id: number
    user_phone: string
  }>

  type GoodsOrderListData = {
    id: any
    order_id: string
    create_time: string
    quantity: number
    unit_price: number
    total_price: number
    goods_id: number
    goods_name: string
    user_id: number
    user_phone: string
    status: number
    status_str: string
  }

  type GoodsOrderExportExcelProps = Omit<GoodsOrderListProps, 'page' | 'size'>

  type GoodsOrderDetailData = {
    id: any
    order_id: string
    create_time: string
    quantity: number
    unit_price: number
    total_price: number
    goods_id: number
    goods_name: string
    user_id: number
    user_phone: string
    status: number
    status_str: string
    express_name: string
    express_phone: string
    express_area: string
    express_address: string
    express_number: string
  }

  type EditGoodsOrderDetailProps = {
    id: any
    status: number
    express_name: string
    express_phone: string
    express_area: string
    express_address: string
    express_number: string
  }

  type CancelGoodsProps = { channel: string; ids: string }

  type BatchEditOrderProps = { status: number; ids: string }
}
