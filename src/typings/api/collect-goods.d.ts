declare namespace ApiCollectGoods {
  interface GoodsListData {
    id: any
    create_time: string
    uuid: string
    price: string
    name: string
    inventory: number
    inventory_total: number
    stop_sale: boolean
    status: boolean
    image: string
    description: string
  }

  interface GoodsDetailData {
    id: any
    uuid: string
    is_airdrop: boolean
    create_time: string
    price: number
    name: string
    image: string
    description: string
    inventory: number
    inventory_total: number
    status: boolean
    stop_sale: boolean
    sale_start: any
    sale_end: any
    buy_limit: number
    is_hide_inventory: boolean
    is_only_new_user: boolean
  }

  type GoodsAddProps = NullablePartial<
    {
      uuid: string
      is_airdrop: boolean
      create_time: string
      price: number
      name: string
      image: string
      description: string
      inventory: number
      inventory_total: number
      status: boolean
      stop_sale: boolean
      sale_start: string
      sale_end: string
      buy_limit: number
      is_hide_inventory: boolean
      is_only_new_user: boolean
    },
    'is_airdrop' | 'status' | 'stop_sale' | 'is_hide_inventory' | 'is_only_new_user'
  >

  type GoodsEditProps = GoodsAddProps & { id: any }

  type GoodsQuickEditProps = {
    id: any
    is_airdrop?: boolean
    status?: boolean
    stop_sale?: boolean
    is_hide_inventory?: boolean
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
    pay_status: string
    user_phone: string
  }>

  type PayStatus = boolean | null

  type GoodsOrderListData = {
    id: any
    create_time: string
    order_id: string
    user_id: number
    user_phone: string
    goods_id: number
    goods_name: string
    pay_status: PayStatus
    pay_status_str: string
    quantity: number
    unit_price: string
    total_price: string
  }

  type GoodsOrderExportExcelProps = Omit<GoodsOrderListProps, 'page' | 'size'>

  type GoodsOrderDetailData = {
    id: any
    create_time: string
    order_id: string
    user_id: number
    user_phone: string
    goods_id: number
    goods_name: string
    pay_status: boolean
    pay_status_str: string
    quantity: number
    unit_price: string
    total_price: string
    refund_status?: boolean
    pay_time: string
    refund_reason?: string
    is_free: boolean
    airdrop_status?: boolean
    airdrop_info?: string
  }
}
