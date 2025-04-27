/* eslint-disable no-unused-vars */
import Order from '@models/Order';
import Product from '@models/Product';

export default interface IOrderRepository {
  save(order: Order): Promise<void>;
  getById(id: number): Promise<Order | null>;
  update(orderId: number, data: Partial<Order>): Promise<void>;
}
