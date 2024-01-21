import prisma from "@/prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {Request} from "@prisma/client";
import {IApiResponse} from "@/types/types";

const createLead = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<Request>>) => {
    try {
        const body: Request = req.body;
        console.log("BODY ========= ", body)
        if (!body) return res.status(400).json({message: 'Не вказані дані'})
        const newRequest = await prisma.request.create({
            data: {
                userId: body.userId,
                type: body.type,
                address: body.address,
                comment: body.comment,
                date: String(body.date),
                homeNumber: body.homeNumber,
                square: String(body.square),
                street: body.street,
                files: body?.files || undefined,
                tariffId: body.tariffId,
            }
        })
        return res.status(201).json({message: 'good', data: newRequest})
    } catch (e: any) {
        throw e;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "POST":
                await createLead(req, res);
                break;
            default:
                throw new Error('Unsupported request method');
        }
    } catch (e: any) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
}
