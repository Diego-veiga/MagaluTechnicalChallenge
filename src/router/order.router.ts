import { Router } from 'express';
import multer from 'multer';
import multerconfig from 'src/config/multerconfig';
import OrderController from 'src/controllers/OrdersController';

const orderRouter = Router();
const upload = multer(multerconfig);
const orderController = new OrderController();
orderRouter.post(
  '/processFile',
  upload.single('file'),
  orderController.processOrder,
);

orderRouter.get('/', orderController.getOrderByParams);

export default orderRouter;
