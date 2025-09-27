import { useContext, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

export default function Checkout() {
  const { state, dispatch } = useContext(CartContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [success, setSuccess] = useState(false);

  const total = state.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        {
          products: state.cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear cart and show success screen
      dispatch({ type: "CLEAR" });
      setSuccess(true);

      // Redirect home after short delay
      setTimeout(() => navigate("/"), 3000);
    } catch {
      setSuccess(false);
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          p: 3,
        }}
      >
        <Paper
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            maxWidth: 400,
            backgroundColor: "white",
          }}
          elevation={3}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ✅ Payment Successful
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Thank you for your purchase! Redirecting to homepage...
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Checkout
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Order Summary */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6">Order Summary</Typography>
          <Typography variant="body1" color="text.secondary">
            {state.cart.length} item(s)
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
            Total: ${total.toFixed(2)}
          </Typography>
        </Box>

        {/* Billing Info */}
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Billing Information</Typography>
          <TextField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />

          <Divider sx={{ my: 2 }} />

          {/* Payment Info */}
          <Typography variant="h6">Payment Details</Typography>
          <TextField
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              fullWidth
            />
            <TextField
              label="CVV"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              fullWidth
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={handleCheckout}
            sx={{
              mt: 3,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
              borderRadius: 3,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
            }}
            fullWidth
          >
            Pay ${total.toFixed(2)}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
