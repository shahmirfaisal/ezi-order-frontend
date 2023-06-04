import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"

interface Props {
  onCartOpen: () => void
}

const Footer = ({ onCartOpen }: Props) => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bgcolor="rgba(0,0,0,0.4)"
      p={3}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
        startIcon={<ShoppingCartOutlinedIcon />}
        onClick={onCartOpen}
      >
        Open Cart
      </Button>
    </Box>
  )
}

export default Footer
