import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Container,
  Rating,
  TextField,
  MenuItem,
  Grid,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Extract unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // ✅ Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // ✅ Helper to calculate avg rating from reviews
  const getAverageRating = (reviews = []) => {
    if (!reviews.length) return 3.5; // fallback
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#fafafa", py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 4,
            color: "#111",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          New Tech Products
        </Typography>

        {/* ✅ Search + Filter Controls */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Search products..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Filter by Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* ✅ Product Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const avgRating = getAverageRating(product.reviews);
              const discountPrice =
                product.price -
                (product.price * (product.discountPercentage || 0)) / 100;

              return (
                <Card
                  key={product._id}
                  sx={{
                    flex: "1 1 calc(100% - 24px)",
                    maxWidth: {
                      xs: "100%",
                      sm: "calc(50% - 24px)",
                      md: "calc(25% - 24px)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 0,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: "#111",
                        mb: 0.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#777", mb: 0.5 }}
                    >
                      {product.brand}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#555", mb: 1 }}
                    >
                      {product.description.length > 60
                        ? product.description.slice(0, 60) + "..."
                        : product.description}
                    </Typography>
                    <Rating
                      value={avgRating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "black", fontWeight: 700 }}
                    >
                      £{discountPrice.toFixed(2)}{" "}
                      {product.discountPercentage > 0 && (
                        <Typography
                          component="span"
                          sx={{
                            textDecoration: "line-through",
                            color: "#999",
                            fontSize: "0.9rem",
                            ml: 1,
                          }}
                        >
                          £{product.price}
                        </Typography>
                      )}
                    </Typography>
                    <Chip
                      label={product.availabilityStatus}
                      size="small"
                      color={
                        product.availabilityStatus === "In Stock"
                          ? "success"
                          : "error"
                      }
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                    <Button
                      component={Link}
                      to={`/product/${product._id}`}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "black",
                        borderColor: "black",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
                        },
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#333",
                        "&:hover": { backgroundColor: "#555" },
                      }}
                      disabled={product.stock <= 0}
                      onClick={() => dispatch({ type: "ADD", payload: product })}
                    >
                      {product.stock > 0 ? "Add" : "Out of Stock"}
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <Typography variant="h6" color="text.secondary">
              No products found 🚫
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
