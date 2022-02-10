import express, { Response, Request, NextFunction } from "express";
import asyncHandler from 'express-async-handler'

import * as controller  from "../controllers/mail.controller";

const router = express.Router();


/**
 * @description /, retrives all 'sample' model from DDBB
 * @param {*} rute
 * @param {function(req: Request, res: Response, next: NextFunction)}
 */
 router.get('/list', asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        controller.get(req, res, next)
    })
);


export { router as mailRouter };
