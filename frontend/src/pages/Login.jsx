import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ import background image
import background from "../assets/background.jpg"; // adjust path if needed

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${background})`, // ✅ background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 5,
            textAlign: "center",
             background: "rgba(255,255,255,0.9)", // ✅ semi-transparent white
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            sx={{
              color: "#222",
              letterSpacing: 1,
              textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              color: "#444",
              mb: 3,
              textShadow: "0px 1px 1px rgba(255,255,255,0.5)",
            }}
          >
            Log in to access your account.
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(6px)",
                },
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(6px)",
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                borderRadius: 3,
                py: 1.2,
                textTransform: "none",
                fontSize: "1rem",
                background: "linear-gradient(135deg, #222, #555)",
                "&:hover": {
                  background: "linear-gradient(135deg, #333, #666)",
                },
                boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              Log In
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                color: "#222",
                fontWeight: "bold",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Don’t have an account? Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
