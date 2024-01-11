import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <footer>
      <Container>
        <Row>
          <Col md={6} className='text-center'>
            <p>Contact: +49 1111 1111111</p>
          </Col>
          <Col md={6} className='text-center'>
            <p>Email: steGuis@gmail.com</p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className='text-center'>
            {/* Display your location text here */}
            <p>Location: Your Address, City, Country</p>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            <p> RomisArtsShop &copy; {currentYear} </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
