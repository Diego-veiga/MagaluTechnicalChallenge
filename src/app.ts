import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import router from '@routers/index';
import { AppError } from '@models/AppError';
import './container';
import { connectDatabase } from './database/db';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

connectDatabase();
app.listen(process.env.PORT, () => {
  console.log('server started on port 3000');
});

export default app;
