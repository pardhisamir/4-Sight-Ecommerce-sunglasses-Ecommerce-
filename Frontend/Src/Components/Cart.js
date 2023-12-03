import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    const parsedLocalCart = JSON.parse(localCart);
    if (parsedLocalCart !== null) {
      setCart(parsedLocalCart);
    }
  }, []);

  const getCartCost = () => {
    let cost = 0;
    cart.forEach(item => cost += item.price);
    return cost;
  }

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    alert('cart cleared');
    navigate('/products');
  }

  const handleRemoveItem = (product) => {
    const newCart = cart.filter(item => item._id !== product._id);
    setCart(newCart);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(newCart))
    alert('Item removed from cart');
  }

  return (
    <div>
      {cart.length === 0 ?
        <h3 className='mt-3'>Cart Is Empty</h3> :
        <button className="btn btn-primary m-3" onClick={handleClearCart}>Clear Cart</button>}
      <div>
        {cart !== null && cart.map((item) => (
          <div className="card m-3" style={{ width: '18rem' }} key={item._id}>
            <img src={item.image} className="card-img-top rounded" style={{ minHeight: '30vh' }} alt="" />
            <div className="card-body">
              <h5 className="card-title" >{item.name}</h5>
              <h6 >&#8377;{item.price}</h6>
              <p className="card-text" >{item.description}</p>
              <button className="btn btn-primary" onClick={() => handleRemoveItem(item)}>Remove Item</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {cart.length !== 0 &&
          <div>
            <p><b>Total Cost:</b>&#8377;{getCartCost()}</p>
            <Link to='/checkout' className="btn btn-success">Checkout</Link>
          </div>
        }
      </div>
    </div>
  );
};

export default Cart;
