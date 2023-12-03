import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const countOrders = () => {
    let c = 0;
    orders.forEach((o) => c += 1);
    return c;
  }

  const countTotalAmount = () => {
    let c = 0;
    orders.forEach((o) => c += o.itemsPrice);
    return c;
  }

  const getAllOrders = async () => {
    const res = await axios.get(`http://localhost:5000/api/v1/admin/orders`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
    if (res.data.success === true) {
      // console.log(res.data);
      setOrders(res.data.orders);
    }
  }

  const handleRemoveOrder = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/v1/order/${id}`, {
      params: {
        token: localStorage.getItem('token')
      }
    });

    if (res.data.success === true) {
      alert('Order Removed heading to profile page');
      navigate('/profile');
    }
  }

  const handleUpdateOrder = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/v1/admin/order/${id}`,
      {
        status: 'Delivered'
      },
      {
        params: {
          token: localStorage.getItem('token')
        }
      });

    if (res.data.success === true) {
      alert('Order Updated');
      navigate('/admin');
    }
  }

  useEffect(() => {
    getAllOrders();
  }, [])

  return (
    <div className="container mt-4 contact-header">
      <h3>Total Orders: {countOrders()}</h3>
      <h3>Total Amount: {countTotalAmount()}</h3>
      <div className="d-flex center flex-column">
        {!orders.isEmpty &&
          orders.map((order) => (
            <div className="card m-3" style={{ 'minWidth': '44vw', 'padding': '1rem' }} key={order._id}>
              <div>
                <h4>Shipping Info</h4>
                <h6>Date: {order.createdAt.slice(0, 10)}</h6>
                <p><b>Address: </b>{order.shippingInfo.address}</p>
                <p><b>City: </b>{order.shippingInfo.city}</p>
                <p><b>State: </b>{order.shippingInfo.state}</p>
                <p><b>Country: </b>{order.shippingInfo.country}</p>
                <p><b>Pin Code: </b>{order.shippingInfo.pinCode}</p>
                <p><b>Phone Number: </b>{order.shippingInfo.phoneNo}</p>
              </div>
              <h4>Order items: {order.orderItems.length}</h4>
              <p><b>Order Status:</b> {order.orderStatus}</p>
              <button onClick={() => handleRemoveOrder(order._id)} className='btn btn-danger m-2' style={{ 'maxWidth': '12vw' }}>Remove Order</button>
              <button onClick={() => handleUpdateOrder(order._id)} className='btn btn-success m-2' style={{ 'maxWidth': '12vw' }}>Update Order</button>
            </div>
          ))
        }
      </div>
      <Link to='/admin' className="btn btn-primary mt-2">Go back</Link>
    </div>
  );
};

export default AdminOrders;
