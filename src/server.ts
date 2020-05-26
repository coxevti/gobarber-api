import express from 'express';
import routes from './routes';

import './database';
import multerConfig from './configs/multer';

const app = express();
app.use(express.json());
app.use('/files', express.static(multerConfig.directoryUpload));
app.use(routes);

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333');
});
