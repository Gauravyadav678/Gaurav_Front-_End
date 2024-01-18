import React, { useState, useEffect } from 'react';
import { Navbar } from "../components";
import './Seller.css';

const Seller = () => {
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({
    Category_display_name: '',
    title: '',
    price: '',
    description: '',
    imageUrl: '',
    inStock: false, // Added inStock property with default value false
  });

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories', { method: 'GET' });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox input separately
    const newValue = type === 'checkbox' ? checked : value;

    setNewItem((prevNewItem) => ({ ...prevNewItem, [name]: newValue }));
  };

  const handleCreateNewItem = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setNewItem({
          Category_display_name: '',
          title: '',
          price: '',
          description: '',
          imageUrl: '',
          inStock: false, // Reset stock availability after creating a new item
        });
      } else {
        console.error('Failed to create a new item');
      }
    } catch (error) {
      console.error('Error creating a new item:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='createNewItemContainer'>
        <h2>Categories</h2>

        <h2>Create New Item</h2>
        <div className='eachTextFieldForSellerContainer'>
          <label>Select Category Display Name:</label>
          <select name="Category_display_name" value={newItem.Category_display_name} onChange={handleInputChange}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="footwear">Footwear</option>
            <option value="apparel">Apparel</option>
          </select>
        </div>
        <div className='eachTextFieldForSellerContainer'>
          <label>Enter Price:</label>
          <input type="text" name="price" value={newItem.price} onChange={handleInputChange} />
        </div>
        <div className='eachTextFieldForSellerContainer'>
          <label>Enter title:</label>
          <input type="text" name="title" value={newItem.title} onChange={handleInputChange} />
        </div>
        <div className='eachTextFieldForSellerContainer'>
          <label>Enter Description:</label>
          <input type="text" name="description" value={newItem.description} onChange={handleInputChange} />
        </div>
        <div className='eachTextFieldForSellerContainer'>
          <label>Enter Image URL:</label>
          <input type="text" name="imageUrl" value={newItem.imageUrl} onChange={handleInputChange} />
        </div>
        <div className='eachTextFieldForSellerContainer'>
          <label>Stock Available:</label>
          <input type="checkbox" name="inStock" checked={newItem.inStock} onChange={handleInputChange} />
        </div>
        <button onClick={handleCreateNewItem}>Create New Item</button>
      </div>
    </div>
  );
};

export default Seller;
