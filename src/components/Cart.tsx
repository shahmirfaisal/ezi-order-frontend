import React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { Box, Container, Grid, Paper } from "@mui/material"
import MenuItem from "./MenuItem"
import { useNavigate } from "react-router-dom"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface Props {
  open: boolean
  onClose: () => void
  cart: CartType
  addToCart: (item: MenuItemType) => void
  removeFromCart: (item: MenuItemType) => void
}

const Cart = ({ open, onClose, cart, addToCart, removeFromCart }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cart
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => navigate("checkout")}
              disabled={cart.items.length === 0}
            >
              Go to Checkout
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 5, pb: 15 }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            fontWeight="bold"
            mb={4}
          >
            Summary
          </Typography>

          <Paper
            sx={{ p: 4, display: "flex", justifyContent: "space-between" }}
          >
            {/* Show total cart items */}
            <Typography fontWeight="bold">
              Total items:{" "}
              {cart.items.reduce((prev, { quantity }) => prev + quantity, 0)}
            </Typography>

            {/* Show total price */}
            <Typography fontWeight="bold">
              Total Price: ${cart.total_price}
            </Typography>
          </Paper>

          <Typography
            variant="h3"
            component="h2"
            align="center"
            fontWeight="bold"
            mb={4}
            mt={4}
          >
            Items
          </Typography>

          <Grid container spacing={10}>
            {cart.items.map(({ item, quantity }) => (
              <Grid item sm={6} xs={12} key={item.id}>
                <MenuItem
                  key={item.id}
                  item={item}
                  quantity={quantity}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Dialog>
    </>
  )
}

export default Cart
