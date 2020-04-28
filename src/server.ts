import 'reflect-metadata';

import express from 'express'; // Posso usar o import no node pq to usando o typescript
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // http://localhost:3333/files/fd7b413e5f5f58ac04cd-GO1.png
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server atarted on port 3333!');
});
