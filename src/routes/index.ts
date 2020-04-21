import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // Quando eu uso use ele funciona para quanlquer tipo de metodo de rota.

export default routes;
