import mongoose from 'mongoose';

const client = new mongoose.Schema(
  {
    user_id: Number,
    name: String,
  },
  {
    _id: false,
  },
);
const ProductSchema = new mongoose.Schema(
  {
    product_id: Number,
    value: String,
  },
  {
    _id: false,
  },
);

const OrderSchema = new mongoose.Schema({
  order_id: Number,
  total: String,
  date: String,
  client: client,
  products: [ProductSchema],
});

OrderSchema.index({ user_id: 1 });
OrderSchema.index({ order_id: 1 });
OrderSchema.index({ date: 1 });

export default mongoose.model('Orders', OrderSchema);
