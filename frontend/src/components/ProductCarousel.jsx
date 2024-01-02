import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetProductsByCategoryQuery } from '../slices/productsApiSlice';
import { useNavigate } from 'react-router-dom';

const ProductCarousel = () => {
  const categories = ['Arts', 'Ceramic', 'Fomewear', 'Furniture'];

  return (
   
    <>
       <AboutUsCarousel />
      <div className="row">
        <div className="col-md-6">
          <CategoryCarousel category={categories[0]} />
        </div>
        <div className="col-md-6">
          <CategoryCarousel category={categories[1]} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <CategoryCarousel category={categories[2]} />
        </div>
        <div className="col-md-6">
          <CategoryCarousel category={categories[3]} />
        </div>
      </div>
    </>
  );
};

const AboutUsCarousel = () => {
  const videoUrls = ['v1.mp4', 'video.mp4'];

  return (
    <Link to="/aboutus" style={{ textDecoration: 'none' }}>
      <Carousel pause="hover" className="bg-secondary mb-4" style={{ height: '250px' }}>
        {videoUrls.map((videoUrl, index) => (
          <Carousel.Item key={index}>
            <video autoPlay muted playsInline style={{ width: '100%', height: '250px' }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Carousel.Caption>
              <h2 className="text-white text-center">About Us</h2>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Link>
  );
};
const CategoryCarousel = ({ category }) => {
  const { data: products, isLoading, error } = useGetProductsByCategoryQuery(category);

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div className="text-center mb-4">
      <h2>{category}</h2>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <Carousel pause='hover' className='bg-primary' style={{ width: '80%', height: '200px' }}>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              {/* Update the Link component to navigate to the specific category screen */}
              <Link to={`/category/${category}`} style={{ textDecoration: 'none' }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                />

                <Carousel.Caption className='carousel-caption text-center'>
                  <h3 className='text-white' style={{ fontSize: '16px' }}>
                    {product.name} (${product.price})
                  </h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};


export default ProductCarousel;