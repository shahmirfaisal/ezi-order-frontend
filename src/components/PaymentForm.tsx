import axios from "axios"
import { useEffect, useState } from "react"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { Box, CircularProgress } from "@mui/material"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

interface Props {
  price: number
  handleNext: () => void
  handleBack: () => void
  placeOrder: () => Promise<void>
}

const PaymentForm = ({ price, handleNext, handleBack, placeOrder }: Props) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const getPaymentIntent = async () => {
    const { data } = await axios.post("/create-payment-intent", {
      price
    })

    setClientSecret(data.clientSecret)
  }

  useEffect(() => {
    getPaymentIntent()
  }, [])

  const appearance = {
    theme: "stripe"
  }
  const options = {
    clientSecret,
    appearance
  }

  if (!clientSecret)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={50} />
      </Box>
    )

  return (
    <div>
      {clientSecret && (
        <Elements
          options={options as StripeElementsOptions | undefined}
          stripe={stripePromise}
        >
          <CheckoutForm
            handleNext={handleNext}
            handleBack={handleBack}
            placeOrder={placeOrder}
          />
        </Elements>
      )}
    </div>
  )
}

export default PaymentForm
