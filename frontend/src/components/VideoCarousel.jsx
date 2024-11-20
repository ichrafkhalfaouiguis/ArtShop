import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';  
import axios from 'axios';
import Message from './Message';
import { BASE_URL } from '../constants';

const VideoCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/about/media`);
        
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error('Error fetching videos:', error.message);
        setError('Failed to fetch videos');
      }
    };
  
    fetchVideos();
  }, []);
  

  return (
    <>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Link to="/aboutus" style={{ textDecoration: 'none' }}>
          <Carousel pause="hover" className="bg-secondary mb-4" style={{ height: '250px' }}>
          {videos.map((video, index) => (
  <Carousel.Item key={index}>
    <video autoPlay muted playsInline style={{ width: '100%', height: '250px' }}>
      <source src={video.url} type="video/mp4" /> 
      Your browser does not support the video tag.
    </video>
    <Carousel.Caption>
      <h2 className="text-white text-center">About Us</h2>
    </Carousel.Caption>
  </Carousel.Item>
))}

          </Carousel>
        </Link>
      )}
    </>
  );
};

export default VideoCarousel;
