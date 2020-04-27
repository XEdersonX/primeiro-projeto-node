import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // Quando eu uso use ele funciona para quanlquer tipo de metodo de rota.
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
