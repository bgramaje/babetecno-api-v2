import { NextFunction, Request, Response } from 'express'

import prisma from "../../config/db/connect";
import Logger from '../utils/logger';

import * as service from '../services/mail.service'

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mails = await service.get();
        res.status(200).send(mails)   
    } catch (error) {
        Logger.error(error);
        next(error)
    }
}

export const detailById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mails = await service.getById(req.body.id);
        res.status(200).send(mails)   
    } catch (error) {
        Logger.error(error);
        next(error)
    }
}

export const detailByMessageId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mails = await service.getByMessageId(req.body.messageId);
        res.status(200).send(mails)   
    } catch (error) {
        Logger.error(error);
        next(error)
    }
}