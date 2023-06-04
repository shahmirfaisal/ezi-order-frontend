import { useEffect, useState } from "react"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import { Container } from "@mui/material"
import CustomerForm from "../components/CustomerForm"
import PaymentForm from "../components/PaymentForm"
import { toast } from "react-hot-toast"
import { db } from "../config/firebase"
import { addDoc, collection, doc, getDocs } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import PaymentSuccess from "../components/PaymentSuccess"

const steps = ["Customer Information", "Payment", "Finish"]

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0)
  const [cart, setCart] = useState<CartType | null>(null)
  const [customerDetails, setCustomerDetails] = useState<any>(null)

  const { restaurantId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const cart: CartType = JSON.parse(localStorage.getItem("cart") || "{}")

    if (cart && cart.items?.length) {
      setCart(cart)
    } else {
      navigate(-1)
    }
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const placeOrder = async () => {
    const data = await getDocs(collection(db, "orders"))
    // calculate order number based on number of orders
    let orderNum: number | string = data.docs.length + 1
    orderNum = `ORD${orderNum.toString().padStart(3, "0")}`

    const orderRef = await addDoc(collection(db, "orders"), {
      customer_name: customerDetails?.name,
      customer_email: customerDetails?.email,
      customer_phone: customerDetails?.phone,
      customer_address: customerDetails?.address,
      total_price: cart?.total_price,
      order_num: orderNum,
      item_quantity: cart?.items?.reduce(
        (prev: any, { quantity }: any) => prev + quantity,
        0
      ),
      user: doc(db, `/users/${restaurantId}`),
      created_at: new Date()
    })

    for (const item of cart?.items as CartItemType[]) {
      await addDoc(collection(orderRef, "items"), {
        quantity: item.quantity,
        ref: doc(db, `/menu-items/${item.item.id}`)
      })
    }

    toast.success("Order placed successfully!")
    localStorage.removeItem("cart")
  }

  const showContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CustomerForm
            handleNext={handleNext}
            setCustomerDetails={setCustomerDetails}
          />
        )

      case 1:
        return (
          <PaymentForm
            price={cart?.total_price || 0}
            handleNext={handleNext}
            handleBack={handleBack}
            placeOrder={placeOrder}
          />
        )

      case 2:
        return <PaymentSuccess />

      default:
        return <div>Not Found</div>
    }
  }

  if (!cart) return null

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {}

          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      <>
        {showContent(activeStep)}

        {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button onClick={handleNext} variant="contained">
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box> */}
      </>
    </Container>
  )
}
