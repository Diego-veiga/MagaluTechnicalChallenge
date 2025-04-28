import 'reflect-metadata';
import { container } from 'tsyringe';
import IOrderService from './interfaces/IOrderService';
import OrderService from './services/OrderServices';
import IOrderRepository from './interfaces/IOrderRepository';
import OrderRepository from './repository/OrderRepository';

container.registerSingleton<IOrderService>('OrderService', OrderService);
container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
