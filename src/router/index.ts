import { Router } from 'express';
import orderRouter from './order.router';

const router = Router();

router.use('/processOrder', orderRouter);

export default router;
