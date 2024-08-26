import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css';
import add_product_icon from '../../assets/Product_Cart.svg'
import Product_list_icon from  '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/addproducts' style={{ textDecoration: 'none' }}>
        <div className="sidebar-items">
        <img src={add_product_icon} alt="" />
        <p>Add Product</p>
        </div>
      </Link>
      <Link to='/listproducts' style={{ textDecoration: 'none' }}>
      <div className="sidebar-items">
      <img src={Product_list_icon} alt="" />
      <p>Product List</p>
      </div>
    </Link>
    </div>
  );
}

export default Sidebar;
