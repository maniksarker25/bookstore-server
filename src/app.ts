import express, { Application, Request, Response, urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import errorHandler from './utils/errorHandler';
import notFound from './utils/notFound';
import { authorRoutes } from './routes/authorRoutes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { bookRoutes } from './routes/bookRoutes';
import { authRoutes } from './routes/authRoutes';
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Book store is available');
});

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
