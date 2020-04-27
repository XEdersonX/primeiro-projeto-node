import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // Quando eu uso use ele funciona para quanlquer tipo de metodo de rota.
routes.use('/users', usersRouter);

export default routes;
