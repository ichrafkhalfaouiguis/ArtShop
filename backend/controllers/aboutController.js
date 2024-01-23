import asyncHandler from '../middleware/asyncHandler.js';
import About from '../models/aboutModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import multer from 'multer';

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// @desc    Get About information
// @route   GET /api/about
// @access  Public
const getAbout = asyncHandler(async (req, res) => {
    const about = await About.findOne();
    res.json(about);
  });
  

// @desc    Update About information
// @route   PUT /api/about
// @access  Private/Admin
const updateAbout = asyncHandler(upload.array('images', 5), async (req, res) => {
  // 'images' should match the field name in the form-data
  // 5 is the maximum number of files allowed

  const { videos, text } = req.body;
  const images = req.files || []; // req.files will contain an array of uploaded files

  const about = await About.findOne();

  if (about) {
    about.images = images.map((image) => ({ url: `data:${image.mimetype};base64,${image.buffer.toString('base64')}` }));
    about.videos = videos;
    about.text = text;

    const updatedAbout = await about.save();
    res.json(updatedAbout);
  } else {
    // If 'About' document doesn't exist, create a new one
    const newAbout = new About({
      images: images.map((image) => ({ url: `data:${image.mimetype};base64,${image.buffer.toString('base64')}` })),
      videos,
      text,
    });
    const savedAbout = await newAbout.save();
    res.status(201).json(savedAbout);
  }
});

export { getAbout, updateAbout };

