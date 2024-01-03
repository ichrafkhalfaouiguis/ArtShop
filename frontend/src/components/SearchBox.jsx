import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [suggestions, setSuggestions] = useState([]);
  const { data: productsData } = useGetProductsQuery({ keyword });
  const suggestionsRef = useRef();

  useEffect(() => {
    if (productsData) {
      const productNames = productsData.products.map((product) => product.name);
      setSuggestions(productNames);
    }
  }, [productsData]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${encodeURIComponent(keyword.trim())}/page/1`);
      setKeyword('');
      setSuggestions([]);
    } else {
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setKeyword(input);
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setSuggestions([]);
    navigate(`/search/${encodeURIComponent(suggestion)}/page/1`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    // Clear the previous search results when clicking outside the suggestions
    if (suggestions.length > 0) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [suggestions, suggestionsRef]);

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={handleInputChange}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='outline-success' className='p-2 mx-2'>
        Search
      </Button>

      {suggestions.length > 0 && (
        <ListGroup
          ref={suggestionsRef}
         
         
        >
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                cursor: 'pointer',
                padding: '8px 16px',
                borderBottom: index < suggestions.length - 1 ? '1px solid #ced4da' : 'none',
                backgroundColor: '#fff',
              }}
            >
              {suggestion}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form>
  );
};

export default SearchBox;
