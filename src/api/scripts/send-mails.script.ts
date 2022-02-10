import * as dotenv from "dotenv";
import nodemailer from 'nodemailer';
import Email from 'email-templates'
import Agenda from 'agenda'
import path from 'path'

import Logger from '../utils/logger';

import smtpConfig from '../../config/utils/smtp.connect'

import * as userService from '../services/user.service'
import * as mailService from '../services/mail.service'

import * as mailUtils from '../utils/mail.utils'

import { TODAY, YESTERDAY } from "../utils/date.utils";
import { usuario, usuario_client, userAdresses, userSendInterval } from "@prisma/client";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: 465,
    secure: true,
    auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

transporter.verify((error, success) => {
    if (error) {
        Logger.error(error);
    } else {
        Logger.info("Successfully connected to mail.pcreacondicionado.com");
    }
});

const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
});

const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URI!,
        collection: 'task-scheduler',
    },
    processEvery: '60 seconds'
});

agenda.define('send email report', { /*priority: 'high',*/ concurrency: 100 }, async (job, done) => {
    //const { user } = job.attrs.data;
    let mails = await mailService.getBetweenDates(YESTERDAY, TODAY);
    //let tasks = await getTasks(to._dni)
    let user = await userService.get()
    await sendMail(user[0], mails)
    done()
});

const sendMail = async (user: usuario & { clients: usuario_client[]; addresses: userAdresses[]; interval: userSendInterval[]; }, mails: any[]) => {
    const successes = await mailUtils.getSuccesses(mails);
    const warnings = await mailUtils.getWarnings(mails);
    const errors = await mailUtils.getErrors(mails);

    const receivers: string[] = [];

    for (let i = 0; i < user.addresses.length; i++) {
        const element = user.addresses[i];
        receivers.push(element.email!)
    }
    
    email.send({
        template: path.join(__dirname, '../email/report'),
        message: {
            from: process.env.EMAIL,
            to: receivers,
        },
        locals: {
            name: user.email_login,
            user: user,
            successes: successes,
            warnings: warnings,
            errors: errors,
        }
    }).then(() => console.log('email has been sent!'));
}

(async function () {
    let mails = await mailService.getBetweenDates(YESTERDAY, TODAY);
    console.log(mails.length);
    
    //let tasks = await getTasks(to._dni)
    let user = await userService.get()
    await sendMail(user[0], mails)
})();


(async function () {
    let users = await userService.get()
    users.forEach(async (user) => {
        user.interval.forEach(async (time) => {
            await agenda.start();
            await agenda.cancel({ 'data.user': user })
            const sendMail = agenda.create(`send email report`, { user: user });
            await sendMail.repeatEvery(`${time.date!.getMinutes()} ${time.date!.getHours()} * * *`).save();
        })
    });
})();

