import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Routes, Route } from "react-router-dom"
import Menu from "./pages/Menu"
import Checkout from "./pages/Checkout"
import { Toaster } from "react-hot-toast"

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(",")
  },
  palette: {
    primary: {
      main: "#EF393C"
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/menu/:restaurantId" element={<Menu />} />
        <Route path="/menu/:restaurantId/checkout" element={<Checkout />} />
      </Routes>

      <Toaster />
    </ThemeProvider>
  )
}

export default App
