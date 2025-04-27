import { Router } from 'express';
import orderRouter from './order.router';

const router = Router();

router.use('/order', orderRouter);

export default router;
