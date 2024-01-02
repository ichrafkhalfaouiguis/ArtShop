import React from 'react';
import { Container, Row, Col, Image, Card, CardGroup } from 'react-bootstrap';

const AboutUsScreen = () => {
  const videoUrl = '/video.mp4';

  return (
    <Container>
      <Row className='mt-5'>
        <Col md={6}>
          <video autoPlay muted>
            <source src={videoUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </Col>
        <Col md={6}>
          <h2>About Romis Artshop</h2>
          <p>
            Welcome to Romis Artshop, where art comes to life! Our journey
            began with a passion for creativity and a dedication to bringing
            unique, handmade art to the world.
          </p>
          <p>
            At Romis Artshop, we believe in the power of art to inspire,
            uplift, and connect people. Our team of talented artists
            crafts each piece with love and attention to detail, ensuring that
            every creation is a work of art that tells a story.
          </p>
          <p>
            Whether you're looking for stunning paintings, exquisite ceramics,
            fashionable wearables, or stylish furniture, you'll find it all at
            Romis Artshop. Join us on this artistic journey, and let the beauty
            of our creations enrich your life.
          </p>
        </Col>
        {/* Add a list of images in the same row */}
        <Col md={12} className='mt-3'>
          <CardGroup>
            <Card style={{ width: '12rem' }}>
              <Card.Img
                variant='top'
                src='/images/c1.jpg'
                alt='Art Image 1'
                className='custom-card-img'
              />
              <Card.Body>
                {/* Add any additional content or description here */}
              </Card.Body>
            </Card>
            <Card style={{ width: '12rem' }}>
              <Card.Img
                variant='top'
                src='/images/c2.jpg'
                alt='Art Image 2'
                className='custom-card-img'
              />
              <Card.Body>
                {/* Add any additional content or description here */}
              </Card.Body>
            </Card>
            <Card style={{ width: '12rem' }}>
              <Card.Img
                variant='top'
                src='/images/c3.jpg'
                alt='Art Image 3'
                className='custom-card-img'
              />
              <Card.Body>
                {/* Add any additional content or description here */}
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsScreen;
