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

    const users = await orderService.processOrder(request.file.filename);

    return response.json({ data: users }).status(200);
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

    console.log('*******************params', params);

    const orderService = container.resolve(OrderService);

    const orders = await orderService.getOrderByParams(params);

    return response.json({ data: orders }).status(200);
  }
}
