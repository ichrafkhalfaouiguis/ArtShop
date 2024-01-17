import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const imageFiletypes = /jpe?g|png|webp/;
  const videoFiletypes = /mp4|avi|mkv|mov/;

  const extname = path.extname(file.originalname).toLowerCase();
  const isImage = imageFiletypes.test(extname);
  const isVideo = videoFiletypes.test(extname);

  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(new Error('Images or videos only!'), false);
  }
}

const upload = multer({ storage, fileFilter });

router.post('/', upload.array('files', 10), (req, res) => {
  if (req.files.length === 0) {
    return res.status(400).send({ message: 'No files uploaded' });
  }

  const files = req.files.map((file) => ({
    path: `/${file.path}`,
    type: file.mimetype.startsWith('image/') ? 'image' : 'video',
  }));

  res.status(200).send({
    message: 'Files uploaded successfully',
    files: files,
  });
});

export default router;
