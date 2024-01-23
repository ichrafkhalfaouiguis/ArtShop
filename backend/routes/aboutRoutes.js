import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAbout).put( updateAbout);

export default router;
