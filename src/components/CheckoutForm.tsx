import { useEffect, useState } from "react"
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import { StripePaymentElementOptions } from "@stripe/stripe-js"
import { toast } from "react-hot-toast"
import { Box, Button, CircularProgress } from "@mui/material"

interface Props {
  handleNext: () => void
  handleBack: () => void
  placeOrder: () => Promise<void>
}

const CheckoutForm = ({ handleNext, handleBack, placeOrder }: Props) => {
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required"
    })

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message as string)
      } else {
        toast.error("An unexpected error occurred.")
      }
    } else {
      toast.success("Payment successful")
      await placeOrder()
      handleNext()
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions as StripePaymentElementOptions}
        />

        <Box display="flex" justifyContent="space-between" gap={3} mt={3}>
          <Button variant="outlined" onClick={handleBack} sx={{ flexGrow: 1 }}>
            Back
          </Button>
          <Button
            variant="contained"
            disabled={isLoading || !stripe || !elements}
            id="submit"
            type="submit"
            sx={{ flexGrow: 1 }}
            endIcon={isLoading && <CircularProgress size={20} />}
          >
            Pay now
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default CheckoutForm
