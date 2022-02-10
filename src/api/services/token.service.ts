import * as jwt from "jsonwebtoken";

import config from "../../config/security/config";

/**
 * @function generateAccessToken
 * @param user 
 * @returns 
 */
const generateAccessToken = (user: any) => {
    return jwt.sign(user, config.jwtSecret, { expiresIn: '1800s' });
}