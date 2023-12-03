import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import EditProfile from './components/EditProfile';
import AdminPage from './components/AdminPage';
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from './components/UpdateProduct';
import Checkout from "./components/Checkout";
import Pay from "./components/Pay";
import AdminOrders from "./components/AdminOrders";
import ProductPage from "./components/ProductPage";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container d-flex center p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/createproduct" element={<CreateProduct />} />
            <Route path="/admin/updateproduct" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/productpage/:id" element ={<ProductPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default AppRouter;
