import mongoose from 'mongoose';

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
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
