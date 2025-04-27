import FiltersOrder from '@models/FilterOrder';
import Order from '@models/Order';
import ordersSchema from 'src/database/schemas/orders.schema';
import IOrderRepository from 'src/interface/IOrderRepository';

export default class OrderRepository implements IOrderRepository {
  async save(orders: Order[]): Promise<void> {
    const bulkOps = orders.map(orderData => ({
      updateOne: {
        filter: { order_id: orderData.order_id },
        update: { $set: orderData },
        upsert: true,
      },
    }));
    await ordersSchema.bulkWrite(bulkOps);
  }

  async getById(id: number): Promise<Order | null> {
    return await ordersSchema.findOne({ order_id: id });
  }

  async getByParams(params: FiltersOrder): Promise<Order[]> {
    const query: any = {};
    if (params.orderId) {
      query['order_id'] = Number(params.orderId);
    }
    if (params.startDate && params.endDate) {
      query['date'] = { $gte: params.startDate, $lte: params.endDate };
    }
    if (params.userId) {
      query['user_id'] = Number(params.userId);
    }

    const matchStage = { $match: query };
    return ordersSchema.aggregate([
      matchStage,
      {
        $group: {
          _id: '$client.user_id',
          name: { $first: '$client.name' },
          orders: {
            $push: {
              order_id: '$order_id',
              total: '$total',
              date: '$client.date',
              products: '$products',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          user_id: '$_id',
          name: 1,
          orders: 1,
          products: 1,
        },
      },
    ]);
  }
}
