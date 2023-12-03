import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="hero">
        <h2>Premium sneakers now have one stop shop</h2>
        <button className="btn btn-danger"><Link to='/products' className='view-products'>View products</Link></button>
      </div>
    </div>
  );
};

export default Home;
