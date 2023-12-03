import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Product.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (loading) {
      (async () => {
        const prod = await axios.get(
          `http://localhost:5000/api/v1/products?page=${page}`,
          null
        );
        setProducts(prod.data.products);
        setProductsCount(prod.data.productsCount);
        setLoading(false);
      })();
    }
    const pages = Math.ceil(productsCount / 8);
    setTotalPages(pages);
    const localCart = localStorage.getItem("cart");
    const parsedLocalCart = JSON.parse(localCart);
    if (parsedLocalCart !== null) {
      setCart(parsedLocalCart);
    }
    // eslint-disable-next-line
  }, [loading]);

  const onClickNextPage = () => {
    setPage(page + 1);
    setLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const onPreviousClick = () => {
    setPage(page - 1);
    setLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const getFilteredProducts = (products) => {
    return products.filter((product) => product.name.includes(search));
  };

  const getProductsByCategory = (products) => {
    return products.filter((product) => product.category.includes(category));
  };

  const onSearchChange = (e) => {
    setSearch(e.currentTarget.value);
  };

  const onClickCasual = () => {
    setCategory("eyeglasses");
  };

  const onClickFormal = () => {
    setCategory("sunglasses");
  };

  const onClickReset = () => {
    setCategory("");
  };

  const handleAddToCart = (product) => {
    setCart((cart) => [...cart, product]);
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart");
  };

  return (
    <div className="container product-container">
      <div className="search d-flex center">
        <input
          type="text"
          className="form-control m-3"
          style={{ maxWidth: "30vw" }}
          value={search}
          id="searchBar"
          placeholder="Search products in this page"
          onChange={onSearchChange}
        />
        {!loading && (
          <p>
            {page}/{totalPages} pages
          </p>
        )}
      </div>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Category
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={onClickCasual}>
              Eyeglasses
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={onClickFormal}>
              Sunglasses
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={onClickReset}>
              Reset
            </button>
          </li>
        </ul>
      </div>

      {category === "" ? (
        <div className="container d-flex flex-wrap m-2 center">
          {!loading &&
            getFilteredProducts(products).map((product) => (
              <div
                className="card m-3"
                style={{ width: "18rem" }}
                key={product._id}
              >
                <img
                  src={product.image}
                  className="card-img-top rounded"
                  style={{ minHeight: "30vh" }}
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6>&#8377;{product.price}</h6>
                  {/* <p className="card-text">{product.description}</p> */}
                  <button
                    to="#"
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <br></br>

                  <br></br>

                  <button to="#" className="btn btn-danger">
                    {" "}
                    <Link
                      to={`/productpage/${product._id}`}
                      className="view-products"
                    >
                      More Details
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="container d-flex flex-wrap m-2 center">
          {getProductsByCategory(products).map((product) => (
            <div
              className="card m-3"
              style={{ width: "18rem" }}
              key={product._id}
            >
              <img
                src={product.image}
                className="card-img-top rounded"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6> &#8377;{product.price}</h6>
                <p className="card-text">{product.description}</p>
                <button
                  to="#"
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <br></br>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="container d-flex flex-col center">
        {page < totalPages && (
          <button
            type="button"
            className="btn btn-primary m-1 "
            onClick={onClickNextPage}
          >
            Load more
          </button>
        )}
        {page > 1 && (
          <button
            type="button"
            className="btn btn-secondary m-1"
            onClick={onPreviousClick}
          >
            Previous page
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
