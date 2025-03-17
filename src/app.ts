import cors from 'cors';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './routes';
import { Morgan } from './shared/morgen';
import notFound from './app/middlewares/notFount';
import path from 'path';
import morgan from 'morgan';
import { sendEncryptedFileController } from './app/modules/send_file/controller/sendEncryptedFile.controller';

const app = express();

// morgan
app.use(sendEncryptedFileController);
app.use(express.static('./public'));
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);
app.use(morgan('dev'));
// body parser
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cookie-parser to parse cookies
app.use(cookieParser());

// file retrieve
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// router
app.use('/api/v1', router);

// live response
app.get('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Express server started' });
});

// global error handle
app.use(globalErrorHandler);

// handle not found route
app.use(notFound);

export default app;
