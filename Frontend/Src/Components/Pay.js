import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pay = () => {
  const navigate = useNavigate();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const pinRef = useRef();
  const phoneRef = useRef();

  const [payment, setPayment] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const c = localStorage.getItem("cart");
    if (!c.isEmpty) {
      const parsedC = JSON.parse(c);
      setCartItems(parsedC);
    }
  }, []);

  const getCartCost = () => {
    let cost = 0;
    cartItems.forEach((item) => (cost += item.price));
    return cost;
  };

  const postData = async (data) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/order/new",
      data,
      {
        params: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const shippingInfo = {
      address: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      country: countryRef.current.value,
      pinCode: pinRef.current.value,
      phoneNo: phoneRef.current.value,
    };
    const data = {
      shippingInfo: shippingInfo,
      orderItems: cartItems,
      paymentInfo: payment,
      itemsPrice: getCartCost(),
    };
    const res = await postData(data);
    if (res.success !== true) {
      alert("Some Error occurred");
    } else {
      razorPay();
      clearCart();

      navigate("/profile");
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const razorPay = async () => {
    const amount = getCartCost();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline");
      return;
    }

    const options = {
      key: "rzp_test_0IYFXNw795iFmU",
      currency: "INR",
      amount: amount * 100,
      name: "pay with razopay",
      description: "Thanks for purchasing",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",

      handler: function (response) {
        // alert(response.raporpay_payment_id);
        // alert("Payment Successful");
        alert("Your Order has been placed");
      },
      prefill: {
        name: "pay with razopay",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="m-4">
      <div className="mb-3" style={{ minWidth: "30vw" }}>
        <h5>Address</h5>
        <textarea
          ref={addressRef}
          className="form-control"
          id="address"
          rows="4"
          placeholder="Enter the shipping address"
        ></textarea>
        <h5>City</h5>
        <input
          type="text"
          ref={cityRef}
          className="form-control"
          id="address"
          rows="4"
        ></input>
        <h5>State</h5>
        <input
          type="text"
          ref={stateRef}
          className="form-control"
          id="address"
          rows="4"
        ></input>
        <h5>Country</h5>
        <input
          type="text"
          ref={countryRef}
          className="form-control"
          id="address"
          rows="4"
        ></input>
        <h5>Pin Code</h5>
        <input
          type="number"
          ref={pinRef}
          className="form-control"
          id="address"
          rows="4"
        ></input>
        <h5>Phone Number</h5>
        <input
          type="number"
          ref={phoneRef}
          className="form-control"
          id="address"
          rows="4"
        ></input>
      </div>
      <div className="dropdown">
        <h5>Payment method</h5>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {payment !== "" ? payment : "Payment method"}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                setPayment("pay online");
              }}
            >
              pay online
            </button>
          </li>
          <li>
            {/* <button className="dropdown-item disabled">Credit Card</button> */}
          </li>
          <li>
            {/* <button className="dropdown-item disabled">UPI</button> */}
          </li>
        </ul>
      </div>
      <button className="m-4 btn btn-success" onClick={handlePlaceOrder}>
        Place Order
      </button>
      {/* <button className="m-4 btn btn-success" onClick={razorPay}>
        Razor Pay
      </button> */}
    </div>
  );
};

export default Pay;
