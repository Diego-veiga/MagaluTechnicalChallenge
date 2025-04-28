/* eslint-disable no-unused-vars */
import FiltersOrder from '@models/FilterOrder';
import Order from '@models/Order';

export default interface IOrderRepository {
  save(order: Order[]): Promise<void>;
  getByParams(params: FiltersOrder): Promise<Order[]>;
}
