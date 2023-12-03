import React, { useState } from "react";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    stock: 0,
    category: "",
  });

  const postData = async (product) => {
    const response = await fetch(
      "http://localhost:5000/api/v1/admin/products/new",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    return response.json();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await postData(product);
    if (res.success === true) {
      alert("Product created successfully");
      setProduct({
        name: "",
        description: "",
        price: 0,
        image: "",
        stock: 0,
        category: "",
      });
    } else {
      alert("some error occurred");
    }
  };

  const handleOnChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="productname" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="product name"
          value={product.name}
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productdesc" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="some product description"
          value={product.description}
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productprice" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          name="price"
          placeholder="product price"
          value={product.price}
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productimage" className="form-label">
          Image Link
        </label>
        <input
          type="text"
          className="form-control"
          name="image"
          placeholder="product image link"
          value={product.image}
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productstock" className="form-label">
          Stock
        </label>
        <input
          type="number"
          className="form-control"
          name="stock"
          placeholder="Number of stock"
          value={product.stock}
          onChange={handleOnChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productcategory" className="form-label">
          Category
        </label>
        <input
          type="text"
          className="form-control"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleOnChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleOnSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateProduct;
