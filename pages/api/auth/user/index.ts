import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse, ISignUpBody } from "@/types/types";
import { User } from "@prisma/client";

const createUser = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<User>>) => {
    try {
        const body: ISignUpBody = req.body;
        if (!body) return res.status(400).json({ message: "Не вказані дані про нового користувача" });
        const checkUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (checkUser) return res.status(400).json({ message: "Користувач із таким email вже існує" });

        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                skype: body.skype,
                name: body.name,
                surname: body.surname,
                fatherName: body.father_name,
                phone: body.phone,
                createdAt: String(Date.now())
            }
        });
        return res.status(201).json({ message: "good", data: newUser });
    } catch (e: any) {
        throw e;
    }
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<User>>) => {
    try {
        const body: ISignUpBody = req.body;
        if (!body) return res.status(400).json({ message: "Не вказані дані" });
        const newUser = await prisma.user.update({
            where: {
                email: body.email
            },
            data: {
                email: body.email,
                password: body.password,
                skype: body.skype,
                name: body.name,
                surname: body.surname,
                fatherName: body.fatherName,
                phone: body.phone
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
            case "POST":
                await createUser(req, res);
                break;
            case "PUT":
                await updateUser(req, res);
                break;
            default:
                new Error("Unsupported request method");
        }
    } catch (e: any) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
}
