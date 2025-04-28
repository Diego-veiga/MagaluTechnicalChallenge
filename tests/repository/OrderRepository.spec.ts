import OrderRepository from 'src/repository/OrderRepository';
import ordersSchema from 'src/database/schemas/orders.schema';

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
const orderToSaveMock = [
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
      {
        product_id: 4,
        value: 618.79,
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

const bulkWriteOperations = [
  {
    updateOne: {
      filter: {
        order_id: 753,
      },
      update: {
        $set: {
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
            {
              product_id: 4,
              value: 618.79,
            },
          ],
        },
      },
      upsert: true,
    },
  },
  {
    updateOne: {
      filter: {
        order_id: 755,
      },
      update: {
        $set: {
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
      },
      upsert: true,
    },
  },
];
describe('Order Repository tests', () => {
  it('', async () => {
    const orderRepository = new OrderRepository();

    jest.spyOn(ordersSchema, 'bulkWrite').mockResolvedValue({} as any);

    await orderRepository.save(orderToSaveMock);

    expect(ordersSchema.bulkWrite).toHaveBeenCalledTimes(1);
    expect(ordersSchema.bulkWrite).toHaveBeenCalledWith(bulkWriteOperations);
  });

  it('', async () => {
    const orderRepository = new OrderRepository();

    jest.spyOn(ordersSchema, 'aggregate').mockResolvedValue(orderListDatabase);

    const filter = {
      orderId: 1236,
      startDate: '2021-03-08',
      endDate: '2021-03-08',
      userId: 456,
    };

    const result = await orderRepository.getByParams(filter);

    expect(ordersSchema.aggregate).toHaveBeenCalledTimes(1);
    expect(result).toEqual(orderListDatabase);
  });
});
