import { client, mail, software } from "@prisma/client";
import { MailStatus } from "../enums/mail-status.enum";
import { MailOutlook } from "../models/mail-outlook.model";

import * as clientService from "../services/client.service"
import * as softwareService from "../services/software.service"
import * as mailService from "../services/mail.service"

export const getAttributes = async (mail: any) => {
    mail.idsoftware = await getSoftware(mail);
    mail.idclient = await getClient(mail);

    let mailChecked = null;

    if (mail.idsoftware) {
        mailChecked = await getStatus(mail);
    } else {
        mail.idsoftware = null;
        mail.status = MailStatus.UNKNOWN
    }

    if (!mail.idclient) mail.idclient = null;

    mailService.create(mail);
}

export const getSoftware = async (mail: any): Promise<number | null> => {
    const softwares = await softwareService.get();
    for (let i = 0; i < softwares.length; i++) {
        //console.log(softwares[0]);
        for (let j = 0; j < softwares[i].keywords.length; j++) {
            if (mail.subject.toUpperCase().includes(softwares[i].keywords![j].name.toUpperCase())) return Promise.resolve(softwares[i].id)
            else if (mail.html && mail.html.toUpperCase().includes(softwares[i].keywords![j].name.toUpperCase())) return Promise.resolve(softwares[i].id)
            else if (!mail.html && mail.text && mail.text.toUpperCase().includes(softwares[i].keywords![j].name.toUpperCase())) return Promise.resolve(softwares[i].id)
        }
    }
    return Promise.resolve(null)
}

export const getClient = async (mail: any): Promise<number | null> => {
    const clients = await clientService.get()

    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].keywords.length; j++) {
            if (mail.subject.toUpperCase().includes(clients[i].keywords[j].name.toUpperCase())) {
                return Promise.resolve(clients[i].id)
            }
        }
    }

    return Promise.resolve(null)
}

export const getStatus = async (mail: any) => {
    if (await checkSuccess(mail)) {
        mail.status = MailStatus.SUCCESS
    } else if (await checkError(mail)) {
        mail.status = MailStatus.ERROR
    } else if (await checkWarning(mail)) {
        mail.status = MailStatus.WARNING
    } else {
        mail.status = MailStatus.INFO
    }

    return mail;
}

export const checkSuccess = async (mail: any): Promise<boolean> => {
    const software = await softwareService.getById(mail.idsoftware)
    for (let j = 0; j < software!.successKeywords.length; j++) {
        if (mail.subject.toUpperCase().includes(software!.successKeywords[j].name.toUpperCase())) return Promise.resolve(true)
        if (!software!.onlysubject) {
            if (mail.html && mail.html.toUpperCase().includes(software!.successKeywords[j].name.toUpperCase())) return Promise.resolve(true)
            else if (!mail.html && mail.text.toUpperCase().includes(software!.successKeywords[j].name.toUpperCase())) return Promise.resolve(true)
        }
    }
    return Promise.resolve(false)
}

export const checkWarning = async (mail: any) => {
    const software = await softwareService.getById(mail.idsoftware)
    if (software!.warningKeywords.length <= 0) Promise.resolve(false)
    for (let j = 0; j < software!.warningKeywords.length; j++) {
        if (mail.subject.toUpperCase().includes(software!.warningKeywords[j].name.toUpperCase())) return Promise.resolve(true)
        if (!software!.onlysubject) {
            if (mail.html && mail.html.toUpperCase().includes(software!.warningKeywords[j].name.toUpperCase())) return Promise.resolve(true)
            else if (!mail.html && mail.text.toUpperCase().includes(software!.warningKeywords[j].name.toUpperCase())) return Promise.resolve(true)
        }
    }
    return Promise.resolve(false)
}

export const checkError = async (mail: any) => {
    const software = await softwareService.getById(mail.idsoftware)
    for (let j = 0; j < software!.errorKeywords.length; j++) {
        if (mail.subject.toUpperCase().includes(software!.errorKeywords[j].name.toUpperCase())) return Promise.resolve(true)
        if (!software!.onlysubject) {
            if (mail.html && mail.html.toUpperCase().includes(software!.errorKeywords[j].name.toUpperCase())) return Promise.resolve(true)
            else if (!mail.html && mail.text.toUpperCase().includes(software!.errorKeywords[j].name.toUpperCase())) return Promise.resolve(true)
        }
    }
    return Promise.resolve(false)
}

