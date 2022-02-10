import app from './app'
import dotenv from "dotenv";

import Logger from './utils/logger';
import prisma from '../config/db/connect';

dotenv.config();

const port = process.env.PORT || 3000;

import * as listener from "./scripts/read-mails.script";
import * as initDefaultData from './scripts/create-default-data.script';

import './scripts/send-mails.script'

prisma.$connect().then(() => {
    Logger.info(`Successfully connected to: ${process.env.DATABASE_URL}`)
    app.listen(port, async () => {
        Logger.info(`Listening on http://localhost:${port}`);
        await initDefaultData.initData();
        listener.startListener();
    });
}).catch((err: Error) => {
    Logger.error("Database connection failed: ", err)
    process.exit();
})