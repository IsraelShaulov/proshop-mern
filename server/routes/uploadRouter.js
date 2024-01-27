import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },

  filename(req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

const fileFilter = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
};

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  res.status(200).json({
    message: 'Image Uploaded',
    image: `/${req.file.path.replace(/\\/g, '/')}`,
  });
});

export default router;
