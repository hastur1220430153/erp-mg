declare namespace ApiLuckyDraw {
  type RouletteListProps = Nullable<{
    page: any
    size: any
    user_phone: string
  }>

  type Category = 'credits' | 'none' | 'goods'
  interface RouletteListData {
    id: any
    user: string
    category: Category
    category_str: string
    goods_name?: any
    credits: number
    create_time: string
  }

  interface FreeRouletteListData {
    id: any
    user: string
    category: Category
    category_str: string
    goods_name?: any
    credits?: number
    create_time: string
  }
}
