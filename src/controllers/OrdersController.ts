import 'reflect-metadata';
import { Request, Response } from 'express';
import OrderService from 'src/services/OrderServices';
import { container, injectable } from 'tsyringe';

@injectable()
export default class OrderController {
  async processOrder(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      return response.status(400).json({ error: 'No file uploaded' });
    }

    const orderService = container.resolve(OrderService);

    orderService.processOrder(request.file.filename);

    return response
      .json({ message: 'Vamos processar o arquivo aqui' })
      .status(200);
  }
}
