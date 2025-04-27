/* eslint-disable no-unused-vars */
import IOrderService from 'src/interface/IOrderService';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import OrderFile from '@models/OrderFile';
import Client from '@models/Client';
import Order from '@models/Order';
import Product from '@models/Product';
import IOrderRepository from 'src/interface/IOrderRepository';

@injectable()
export default class OrderService implements IOrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}
  async processOrder(fileName: string): Promise<void> {
    const orders: Order[] = [];
    const lines = fs
      .readFileSync(
        path.resolve(__dirname, '..', '..', `uploads/${fileName}`),
        'utf-8',
      )
      .split('\n');
    for (const line of lines) {
      const orderFile: OrderFile = {
        user_id: Number(line.substring(0, 10).trim()),
        name: line.substring(10, 55).trim(),
        order_id: Number(line.substring(55, 65).trim()),
        product_id: Number(line.substring(65, 75).trim()),
        value: Number(Number(line.substring(75, 87).trim()).toFixed(2)),
        date: this.formatDate(line.substring(87, 95).trim()),
      };

      const order = await orders.find(o => o.order_id === orderFile.order_id);

      if (!order) {
        const client: Client = {
          user_id: orderFile.user_id,
          name: orderFile.name,
        };

        const product: Product = {
          product_id: orderFile.product_id,
          value: orderFile.value,
        };

        const order: Order = {
          order_id: orderFile.order_id,
          date: orderFile.date,
          total: orderFile.value,
          client: client,
          products: [],
        };
        order.products?.push(product);

        orders.push(order);
      } else {
        const product = order.products.find(
          x => x.product_id === orderFile.product_id,
        );

        if (!product) {
          const newProduct: Product = {
            product_id: orderFile.product_id,
            value: orderFile.value,
          };

          order.products.push(newProduct);
        }
      }
    }

    await this.orderRepository.save(orders);
  }

  formatDate(yyyymmdd: string): string {
    return `${yyyymmdd.substring(0, 4)}-${yyyymmdd.substring(
      4,
      6,
    )}-${yyyymmdd.substring(6, 8)}`;
  }
}
