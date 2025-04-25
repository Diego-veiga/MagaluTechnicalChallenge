import 'reflect-metadata';
import { container } from 'tsyringe';
import IOrderService from './interface/IOrderService';
import OrderService from './services/OrderServices';
console.log('📦 Container loaded');
container.registerSingleton<IOrderService>('OrderService', OrderService);
