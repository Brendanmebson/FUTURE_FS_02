import { useContext } from "react";
import CartContext from "../context/CartContext";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  Avatar,
  Paper,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1000px", mx: "auto" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ fontSize: { xs: "1.8rem", sm: "2rem" } }}
      >
        Your Shopping Cart
      </Typography>

      {state.cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty 🛒
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
          {/* ✅ Desktop / Tablet View */}
          {!isMobile ? (
            <Table>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Product</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.cart.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          src={item.image}
                          alt={item.title}
                          variant="square"
                          sx={{ width: 60, height: 60, borderRadius: 2 }}
                        />
                        <Typography variant="subtitle1" fontWeight="500">
                          {item.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography>${item.price.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.quantity}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => dispatch({ type: "REMOVE", payload: item._id })}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            /* ✅ Mobile View: Card-style */
            <Box>
              {state.cart.map((item) => (
                <Paper
                  key={item._id}
                  elevation={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                  }}
                >
                  <Avatar
                    src={item.image}
                    alt={item.title}
                    variant="square"
                    sx={{ width: 70, height: 70, borderRadius: 2, mr: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="600">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" fontSize="0.9rem">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </Typography>
                    <Typography fontWeight="bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={() => dispatch({ type: "REMOVE", payload: item._id })}
                  >
                    Remove
                  </Button>
                </Paper>
              ))}
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* ✅ Total + Checkout (works on all devices) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Total: ${total.toFixed(2)}
            </Typography>
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              sx={{
                backgroundColor: "red",
                "&:hover": { backgroundColor: "darkred" },
                fontWeight: "bold",
                px: 3,
                py: 1.2,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
