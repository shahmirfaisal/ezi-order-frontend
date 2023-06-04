import { Box, TextField, Button } from "@mui/material"
import { useState } from "react"
import { toast } from "react-hot-toast"

interface Props {
  handleNext: () => void
  setCustomerDetails: any
}

const CustomerForm = ({ handleNext, setCustomerDetails }: Props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const handleChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState(event.target.value)
    }

  const submitCustomerDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === ""
    ) {
      toast.error("Please fill all fields")
      return
    }
    // validate email using regex
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email")
      return
    }

    setCustomerDetails({ name, email, phone, address })
    handleNext()
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      component="form"
      onSubmit={submitCustomerDetails}
    >
      <TextField label="Name" value={name} onChange={handleChange(setName)} />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleChange(setEmail)}
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={handleChange(setPhone)}
      />
      <TextField
        label="Address"
        value={address}
        onChange={handleChange(setAddress)}
      />

      <Button type="submit" variant="contained">
        Next
      </Button>
    </Box>
  )
}

export default CustomerForm
