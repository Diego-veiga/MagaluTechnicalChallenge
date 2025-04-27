import Order from '@models/Order';
import ordersSchema from 'src/database/schemas/orders.schema';
import IOrderRepository from 'src/interface/IOrderRepository';

export default class OrderRepository implements IOrderRepository {
  async save(order: Order): Promise<void> {
    await ordersSchema.create(order);
  }

  async getById(id: number): Promise<Order | null> {
    return await ordersSchema.findOne({ order_id: id });
  }

  async update(orderId: number, data: Partial<Order>): Promise<void> {
    await ordersSchema.updateOne({ order_id: orderId }, { $set: data });
  }
}
