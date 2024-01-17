import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../constants';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      const resetToken = new URLSearchParams(window.location.search).get('token');
      const userId = new URLSearchParams(window.location.search).get('id');

      const response = await axios.put(`${BASE_URL}/api/users/resetPassword/${resetToken}`, {
        userId,
        password,
      });

      console.log('Server Response:', response.data);

      setMessage('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error.message);
      console.log('Error Details:', error.response); // Log additional error details
      setMessage('Failed to update password. Please try again.');
    }
  };

  return (
    <>
      <h1>{message}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='password'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update Password
        </Button>
      </Form>
    </>
  );
};

export default UpdatePassword;
