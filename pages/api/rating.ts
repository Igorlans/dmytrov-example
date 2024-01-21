import prisma from "@/prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import { Review } from "@prisma/client";




const createReview = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body: Review = req.body;
        if (!body) return res.status(400).json({message: 'Не вказані дані'})
        const review = await prisma.review.create({
            data: {
                postId: body.postId,
                rating: body.rating,
            }
        })
        return res.status(201).json({message: 'good', data: review})
    } catch (e: any) {
        throw e;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "POST":
                await createReview(req, res);
                break;
            default:
                throw new Error('Unsupported request method');
        }
    } catch (e: any) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
}
