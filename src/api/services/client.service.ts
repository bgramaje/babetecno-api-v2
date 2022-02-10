import { client, clientKeywords } from "@prisma/client";

import prisma from "../../config/db/connect";

export const get = async () => {
    const result = await prisma.client.findMany({
        include: { keywords: true }
    });

    return result;
}

export const create = async (entity: any) => {
    const client = await prisma.client.create({
        data: {
            name: entity.name,
            cif: entity.cif,
            keywords: {
                createMany: {
                    data: entity.keywords
                }
            }
        }
    })

    return client;
}
