/* eslint-disable no-unused-vars */
import FiltersOrder from '@models/FilterOrder';
import Order from '@models/Order';
import Product from '@models/Product';

export default interface IOrderRepository {
  save(order: Order[]): Promise<void>;
  getById(id: number): Promise<Order | null>;
  getByParams(params: FiltersOrder): Promise<Order[]>;
}
