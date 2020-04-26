import 'reflect-metadata';

import express from 'express'; // Posso usar o import no node pq to usando o typescript
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server atarted on port 3333!');
});
