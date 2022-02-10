import { NextFunction, Request, Response } from 'express'

import prisma from "../../config/db/connect";
import Logger from '../utils/logger';

import * as service from '../services/software.service'

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const softwares = await service.get();
        res.status(200).send(softwares)   
    } catch (error) {
        Logger.error(error);
        next(error)
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const software = await service.create(req.body);
        res.status(200).send(`Software '${software.name}' successfully created`)
    } catch (error) {
        Logger.error(error);
        next(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {

}

export const detail = async (req: Request, res: Response, next: NextFunction) => {

}