import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ import background image
import background from "../assets/background.jpg"; // adjust path if needed

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Error signing up. Try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${background})`, // ✅ set background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            background: "rgba(255,255,255,0.9)", // ✅ slight transparency
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "#333", letterSpacing: 1 }}
          >
            Create an Account
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "#666", mb: 3 }}
          >
            Join us and start shopping today.
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSignup}
              sx={{
                borderRadius: 3,
                py: 1.2,
                textTransform: "none",
                fontSize: "1rem",
                background: "#333",
                "&:hover": {
                  background: "#555",
                },
              }}
            >
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Already have an account? Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
