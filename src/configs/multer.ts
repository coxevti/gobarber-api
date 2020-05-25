import path from 'path';
import crypto from 'crypto';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(10).toString('hex');
      const filename = `${hash}-${file.originalname}`;
      return cb(null, filename);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ): void => {
    switch (file.mimetype) {
      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg':
        return cb(null, true);
      default:
        return cb(new Error('File format should be PNG, JPG, JPEG'));
    }
  },
};
