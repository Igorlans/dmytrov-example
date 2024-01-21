import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Request } from "@prisma/client";
import { IApiResponse, IDType } from "@/types/types";
import { IPersistedQuestionary, ITourAnswer } from "@/types/questionary";
import InputJsonValue = Prisma.InputJsonValue;

export interface IQuestionaryBody {
    id: IDType;
    answers: ITourAnswer[];
}

const createQuestionary = async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse<Request>>
) => {
    try {
        const body: IQuestionaryBody = req.body;
        if (!body) return res.status(400).json({ message: "Не вказані дані" });
        const newRequest = await prisma.request.update({
            where: {
                id: body.id
            },
            data: {
                questionary: body.answers as any
            }
        });
        return res.status(201).json({ message: "good", data: newRequest });
    } catch (e: any) {
        throw e;
    }
};

const persistQuestionary = async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse<Request>>
) => {
    try {
        const body: { id: string, persisted: IPersistedQuestionary, isSetStep?: boolean } = req.body;
        if (!body) return res.status(400).json({ message: "Не вказані дані" });

        const dbRequest = await prisma.request.findUnique({
            where: {
                id: body.id
            }
        });

        const newRequest = await prisma.request.update({
            where: {
                id: body.id
            },
            data: {
                persisted: !body?.isSetStep ? body.persisted as unknown as InputJsonValue : {
                    // @ts-ignore
                    ...dbRequest?.persisted,
                    step: body.persisted.step
                } as unknown as InputJsonValue
            }
        });
        return res.status(201).json({ message: "good", data: newRequest });
    } catch (e: any) {
        throw e;
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case "POST":
                await createQuestionary(req, res);
                break;
            case "PUT":
                await persistQuestionary(req, res);
                break;
            default:
                throw new Error("Unsupported request method");
        }
    } catch (e: any) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
}
