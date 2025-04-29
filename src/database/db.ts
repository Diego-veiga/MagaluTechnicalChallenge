import mongoose from 'mongoose';

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

export const connectDatabase = () =>
  mongoose
    .connect(process.env.MONGO_URL!, options)
    .then(res => {
      if (res) {
        console.log(`Database connection succeffully to testetechmagalu`);
      }
    })
    .catch(err => {
      console.log(err);
    });
