// ProductAddScreen.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { useCreateProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductAddScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform any additional validation if needed

      // Call the createProduct mutation
      const createdProduct = await createProduct({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();

      toast.success(`Product "${createdProduct.name}" added successfully`);
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred while adding the product.');
    }
  };

  return (
    <FormContainer>
      <h1>Add Product</h1>
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter count in stock'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Add Product
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to='/admin/productlist' className='btn btn-light'>
            Go Back
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ProductAddScreen;
