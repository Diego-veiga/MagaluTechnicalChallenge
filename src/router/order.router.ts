import { Router } from 'express';
import multer from 'multer';
import MulterConfig from '@config/MulterConfig';
import OrderController from '@controllers/OrdersController';

const orderRouter = Router();
const upload = multer(MulterConfig);

const orderController = new OrderController();
orderRouter.post(
  '/processFile',
  upload.single('file'),
  orderController.processOrder,
);

orderRouter.get('/', orderController.getOrderByParams);

export default orderRouter;
