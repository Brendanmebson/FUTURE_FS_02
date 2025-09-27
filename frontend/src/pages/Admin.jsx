import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`).then(res => setProducts(res.data));
  }, []);

  const addProduct = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, { title, price, description: "Sample", image: "https://via.placeholder.com/150", category: "Misc", stock: 10 }, { headers: { Authorization: `Bearer ${token}` }});
      alert("Product added!");
      setTitle(""); setPrice("");
    } catch (err) { alert("Admin only!"); }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>
      <h3>All Products</h3>
      <ul>{products.map(p => <li key={p._id}>{p.title} - ${p.price}</li>)}</ul>
    </div>
  );
}
