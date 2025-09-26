import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function Navbar() {
  const { state } = useContext(CartContext);
  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#fff",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            letterSpacing: 1,
            color: "#333",
            "&:hover": { color: "#000" },
          }}
        >
          DEN.
        </Typography>

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <IconButton
            component={Link}
            to="/cart"
            sx={{ color: "#333", "&:hover": { color: "#000" } }}
          >
            <Badge
              badgeContent={cartCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#333",
                  color: "#fff",
                },
              }}
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Button
            onClick={handleLogout}
            sx={{
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 3,
              px: 2,
              background: "#333",
              "&:hover": {
                background: "#000",
              },
            }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
