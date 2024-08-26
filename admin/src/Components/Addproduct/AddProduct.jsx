import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetail, setProductDetail] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setProductDetail({
      ...productDetail,
      image: e.target.files[0]
    });
  };

  const changeHandler = (e) => {
    setProductDetail({
      ...productDetail,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async () => {
    console.log(productDetail);
    let responseData;
    let product = productDetail;
  
    let formData = new FormData();
    formData.append('product', image);
  
    try {
      // First fetch request (upload image)
      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(errorText);
      }
  
      responseData = await uploadResponse.json();
      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);
  
        // Second fetch request (save product details)
        const saveProductResponse = await fetch('http://localhost:4000/addProducts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
  
        const result = await saveProductResponse.json();
        if (result.success) {
          alert('Product Added');
        } else {
          alert('Failed to add product');
        }
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetail.name}
          onChange={changeHandler}
          type='text'
          name='name'
          placeholder='Type here'
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetail.old_price}
            onChange={changeHandler}
            type='text'
            name='old_price'
            placeholder='Type here'
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetail.new_price}
            onChange={changeHandler}
            type='text'
            name='new_price'
            placeholder='Type here'
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetail.category}
          onChange={changeHandler}
          name='category'
          className='add-product-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-thumbnail-img'
            alt="Product Thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type='file'
          name='image'
          id='file-input'
          hidden
        />
      </div>

      <button
        onClick={addProduct}
        className='addproduct-btn'
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
