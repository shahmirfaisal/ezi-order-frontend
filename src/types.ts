interface MenuItemType {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface RestaurantType {
  display_name: string
  email: string
  qrCode: string
  uid: string
}

interface CartItemType {
  item: MenuItemType
  quantity: number
}

interface CartType {
  items: CartItemType[]
  total_price: number
}
