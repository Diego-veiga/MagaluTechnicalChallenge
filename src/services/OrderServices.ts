/* eslint-disable no-unused-vars */
import IOrderService from 'src/interface/IOrderService';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs/promises';
import OrderFile from '@models/OrderFile';
import Client from '@models/Client';
import Order from '@models/Order';
import Product from '@models/Product';
import IOrderRepository from 'src/interface/IOrderRepository';
import FiltersOrder from '@models/FilterOrder';

@injectable()
export default class OrderService implements IOrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async processOrder(fileName: string): Promise<void> {
    const orders: Order[] = [];
    const orderLines = await this.readOrderFile(fileName);

    for (const orderLine of orderLines) {
      if (!orderLine.trim()) continue;
      const orderFile: OrderFile = this.parseOrderLine(orderLine);

      const order = orders.find(o => o.order_id === orderFile.order_id);

      if (!order) {
        const order = this.createOrder(orderFile);

        orders.push(order);
      } else {
        const product = order.products.find(
          x => x.product_id === orderFile.product_id,
        );

        if (!product) {
          const newProduct = this.createProduct(
            orderFile.product_id,
            orderFile.value,
          );

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

  async getOrderByParams(filters: FiltersOrder): Promise<Order[]> {
    return await this.orderRepository.getByParams(filters);
  }

  private async readOrderFile(fileName: string): Promise<string[]> {
    const filePath = path.resolve(__dirname, '..', '..', `uploads/${fileName}`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent.split('\n');
  }

  private createOrder(orderFile: OrderFile): Order {
    const order: Order = {
      order_id: orderFile.order_id,
      date: orderFile.date,
      total: orderFile.value,
      client: this.createClient(orderFile.user_id, orderFile.name),
      products: [],
    };

    order.products?.push(
      this.createProduct(orderFile.product_id, orderFile.value),
    );
    return order;
  }

  private createProduct(product_id: number, value: number): Product {
    return {
      product_id,
      value,
    };
  }

  private createClient(user_id: number, name: string): Client {
    return {
      user_id,
      name,
    };
  }

  private parseOrderLine(line: string): OrderFile {
    return {
      user_id: Number(line.substring(0, 10).trim()),
      name: line.substring(10, 55).trim(),
      order_id: Number(line.substring(55, 65).trim()),
      product_id: Number(line.substring(65, 75).trim()),
      value: Number(Number(line.substring(75, 87).trim()).toFixed(2)),
      date: this.formatDate(line.substring(87, 95).trim()),
    };
  }
}
