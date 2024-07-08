import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import authorRoutes from './routes/authorRoutes';
// import bookRoutes from './routes/bookRoutes';
// import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

// app.use('/api', authorRoutes);
// app.use('/api', bookRoutes);

// app.use(errorHandler);

export default app;
