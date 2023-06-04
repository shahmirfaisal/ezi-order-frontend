import { Box, Typography, Button } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const { restaurantId } = useParams()

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h4" align="center">
        Your order has been placed successfully!
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate(`/menu/${restaurantId}`)}
      >
        Go Back to Menu
      </Button>
    </Box>
  )
}

export default PaymentSuccess
