// packages
import express from 'express';
import morgan from 'morgan';
import path from 'path';
// local
import tourRouter from '@routes/tourRoutes';
import userRouter from '@routes/userRoutes';

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
