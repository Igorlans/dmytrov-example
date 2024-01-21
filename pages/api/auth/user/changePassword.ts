import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse, ISignUpBody } from "@/types/types";
import { User } from "@prisma/client";


const changePassword = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<User>>) => {
    try {
        const body: { oldPassword: string, newPassword: string, email: string } = req.body;
        if (!body) return res.status(400).json({ message: "Не вказані дані" });
        const dbUser = await prisma.user.findUnique({
            where: {
                email: body.email
            },
            select: {
                password: true
            }
        });
        const isValid = dbUser?.password === body.oldPassword;
        if (!isValid) return res.status(400).json({ message: "Неправильний пароль" });

        const newUser = await prisma.user.update({
            where: {
                email: body.email
            },
            data: {
                password: body.newPassword
            }
        });
        return res.status(200).json({ message: "good", data: newUser });
    } catch (e: any) {
        throw e;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "PUT":
                await changePassword(req, res);
                break;
            default:
                new Error("Unsupported request method");
        }
    } catch (e: any) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
}
