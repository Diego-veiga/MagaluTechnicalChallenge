import 'reflect-metadata';
import OrderController from 'src/controllers/OrdersController';
import { Request, Response } from 'express';
import OrderService from 'src/services/OrderServices';
import { container } from 'tsyringe';

const mockOrderService = {
  processOrder: jest.fn(),
  getOrderByParams: jest.fn(),
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as unknown as Response;

const ordersMock = [
  {
    user_id: 71,
    name: 'Palmer Prosacco',
    orders: [
      {
        order_id: 755,
        total: '618.79',
        date: '2021-03-08',
        products: [
          {
            product_id: 4,
            value: '618.79',
          },
        ],
      },
    ],
  },
  {
    user_id: 70,
    name: 'Palmer Prosacco',
    orders: [
      {
        order_id: 753,
        total: '1836.74',
        date: '2021-03-08',
        products: [
          {
            product_id: 3,
            value: '1836.74',
          },
          {
            product_id: 4,
            value: '618.79',
          },
        ],
      },
    ],
  },
];
describe('Order service tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(container, 'resolve')
      .mockReturnValue(mockOrderService as unknown as OrderService);
  });

  it('should process order when file is provided ', async () => {
    const orderService = new OrderController();
    const req = {
      file: {
        filename: 'testfile.txt',
      },
    } as unknown as Request;

    mockOrderService.processOrder.mockResolvedValue({} as any);
    const result = await orderService.processOrder(req, res);

    expect(mockOrderService.processOrder).toHaveBeenCalledTimes(1);
    expect(result.json).toHaveBeenCalledWith({
      message: 'file processed successfully',
    });
    expect(result.status).toHaveBeenCalledWith(200);
  });

  it('should process order when file is provided ', async () => {
    const orderService = new OrderController();
    const req = { file: undefined } as unknown as Request;

    mockOrderService.processOrder.mockResolvedValue({} as any);
    const result = await orderService.processOrder(req, res);

    expect(mockOrderService.processOrder).toHaveBeenCalledTimes(0);
    expect(result.status).toHaveBeenCalledWith(400);
    expect(result.json).toHaveBeenCalledWith({ error: 'No file uploaded' });
  });

  it('should call service with correct params and return orders', async () => {
    const orderService = new OrderController();
    const mockRequest = {
      query: {
        orderId: '123',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        userId: '456',
      },
    } as unknown as Request;

    mockOrderService.getOrderByParams.mockResolvedValue(ordersMock);
    const result = await orderService.getOrderByParams(mockRequest, res);

    expect(mockOrderService.getOrderByParams).toHaveBeenCalledTimes(1);
    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith(ordersMock);
  });

  it('should call service with correct params and return orders', async () => {
    const orderService = new OrderController();
    const mockRequest = {
      query: {
        orderId: '123',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
      },
    } as unknown as Request;

    mockOrderService.getOrderByParams.mockResolvedValue([]);
    const result = await orderService.getOrderByParams(mockRequest, res);

    expect(mockOrderService.getOrderByParams).toHaveBeenCalledTimes(1);
    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith([]);
  });
});
