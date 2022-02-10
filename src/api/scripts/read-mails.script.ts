import * as dotenv from "dotenv";

import prisma from "../../config/db/connect";
import { mailListener } from '../../config/utils/outlook.connect';
import { MailOutlook } from "../models/mail-outlook.model";

import * as service from "../services/mail.service";
import * as script from "./mail-attributes.script";

import Logger from '../utils/logger';

dotenv.config();

/**
 * Start connection to Imap server given by dotenv variables.
 
mailListener.start(); // start listening

/**
 * Event handler that triggers a function when connected to Imap Server
 
mailListener.on("server:connected", function () {
    Logger.info(`Successfully connected to: ${process.env.MAIL} with host: ${process.env.HOST}`)
});

/**
 * Event handler that triggers when mailbox is loaded.
 
mailListener.on("mailbox", function (mailbox: any) {
    console.log("Total number of mails: ", mailbox.messages.total); // this field in mailbox gives the total number of emails
});


 * Event handler that triggers when a new mail is coming.
 * Acts as a listener waiting for new mails, no need to read all mails and compare which one we dont have.
 
mailListener.on("mail", async (mail: any, seqno: any) => {
    const mailOutlook: any = new MailOutlook(mail.messageId, mail.textAsHtml, mail.text, mail.subject, mail.date, mail.from.text);
    const mailDB = await prisma.mail.findUnique({
        where: {
            messageId: mailOutlook.messageId,
        },
    });

    if (!mailDB) {
        script.getAttributes(mailOutlook);
    }
})
*/

export const startListener = () => {
    mailListener.start();

    mailListener.on("server:connected", function () {
        Logger.info(`Successfully connected to: ${process.env.EMAIL} with host: ${process.env.HOST}`)
    });

    mailListener.on("mailbox", function (mailbox: any) {
        Logger.info(`Total number of mails: ${mailbox.messages.total}`); // this field in mailbox gives the total number of emails
    });
    
    mailListener.on("mail", async (mail: any, seqno: any) => {
        //Logger.info(`Incoming mail with messageId: ${mail.messageId}`);
        //console.log(`Incoming mail with messageId: ${mail.messageId}`)
        const mailOutlook: any = new MailOutlook(mail.messageId, mail.textAsHtml, mail.text, mail.subject, mail.date, mail.from.text);
        const mailDB = await prisma.mail.findUnique({
            where: {
                messageId: mailOutlook.messageId,
            },
        });

        if (!mailDB) {
            script.getAttributes(mailOutlook);
        }
    })
}