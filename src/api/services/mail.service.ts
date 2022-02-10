import prisma from "../../config/db/connect";
import Logger from "../utils/logger";

export const create = async (entity: any) => {
    let data: any = {
        status: entity.status,
        messageId: entity.messageId,
        from: entity.from,
        subject: entity.subject,
        text: entity.text,
        html: entity.html,
        date: entity.date,
        sended: false,
    }

    if (entity.idclient) data.client = { connect: { id: entity.idclient } };
    if (entity.idsoftware) data.software = { connect: { id: entity.idsoftware } };

    const mail = await prisma.mail.create({
        data: data
    })

    Logger.info(`Inserted new mail with messageId: ${mail.messageId}, with status: ${mail.status}`)
}

export const get = async () => {
    const result = await prisma.mail.findMany({
        include: { client: true, software: true }
    });

    return result;
}

export const getById = async (id: number) => {
    const result = await prisma.mail.findUnique({
        include: { client: true, software: true },
        where: {
            id: id
        }
    });

    return result;
}

export const getByMessageId = async (messageId: string) => {
    const result = await prisma.mail.findUnique({
        include: { client: true, software: true },
        where: {
            messageId: messageId
        }
    });

    return result;
}

export const getBetweenDates = async (before: string, after: string) => {
    const result = await prisma.mail.findMany({
        include: { client: true, software: true },
        where: {
            date: {
                gte: new Date(before),
                lt: new Date(after)
            }
        },
    });

    return result;
}