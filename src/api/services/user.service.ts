import { client, clientKeywords } from "@prisma/client";
import bcrypt from 'bcrypt'

import prisma from "../../config/db/connect";

export const get = async () => {
    const result = await prisma.usuario.findMany({
        include: { clients: true, addresses: true, interval: true }
    });

    return result;
}

export const create = async (entity: any) => {
    const user = await prisma.usuario.create({
        data: {
            email_login: entity.email,
            passw: await bcrypt.hash(entity.passw, 10),
            login: true,
            name: entity.name,
            addresses: {
                createMany: {
                    data: entity.addresses
                }
            },
            interval: {
                createMany: {
                    data: entity.intervals
                }
            }
        }
    })

    return user;
}

export const getByEmail = async (loginEmail: string) => {
    const result = await prisma.usuario.findUnique({
        include: { addresses: true, interval: true, clients: true },
        where: {
            email_login: loginEmail
        }
    });

    if (result) return result;
    else return null;
}
