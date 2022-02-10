import { Request, Response, NextFunction } from "express";

import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config/security/config";
import { TokenJWT } from "../models/token.model";

declare global {
    namespace Express {
        /**
         * @interface Request
         * added new properties to request from express 
         * to store user decoded from token, role from user
         * and token provided by the request if needed.
         */
        interface Request {
            user: JwtPayload,
            token: string //accessToken
            role: string,
        }
    }
}

/**
 * @function checkJwt
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const bearerHeader = <string>req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1];
    if (!token)  return res.status(401).send({ message: 'No token provided.' })

    try {
        const decodedToken: TokenJWT = <any>jwt.verify(token, config.jwtSecret);
        req.user = decodedToken.user;
        req.token = token;
        req.role = decodedToken.role;
        next();
    } catch (error) {
        return res.status(403).send({ message: 'Unauthorized.' });
    }
};