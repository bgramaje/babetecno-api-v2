import express, { Request, Response } from 'express';
import morgan, { format } from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import _morgan from './middlewares/morgan.middleware';
import * as Routes from '../config/routes/routes.config';
import { clientRouter } from './routes/client.routes';
import * as errorMiddleware from './middlewares/error.middleware'
import { softwareRouter } from './routes/software.routes';

const app = express();

app.use(_morgan);
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(Routes.HOME, (req: Request, res: Response) => {
    res.json({
        message: 'Babetecno - Backups v.2.0.0 - 👋'
    });
})

app.use(Routes.CLIENTS, clientRouter);
app.use(Routes.SOFTWARES, softwareRouter)

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

export default app;
