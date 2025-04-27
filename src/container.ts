import 'reflect-metadata';
import { container } from 'tsyringe';
import IOrderService from './interface/IOrderService';
import OrderService from './services/OrderServices';
import IOrderRepository from './interface/IOrderRepository';
import OrderRepository from './repository/OrderRepository';
console.log('📦 Container loaded');
container.registerSingleton<IOrderService>('OrderService', OrderService);
container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
