import prisma from "@/prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {ServicesRequest} from "@prisma/client";
import {IApiResponse} from "@/types/types";

const createServicesRequest = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<ServicesRequest>>) => {
    try {
        const body: ServicesRequest = req.body;
        console.log("BODY ========= ", body)
        if (!body) return res.status(400).json({message: 'Не вказані дані'})
        const newServicesRequest = await prisma.servicesRequest.create({
            data: {
                userId: body.userId,
                servicesId: body.servicesId
            }
        })
        return res.status(201).json({message: 'good', data: newServicesRequest})
    } catch (e: any) {
        throw e;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "POST":
                await createServicesRequest(req, res);
                break;
            default:
                throw new Error('Unsupported request method');
        }
    } catch (e: any) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
}
