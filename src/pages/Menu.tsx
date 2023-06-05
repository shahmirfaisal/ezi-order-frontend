import { useParams } from "react-router-dom"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore"
import { db } from "../config/firebase"
import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import MenuItem from "../components/MenuItem"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"
import Footer from "../components/Footer"
import Cart from "../components/Cart"
import { toast } from "react-hot-toast"

const Menu = () => {
  const { restaurantId } = useParams()
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([])
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null)
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartType>({ items: [], total_price: 0 })
  const [openCart, setOpenCart] = useState(false)

  const openCartHandler = () => {
    setOpenCart(true)
  }

  const closeCartHandler = () => {
    setOpenCart(false)
  }

  //  store cart in local storage
  useEffect(() => {
    const cart = localStorage.getItem(`cart-${restaurantId}`)
    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(`cart-${restaurantId}`, JSON.stringify(cart))
  }, [cart])

  const getMenuItems = async () => {
    const result = await getDocs(
      query(
        collection(db, "menu-items"),
        where("user", "==", doc(db, `/users/${restaurantId}`))
      )
    )
    const items: MenuItemType[] = []
    result.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      } as MenuItemType)
    })

    setMenuItems(items)
  }

  const getRestaurant = async () => {
    const result = await getDoc(doc(db, `/users/${restaurantId}`))
    setRestaurant(result.data() as RestaurantType)
  }

  const getData = async () => {
    await Promise.all([getMenuItems(), getRestaurant()])
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const addToCart = (item: MenuItemType) => {
    const newCart = { ...cart }
    const existingItem = newCart.items.find(
      (cartItem) => cartItem.item.id === item.id
    )
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      newCart.items.push({ item, quantity: 1 })
      toast.success("Item added to cart")
    }
    newCart.total_price += item.price
    setCart(newCart)
  }

  const removeFromCart = (item: MenuItemType) => {
    const newCart = { ...cart }
    const existingItem = newCart.items.find(
      (cartItem) => cartItem.item.id === item.id
    )
    if (existingItem) {
      existingItem.quantity -= 1
      if (existingItem.quantity === 0) {
        newCart.items = newCart.items.filter(
          (cartItem) => cartItem.item.id !== item.id
        )

        newCart.total_price -= item.price
      }
    }
    setCart(newCart)
  }

  console.log("cart", cart)

  if (loading) {
    return (
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={50} />
      </Box>
    )
  }

  return (
    <Container maxWidth="md" sx={{ pb: 15 }}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        fontWeight="bold"
        mt={5}
        mb={4}
      >
        {restaurant?.display_name}
      </Typography>

      <Grid container spacing={10}>
        {menuItems.map((item) => (
          <Grid item sm={6} xs={12} key={item.id}>
            <MenuItem key={item.id} item={item} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>

      <Footer onCartOpen={openCartHandler} />
      <Cart
        open={openCart}
        onClose={closeCartHandler}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </Container>
  )
}

export default Menu
