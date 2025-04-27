import 'reflect-metadata';
import { Request, Response } from 'express';
import OrderService from 'src/services/OrderServices';
import { container, injectable } from 'tsyringe';
import FiltersOrder from '@models/FilterOrder';

@injectable()
export default class OrderController {
  async processOrder(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      return response.status(400).json({ error: 'No file uploaded' });
    }

    const orderService = container.resolve(OrderService);

    await orderService.processOrder(request.file.filename);

    return response
      .json({ message: 'file processed successfully' })
      .status(200);
  }

  async getOrderByParams(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { orderId, startDate, endDate, userId } = request.query;

    const params: FiltersOrder = {
      orderId: Number(orderId),
      startDate: startDate as string,
      endDate: endDate as string,
      userId: userId ? Number(userId) : undefined,
    };

    const orderService = container.resolve(OrderService);

    const orders = await orderService.getOrderByParams(params);

    return response.json(orders).status(200);
  }
}
