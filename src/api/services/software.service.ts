import { client, clientKeywords } from "@prisma/client";

import prisma from "../../config/db/connect";

export const get = async () => {
    const result = await prisma.software.findMany({
        include: { keywords: true, successKeywords: true, errorKeywords: true, warningKeywords: true }
    });

    return result;
}


export const getById = async (id: number) => {
    const result = await prisma.software.findUnique({
        include: { keywords: true, successKeywords: true, errorKeywords: true, warningKeywords: true },
        where: {
            id: id
        }
    });

    return result;
}

export const create = async (entity: any) => {    
    const software = await prisma.software.create({
        data: {
            name: entity.name,
            onlysubject: entity.onlySubject,
            keywords: {
                createMany: {
                    data: entity.keywords
                }
            },
            errorKeywords: {
                createMany: {
                    data: entity.errorKeywords
                }
            },
            successKeywords: {
                createMany: {
                    data: entity.successKeywords
                }
            },
            warningKeywords: {
                createMany: {
                    data: entity.warningKeywords
                }
            }
        }
    })

    return software;
}
