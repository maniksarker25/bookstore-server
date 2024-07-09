import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import errorHandler from './utils/errorHandler';
import notFound from './utils/notFound';
import { authorRoutes } from './routes/authorRoutes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { bookRoutes } from './routes/bookRoutes';

// import authorRoutes from './routes/authorRoutes';
// import bookRoutes from './routes/bookRoutes';
// import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
