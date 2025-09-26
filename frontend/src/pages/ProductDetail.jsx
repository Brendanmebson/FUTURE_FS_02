import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Rating,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import CartContext from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 3, md: 6 },
        p: { xs: 2, sm: 3, md: 6 },
        background: "#fafafa",
        minHeight: "100vh",
      }}
    >
      {/* Left: Product Image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          image={product.thumbnail || product.images?.[0]}
          alt={product.title}
          sx={{
            width: { xs: "100%", sm: "90%", md: "100%" },
            height: { xs: 250, sm: 350, md: 500 },
            objectFit: "contain",
            mb: 2,
          }}
        />

        {/* Small thumbnails for other images */}
        <Stack direction="row" spacing={1} sx={{ overflowX: "auto" }}>
          {product.images?.map((img, i) => (
            <CardMedia
              key={i}
              component="img"
              image={img}
              alt={`${product.title} ${i}`}
              sx={{
                width: 60,
                height: 60,
                borderRadius: 1,
                objectFit: "cover",
                cursor: "pointer",
                border: "1px solid #ddd",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Right: Product Info */}
      <Box
        sx={{
          flex: 1,
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          p: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        {/* Title + Category + Brand */}
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1.5rem", md: "2rem" } }}
          >
            {product.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#666", mb: 1 }}>
            Category: {product.category} | Brand: {product.brand}
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", mb: 2 }}>
            SKU: {product.sku}
          </Typography>

          {/* Price + Discount + Rating */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            £{product.price}{" "}
            <Typography
              component="span"
              sx={{ color: "red", ml: 1, fontSize: "0.9rem" }}
            >
              -{product.discountPercentage}% Off
            </Typography>
          </Typography>
          <Rating
            value={product.rating || 0}
            precision={0.5}
            readOnly
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Description */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          {/* Stock + Availability */}
          <Typography
            variant="body2"
            sx={{
              color: product.stock > 0 ? "green" : "red",
              mb: 2,
            }}
          >
            {product.availabilityStatus} ({product.stock} left)
          </Typography>

          {/* Warranty + Shipping + Return */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            Warranty: {product.warrantyInformation}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Shipping: {product.shippingInformation}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Return Policy: {product.returnPolicy}
          </Typography>

          {/* Tags */}
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
            {product.tags?.map((tag, i) => (
              <Chip key={i} label={tag} size="small" sx={{ background: "#eee" }} />
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Reviews */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Reviews
            </Typography>
            {product.reviews?.length > 0 ? (
              product.reviews.map((rev, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Rating value={rev.rating} readOnly size="small" />
                  <Typography variant="body2">
                    "{rev.comment}" – {rev.reviewerName}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No reviews yet.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: "auto",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#333" },
              py: 1.5,
            }}
            onClick={() => dispatch({ type: "ADD", payload: product })}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#000",
              color: "#000",
              "&:hover": { backgroundColor: "#000", color: "#fff" },
              py: 1.5,
            }}
            onClick={() => dispatch({ type: "ADD", payload: product })}
          >
            Buy Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
