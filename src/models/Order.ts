import Client from './Client';
import Product from './Product';

export default class Order {
  order_id: number;
  total: number;
  date: string;
  client: Client;
  products: Product[];
}
