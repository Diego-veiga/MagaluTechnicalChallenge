/* eslint-disable no-unused-vars */
import FiltersOrder from '@models/FilterOrder';
import Order from '@models/Order';

export default interface IOrderService {
  processOrder(fileName: string): Promise<void>;
  getOrderByParams(filters: FiltersOrder): Promise<Order[]>;
}
