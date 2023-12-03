import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState("");
  const [cart, setCart] = useState([]);
  const getProducts = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
    setProduct(res.data.product);
    console.log(product);
  };

  const handleAddToCart = (product) => {
    setCart((cart) => [...cart, product]);
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart");
  };
  useEffect(() => {
    getProducts(params.id);
  }, []);
  return (
    <div classname="container">
      <img src={product.image} style={{ margin: "3rem" }} alt="" />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <button
        to="#"
        className="btn btn-primary"
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </button>
      <h3>{product.price}</h3>
    </div>
  );
};

export default ProductPage;
