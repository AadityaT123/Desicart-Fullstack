import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar'; // Ensure the casing is correct
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../Components/Addproduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
      <Route path='/addproducts' element={<AddProduct/>}/>
      <Route path='/listproducts' element={<ListProduct/>}/>
      </Routes>
    </div>
  );
};

export default Admin;
