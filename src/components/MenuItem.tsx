import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

interface Props {
  item: MenuItemType
  addToCart: (item: MenuItemType) => void
  removeFromCart?: (item: MenuItemType) => void
  quantity?: number
}

const MenuItem = ({ item, addToCart, removeFromCart, quantity }: Props) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia sx={{ height: 200 }} image={item.image} title={item.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography>Price: ${item.price}</Typography>
        <Typography>Category: {item.category}</Typography>
      </CardContent>
      <CardActions>
        {!quantity && (
          <Button size="small" onClick={() => addToCart(item)}>
            Add to cart
          </Button>
        )}
        {quantity && (
          <>
            <Typography sx={{ mr: 1 }}>Quantity: {quantity}</Typography>

            <Button
              onClick={() => addToCart(item)}
              size="small"
              color="primary"
              variant="contained"
            >
              +
            </Button>
            <Button
              onClick={() => removeFromCart && removeFromCart(item)}
              size="small"
              color="primary"
              variant="contained"
            >
              -
            </Button>
          </>
        )}
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  )
}

export default MenuItem
