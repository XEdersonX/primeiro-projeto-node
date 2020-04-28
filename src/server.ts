import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express'; // Posso usar o import no node pq to usando o typescript
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // http://localhost:3333/files/fd7b413e5f5f58ac04cd-GO1.png
app.use(routes);

// next
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Verifica se o erro é uma instacia da minha classe appError. Se for que dizer que é um erro que foi originado pela minha aplicacao.
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // um erro que eu nao esperava acontecer vai cair aqui.
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server atarted on port 3333!');
});
