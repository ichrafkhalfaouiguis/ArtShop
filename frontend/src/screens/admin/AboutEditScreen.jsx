import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Carousel } from 'react-bootstrap';
import { useGetAboutQuery, useUpdateAboutMutation } from '../../slices/aboutApiSlice';
import Loader from '../../components/Loader';
const loadingUpload = false;

const AboutEditScreen = () => {
  const { data: about, error, isLoading } = useGetAboutQuery();
  const [updateAbout, { isLoading: updatingAbout }] = useUpdateAboutMutation();
  const [newText, setNewText] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newVideo, setNewVideo] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file

  useEffect(() => {
    // Fetch the about information on component mount
  }, []);

  const handleUpdateAbout = async () => {
    try {
      const formData = new FormData();
      formData.append('text', newText || about?.text);
      formData.append('videos', newVideo || about?.videos);

      // If an image file is selected, append it to the form data
      if (imageFile) {
        formData.append('images', imageFile);
      } else {
        // If no new image file is selected, use the existing image URLs
        formData.append('images', JSON.stringify(newImage ? [...about?.images, { url: newImage }] : about?.images));
      }

      await updateAbout({ data: formData });
      // Optionally, refetch the about information after updating
      // This depends on whether you want the UI to reflect the updated data immediately
    } catch (error) {
      // Handle error
    }
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading about information</p>;
  }

  return (
    <Container>
      <Row className='mt-5'>
        <Col md={6}>
          {/* Display uploaded images in a carousel */}
          <Carousel>
            {about?.images?.map((image, index) => (
              <Carousel.Item key={index}>
                <img src={image.url} alt={`About Image ${index + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          {/* Display uploaded videos */}
          {about?.videos?.map((video, index) => (
            <div key={index}>
              <video controls width="320" height="240">
                <source src={video.url} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </Col>
        <Col md={6}>
          <h2>About Romis Artshop</h2>
          <p>{about?.text}</p>
          <Form.Group controlId='newText'>
            <Form.Label>New Text</Form.Label>
            <Form.Control
              as='textarea'
              rows={4}
              placeholder='Enter new text...'
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </Form.Group>
          
       
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <Form.Control
              label='Choose File'
              onChange={uploadFileHandler}
              type='file'
            />
            {loadingUpload && <Loader />}
          </Form.Group>
           
          <Form.Group controlId='video'>
            <Form.Label>Video</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter video url'
              value={newImage}
              onChange={(e) => setNewVideo(e.target.value)}
            />
            <Form.Control
              label='Choose File'
              onChange={uploadFileHandler}
              type='file'
            />
            {loadingUpload && <Loader />}
          </Form.Group>

          <Button onClick={handleUpdateAbout} disabled={updatingAbout}>
            {updatingAbout ? 'Updating...' : 'Update About'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutEditScreen;
