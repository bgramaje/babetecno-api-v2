import * as dotenv from "dotenv";

dotenv.config();

export default {
    host: process.env.SMTP_HOST!,
    port: process.env.SMTP_PORT!,
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
};