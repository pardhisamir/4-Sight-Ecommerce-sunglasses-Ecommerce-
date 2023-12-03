import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [cart, setCart] = useState([]);

  const getCartCost = () => {
    let cost = 0;
    cart.forEach(item => cost += item.price);
    return cost;
  }

  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    const parsedLocalCart = JSON.parse(localCart);
    if (parsedLocalCart !== null) {
      setCart(parsedLocalCart);
      getCartCost();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="m-4 card">
        <div className="card-header">
          Order Details
        </div>
        <div className="card-body">
          {cart.map((item) => (
            <div key={item._id}>
              <img src={item.image} alt="" />
              <p className="card-text"><b>{item.name}</b>: &#8377;{item.price}</p>
            </div>
          ))}
          <h4 className='m-3'>Total Cost: &#8377;{getCartCost()}</h4>
          <Link to="/pay" className="btn btn-success">Confirm Order</Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;