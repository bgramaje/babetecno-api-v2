import { Request, Response, NextFunction } from "express"

/**
 * Creates specific type of Error, if given URL does not match in the API.
 * @function notFound(req: Request, res: Response, next: NextFunction)
 * @param req 
 * @param res 
 * @param next 
 */
const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
};

/**
 * handles Errorrs created while execution of any request from the client.
 * @function errorHandler(err: Error, req: Request, res: Response, next: NextFunction)
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
};

export { notFound, errorHandler }