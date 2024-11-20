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
            <p>Contact: +216 20844564</p>
          </Col>
          <Col md={6} className='text-center'>
            <p>Email: ichrafkhalfaoui4@gmail.com</p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className='text-center'>
          
            <p>Location: Your Address, City, Country</p>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            <p> IchrafArtsShop &copy; {currentYear} </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
