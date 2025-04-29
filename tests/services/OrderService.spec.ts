import 'reflect-metadata';
import OrderService from 'src/services/OrderServices';
import fs from 'fs/promises';

const orderRepositoryMock = {
  getByParams: jest.fn(),
  save: jest.fn(),
  getById: jest.fn(),
};

const orderListDatabase = [
  {
    user_id: 1,
    name: 'user teste 01',
    orders: [
      {
        order_id: 753,
        total: '123.4',
        date: '2021-03-08',
        products: [
          {
            product_id: 3,
            value: '456.7',
          },
          {
            product_id: 4,
            value: '618.79',
          },
        ],
      },
    ],
  },
  {
    user_id: 2,
    name: 'user teste 02',
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
];

const readFileModelMock = [
  '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308',
  '0000000070                              Palmer Prosacco00000007530000000003     1009.5420210308',
  '0000000070                              Palmer Prosacco00000007530000000004      618.7920210308',
  '0000000071                              Palmer Prosacco00000007550000000004      618.7920210308',
];

const readFileWithEmptyLineMock = [
  '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308',
  '0000000070                              Palmer Prosacco00000007530000000003     1009.5420210308',
  '',
  '0000000071                              Palmer Prosacco00000007550000000004      618.7920210308',
];

const mockReadFileWithLessThan45Lines = [
  '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308',
  '0000000070                              Palmer Prosacco00000007530000000003     1009.5420210308',
  '0000000070                              Palmer Prosacco00000007530000000004      618.7920210308',
  '0000000071Palmer Prosacco00000007550000000004618.7920210308',
];

const orderToSaveMock = [
  {
    order_id: 753,
    date: '2021-03-08',
    total: 2455.53,
    client: { user_id: 70, name: 'Palmer Prosacco' },
    products: [
      { product_id: 3, value: 1836.74 },
      { product_id: 4, value: 618.79 },
    ],
  },
  {
    order_id: 755,
    date: '2021-03-08',
    total: 618.79,
    client: { user_id: 71, name: 'Palmer Prosacco' },
    products: [{ product_id: 4, value: 618.79 }],
  },
];

const ordersToSaveWithEmptyLine = [
  {
    order_id: 753,
    date: '2021-03-08',
    total: 1836.74,
    client: {
      user_id: 70,
      name: 'Palmer Prosacco',
    },
    products: [
      {
        product_id: 3,
        value: 1836.74,
      },
    ],
  },
  {
    order_id: 755,
    date: '2021-03-08',
    total: 618.79,
    client: {
      user_id: 71,
      name: 'Palmer Prosacco',
    },
    products: [
      {
        product_id: 4,
        value: 618.79,
      },
    ],
  },
];

const orderToSaveWithLessThan45Lines = [
  {
    order_id: 753,
    date: '2021-03-08',
    total: 2455.53,
    client: { user_id: 70, name: 'Palmer Prosacco' },
    products: [
      { product_id: 3, value: 1836.74 },
      { product_id: 4, value: 618.79 },
    ],
  },
];

describe('Order service tests', () => {
  it('should process order when file is provided ', async () => {
    const orderService = new OrderService(orderRepositoryMock);

    jest
      .spyOn(orderService, 'readOrderFile')
      .mockResolvedValue(readFileModelMock);

    jest.spyOn(orderService, 'removeFile').mockResolvedValue({} as any);

    await orderService.processOrder('test.txt');

    expect(orderRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(orderRepositoryMock.save).toHaveBeenCalledWith(orderToSaveMock);
  });

  it('should Process Order File With Empty Line', async () => {
    const orderService = new OrderService(orderRepositoryMock);

    jest
      .spyOn(orderService, 'readOrderFile')
      .mockResolvedValue(readFileWithEmptyLineMock);

    jest.spyOn(orderService, 'removeFile').mockResolvedValue({} as any);

    await orderService.processOrder('test.txt');

    expect(orderRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(orderRepositoryMock.save).toHaveBeenCalledWith(
      ordersToSaveWithEmptyLine,
    );
  });

  it('should Not Process Order File With Less Than 45 Lines', async () => {
    const orderService = new OrderService(orderRepositoryMock);

    jest
      .spyOn(orderService, 'readOrderFile')
      .mockResolvedValue(mockReadFileWithLessThan45Lines);

    jest.spyOn(orderService, 'removeFile').mockResolvedValue({} as any);

    await orderService.processOrder('test.txt');

    expect(orderRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(orderRepositoryMock.save).toHaveBeenCalledWith(
      orderToSaveWithLessThan45Lines,
    );
  });

  it('should return list orders', async () => {
    const orderService = new OrderService(orderRepositoryMock);

    orderRepositoryMock.getByParams.mockReturnValue(orderListDatabase);

    const filter = {
      startDate: '2021-03-08',
      endDate: '2021-03-08',
    };
    const result = await orderService.getOrderByParams(filter);

    expect(result.length).toEqual(2);
    expect(orderRepositoryMock.getByParams).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when repository fails', async () => {
    const orderService = new OrderService(orderRepositoryMock);

    orderRepositoryMock.getByParams.mockImplementation(() => {
      throw new Error('Fail get orders');
    });

    const filter = {
      startDate: '2021-03-08',
      endDate: '2021-03-08',
    };

    await orderService.getOrderByParams(filter).catch(e => {
      expect(e).toMatchObject({
        message: 'Fail get orders',
      });
    });
    expect(orderRepositoryMock.getByParams).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when repository fails', async () => {
    const orderService = new OrderService(orderRepositoryMock);

    jest.spyOn(fs, 'readFile').mockResolvedValue('line1\nline2\nline3');

    const result = await orderService.readOrderFile('teste.txt');

    expect(result).toEqual(['line1', 'line2', 'line3']);
  });

  it('should throw an error when repository fails', async () => {
    const orderService = new OrderService(orderRepositoryMock);

    jest.spyOn(fs, 'unlink').mockResolvedValue({} as any);

    await orderService.removeFile('teste.txt');

    expect(fs.unlink).toHaveBeenCalledTimes(1);
  });
});
