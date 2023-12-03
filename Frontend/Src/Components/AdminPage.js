import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPage.css';
import axios from 'axios';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        const prod = await axios.get(`http://localhost:5000/api/v1/products?page=${page}`, null);
        return prod;
    };

    useEffect(() => {
        if (loading) {
            (async () => {
                const prod = await getProducts();
                setProducts(prod.data.products);
                setProductsCount(prod.data.productsCount);
                setLoading(false);
            })();
        }
        const pages = Math.ceil(productsCount / 8);
        setTotalPages(pages);
        // eslint-disable-next-line
    }, [loading]);

    const onClickNextPage = () => {
        setPage(page + 1);
        setLoading(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const onPreviousClick = () => {
        setPage(page - 1);
        setLoading(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const handleUpdate = (id) => {
        localStorage.setItem('updateid', id);
    };

    const deleteProduct = async (id) => {
        if (id !== null) {
            const res = await fetch(`http://localhost:5000/api/v1/admin/products/${id}`, {
                method: 'DELETE',
                mode: 'cors'
            });
            return res.json();
        }
    };

    const handleDeleteProduct = async (id) => {
        const res = await deleteProduct(id);
        if (res.success === true) {
            alert('Product deleted successfully');
            const prod = await getProducts();
            setProducts(prod.data.products);
            setProductsCount(prod.data.productsCount);
        } else {
            alert('some error occurred');
        }
    };

    return (
        <div>
          <h3 style={{ marginTop: '3rem' }}>Admin Dashboard</h3>
          <div>
            <Link to='/admin/createproduct' className="btn btn-primary m-4">Create product</Link>
            <Link to='/admin/orders' className="btn btn-primary">View Orders</Link>
          </div>

          <h3>Available products</h3>
          <div className="d-flex flex-wrap">
            {
                products.map((product) => (
                    <div className="card m-3 d-flex flex-wrap" style={{ width: '18rem' }} key={product._id}>
                      <img src={product.image} style={{ maxWidth: '100%' }} alt="" />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <Link to="/admin/updateproduct" className="btn btn-success mb-2" onClick={() => handleUpdate(product._id)}>Update Product</Link>
                        <button to="/admin/updateproduct" className="btn btn-danger" onClick={() => handleDeleteProduct(product._id)}>Delete Product</button>
                      </div>
                    </div>
                ))
            }
          </div>


          <div className='container d-flex flex-col center'>
            {page < totalPages && <button type="button" className="btn btn-primary m-1 " onClick={onClickNextPage}>Load more</button>}
            {page > 1 && <button type='button' className='btn btn-secondary m-1' onClick={onPreviousClick}>Previous page</button>}
          </div>


        </div>
    );
};

export default AdminPage;
