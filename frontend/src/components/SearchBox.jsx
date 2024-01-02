import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetProductsByCategoryQuery,useGetProductsQuery } from '../slices/productsApiSlice'; // Update with the correct import path

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  // Fetch products based on the keyword
  const { data: productsData } = useGetProductsQuery({ keyword, pageNumber: 1 });

  // Fetch products based on the category (optional)
   const { data: categoryProductsData } = useGetProductsByCategoryQuery();

  useEffect(() => {
    // You can access the fetched products in the `productsData` variable.
    console.log(productsData);
  }, [productsData]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='outline-success' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
