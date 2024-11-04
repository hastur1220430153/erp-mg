declare namespace ApiUser {
  type UserLevel = 'A' | 'B' | 'C'

  // interface UserData {
  //   id: any
  //   phone: string
  //   level: UserLevel
  //   credits: number
  //   create_time: string
  //   is_banned: boolean
  //   username: string
  //   avatar: string
  //   is_active: boolean
  //   is_auth: boolean
  // }

  interface UserData {
    id: number
    username: string
    create_time: string
    avatar: string
    balance: string
    is_blacklist: boolean
    real_name: string
    invite_code: string
    unionid: string
    openid: string
    update_time: string
  }

  type UserListProps = Nullable<{
    page: any
    size: any
    phone?: string
  }>

  type UserWithdrawListProps = Nullable<{
    page: any
    size: any
    status: any
    keyword: any
    year_month_start: any
    year_month_end: any
  }>

  type UserBalanceListProps = Nullable<{
    page: any
    size: any
  }>

  type UserGetSecondCardListProps = Nullable<{
    page: any
    size: any
    coupons_type?: string | number
  }>

  type UserGetSecondCardListData = {
    id: number | null
    coupons_type: string
    card_name: string
    card_avatar: string
    is_card_number: boolean
    notice: string
    is_show: boolean
    is_hot: boolean
    sort: any
    coupons_type_id: number | null
    discount: any
  }

  type UserGetFristCardListData = Nullable<{
    page: any
    size: any
  }>

  type UserPostAddFristCardProps = Nullable<{
    card_type: string
    coupons_avatar: string
    status: boolean
  }>

  type UserPostManageFristCardProps = Nullable<{
    coupons_type_id: string
    card_type: string
    coupons_avatar: string
    status: boolean
  }>

  type UserGetDelFristCardProps = Nullable<{
    coupons_type_id: string | number
  }>

  type UserGetDelSecondCardProps = Nullable<{
    card_id: string | number
  }>

  type UserPostAddSecondCardProps = Nullable<{
    coupons_type_id: number
    card_name: string
    card_avatar: string
    notice: string
    is_card_number: boolean
    is_show: boolean
    sort: number | null | string
    discount: any
  }>
  // 通用的结果只有code和msg的接口
  type UserGetDelFristCardData = Nullable<{
    code: number
    msg: string
  }>

  type UserPostMenageSecondCardProps = Nullable<{
    card_id: number
    card_name: string
    card_avatar: string
    notice: string
    is_card_number: boolean
    is_show: boolean
    coupons_type: number
    is_hot: boolean
    sort: number | null | string
    discount: any
  }>

  type UserGetCardMediaData = Nullable<{
    id: number
    url: string
  }>

  type UserGetCarddownupData = Nullable<{
    id: number
    url: string
  }>

  type UserDropdownData = {
    value: number
    label: string
  }

  type UserUseWithdrawReviewProps = Nullable<{
    withdraw_id: string | number
    status: string | number
  }>

  type UserGetFristCardListResponse = {
    id: any
    card_type: any
    status: boolean
    coupons_avatar: any
  }

  interface UserWithdrawListData {
    id: number
    withdraw_id: string
    amount: string
    status: number
    status_str: string
    alipay_num: string
    create_time: string
  }

  interface UserBalanceListData {
    id: number
    order_id: string
    card_number: string
    value: string
    create_time: string
  }
  interface WithdrawStatusListData {
    id: number
    name: string
  }

  type UserListExportExcelProps = Omit<UserListProps, 'page' | 'size'>

  type UserBanProps = {
    user_id: any
    is_banned: boolean
  }

  type UserManageProps = {
    user_id: any
    is_blacklist: boolean
  }

  type UserDeatilData = {
    id: any
    level: UserLevel
    create_time: string
    phone: string
    avatar: string
    credits: number
    nickname: string
    nickname_update_time: string
    is_banned: boolean
    express_name: string
    express_phone: string
    express_area: string
    express_address: string
    name: string
    id_card: string
  }
  type EditUserCreditsOperation = 1 | -1

  type EditUserCreditsProps = {
    user_id: any
    value: number
    channel: string
    operation: EditUserCreditsOperation
  }

  type UserCreditsRecordListProps = Nullable<{
    page: any
    size: any
    user_phone?: string
    operation?: EditUserCreditsOperation
    channel?: string
    create_time_start?: string
    create_time_end?: string
  }>

  type UserCreditsRecordListExportExcelProps = Omit<UserCreditsRecordListProps, 'page' | 'size'>

  type UserCreditsRecordListData = {
    id: any
    user_id: number
    user_phone: string
    create_time: string
    order_id: string
    value: number
    operation: EditUserCreditsOperation
    channel: string
    app_name: string
  }

  type WeiyiInfoListData = {
    id: any
    commodity_uuid: string
    name: string
    is_gold: boolean
    is_whitelist: boolean
    price: number
  }

  type AddWeiyiInfoProps = {
    commodity_uuid: string
    name: string
    is_gold: boolean
    is_whitelist: boolean
    price: number
  }

  type EditWeiyiInfoProps = AddWeiyiInfoProps & { id: any }

  type UserWeiyiListProps = Nullable<{
    page: any
    size: any
    user_phone?: string
  }>

  type UserWeiyiListExportExcelProps = Omit<UserWeiyiListProps, 'page' | 'size'>

  type UserWeiyiListData = {
    id: any
    user_id: number
    user_phone: string
    create_time: string
    number: number
    commodity_uuid: string
    cover: string
    type_market: number
    type_market_str: string
    is_rebate: boolean
  }

  type UserMessageListProps = Nullable<{
    page: any
    size: any
    user_phone?: string
  }>

  type UserMessageListData = {
    id: any
    user_id: number
    user_phone: string
    create_time: string
    title: string
    is_read: boolean
    message_type: string
    message_type_str: string
  }

  type UserMessageDetailData = {
    id: any
    user_id: number
    user_phone: string
    create_time: string
    title: string
    content: string
    is_read: boolean
    message_type: string
    message_type_str: string
  }

  type EditUserMessageData = {
    id: any
    title: string
    content: string
    message_type: string
  }

  type MessageType = 'mall' | 'game'

  type AddUserMessageProps = {
    user_phones: string
    title: string
    content: string
    message_type: MessageType
  }

  type UserCreditsTransferListOperation = 1 | -1

  type UserCreditsTransferListProps = Nullable<{
    page: any
    size: any
    user_phone?: string
    operation?: UserCreditsTransferListOperation
  }>

  type UserCreditsTransferListData = {
    id: any
    create_time: string
    user_from: string
    user_to: string
    value: number
  }

  type UserRebateTaskListProps = Nullable<{
    page: any
    size: any
    user_phone?: string
  }>

  type UserRebateTaskListData = {
    id: any
    user_id: number
    user_phone: string
    create_time: string
    credits_total: number
    days: number
  }

  export type UserRebateTaskDetailData = {
    id: number
    user_id: number
    user_phone: string
    from_user_id: number
    from_user_phone: string
    from_user_level: number
    from_user_level_str: string
    create_time: string
    credits_total: number
    days: number
    details: UserRebateTaskDetailSubData[]
  }

  export type UserRebateTaskDetailSubData = {
    id: number
    task_day: number
    task_date: string
    task_credits: number
    is_done: boolean
    order_id: string
  }

  type AirDropGems = {
    user_phones: string
    gems_num: string
  }

  type AirDropCard = {
    user_phones: string
    quantity: string
    collections: string
  }

  type AirDropWhiteList = {
    user_phone: string
    quantity: string
    props_id: string
  }

  type AirDropGoodsProps = {
    user_phone: string
    props_id: string
  }

  type AirDropcreditsProps = {
    user_phone: string
    credits_num: string
  }

  type AirDropCardRecordListProps = Nullable<{
    page: any
    size: any
    phone?: any
  }>

  type AirDropCardRecordListData = {
    id: any
    phone: string
    collection_name: string
    create_time: string
    quantity: number
  }

  type AirDropDownupProps = {
    id?: any
  }

  type UserAirDropHistoryListProps = Nullable<{
    page: any
    size: any
    keyword?: string
  }>

  interface UserAirDropHistoryListData {
    id: number
    create_time: string
    phone: string
    content: string
    quantity: number
  }
}
