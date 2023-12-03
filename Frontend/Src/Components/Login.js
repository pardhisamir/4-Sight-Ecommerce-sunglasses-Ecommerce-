import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passRef = useRef();

    const postData = async (email, password) => {
        const response = await fetch('http://localhost:5000/api/v1/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passRef.current.value;
        const res = await postData(email, password);
        if (res.success === true) {
            if (res.user.role === 'admin') {
                localStorage.setItem('token', res.token);
                navigate('/admin');
            } else {
                localStorage.setItem('token', res.token);
                navigate('/products');
            }
        } else {
            alert('Invalid cridentials');
            e.target.reset();
        }
    };

    const handleOnchange = (e) => {
        e.target.name = e.target.value;
    };

    return (
        <form className='login-form mt-5' onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input ref={emailRef} type="email" onChange={handleOnchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input ref={passRef} type="password" onChange={handleOnchange} className="form-control" id="exampleInputPassword1" placeholder='Password' />
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </div >
          <p>New here?</p>
          <Link to='/register'><button type='submit' className='btn btn-primary'>Sign Up?</button></Link>
        </form >
    );
};

export default Login;
