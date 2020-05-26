import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';

import './database';
import multerConfig from './configs/multer';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use('/files', express.static(multerConfig.directoryUpload));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    status: 'fail',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333');
});
