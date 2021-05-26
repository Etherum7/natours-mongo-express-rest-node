//packages
import express from 'express';
import morgan from 'morgan';
//local
import tourRouter from '@routes/tourRoutes';
import userRouter from '@routes/userRoutes';

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
//routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
