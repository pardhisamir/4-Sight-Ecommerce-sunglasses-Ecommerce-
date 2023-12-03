import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="a">
        <h4>4-Sight</h4>
        <p>
          Customer satisfaction is our at-most priority with more than a million
          happy customers
        </p>
        <p>Copyright &copy;{date}</p>
      </div>
      <div className="b">
        <h6>Follow us</h6>
        <a href="https://facebook.com">Facebook</a>
        <br />
        <a href="https://instagram.com">Instagram</a>
        <br />
        <a href="https://twitter.com">Twitter</a>
        <br />
      </div>
    </div>
  );
};

export default Footer;
