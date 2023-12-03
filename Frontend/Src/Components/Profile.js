import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Contact.css';

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const [orders, setOrders] = useState([]);

    const countOrders = () => {
        let c = 0;
        orders.forEach((o) => c += 1);
        return c;
    }

    const getUserDetails = async () => {
        const res = await axios.get('http://localhost:5000/api/v1/me', {
            params: {
                token: localStorage.getItem('token')
            }
        });
        const user = res.data.user;
        if (user.role === 'admin') {
            setAdmin(true);
        }
        setUser(user);
    };

    const getOrders = async () => {
        const res = await axios.get('http://localhost:5000/api/v1/order/me', {
            params: {
                token: localStorage.getItem('token')
            }
        });
        if (res.data.orders.length !== 0) {
            setOrders(res.data.orders);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            if (isLoggedIn) {
                getUserDetails();
                getOrders();
            }
        }
    }, [isLoggedIn]);

    const navigate = useNavigate();
    const handleOnClick = () => {
        localStorage.clear();
        alert('Logged out successfully');
        navigate('/');
    };

    const handleLoginOnClick = () => {
        navigate('/login');
    };

    const handleProfileEdit = () => {
        navigate('/editprofile');
    };

    const handleAdmin = () => {
        navigate('/admin');
    };

    const handleRemoveOrder = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/v1/order/${id}`, {
            params: {
                token: localStorage.getItem('token')
            }
        });

        if (res.data.success === true) {
            alert('Order Removed heading to products page');
            navigate('/products');
        }
    }

    if (isLoggedIn) {
        return (
            <div className="container mt-4 contact-header">
                <h3>User details</h3>
                <p><b>Name</b>: {user.name}</p>
                <p><b>Email</b>: {user.email}</p>
                <button className='btn btn-primary mb-4' onClick={handleProfileEdit}>Edit Profile</button> <br />
                <button className='btn btn-primary mb-2' style={admin ? { "display": "inline" } : { "display": "none" }} onClick={handleAdmin}>Admin Dashboard</button>

                <h3 style={admin ? { "display": "none" } : { "display": "block" }}>My Orders: {countOrders()}</h3>
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
                                <button onClick={() => handleRemoveOrder(order._id)} className='btn btn-danger' style={{ 'maxWidth': '12vw' }}>Remove Order</button>
                            </div>
                        ))
                    }
                </div>
                <button onClick={handleOnClick} className='btn btn-primary m-4'>logout</button> <br /> <br />
            </div>
        );
    } else {
        return (
            <div className="container mt-4 contact-header">
                <h5>You are not logged in!!</h5>
                <p>Go to login page to either login or register</p>
                <button className='btn btn-primary' onClick={handleLoginOnClick}>Go to Login</button>
            </div>
        );
    }
};

export default Profile;
