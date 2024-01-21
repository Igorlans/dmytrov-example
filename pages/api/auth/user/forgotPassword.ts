import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse } from "@/types/types";
import generateRandomString from "@/utils/generateRandomString";
import bcrypt from "bcryptjs";
import { emailString, foxyCodeMailService } from "@/services/mailService";
import { User } from "@prisma/client";

function compareAsync(password: string, hash: string): Promise<boolean> {
    console.log("password", password);
    console.log("hash", hash);
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hash, function(err, res) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}


const getHash = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<string>>) => {
    try {
        const body: { email?: emailString } = req.query;

        if (!body?.email) return res.status(400).json({ message: "Користувача з таким email не існує" });

        const dbUser = await prisma.user.findUnique({
            where: {
                email: body.email
            },
            select: {
                id: true
            }
        });
        if (!dbUser) return res.status(400).json({ message: "Користувача з таким email не існує" });

        const confirmationCode = generateRandomString(6);
        console.log("Confirmation Code", confirmationCode);
        let generatedHash = "";
        bcrypt.hash(confirmationCode, bcrypt.genSaltSync(12), function(err, hash) {
            if (err) throw err;
            generatedHash = hash;
        });
        console.log("HASH", generatedHash);


        await foxyCodeMailService.sendEmail({
            to: body.email,
            subject: "dmytrov.com.ua - Код підтвердження",
            html: `<div style="min-height: 50vh; display: flex; flex-direction: column justify-content: center; align-items: center; font-family: Arial, sans-serif; text-align: center; gap: 30px">
                        <h1 style="font-size: 32px">Код підтвердження для зміни паролю</h1>
                        <h2 style="font-size: 28px">${confirmationCode}</h2>
                   </div>`

        });

        return res.status(200).json({ message: "good", data: generatedHash });
    } catch (e: any) {
        throw e;
    }
};

const confirmCode = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<boolean>>) => {
    try {
        const { confirmationCode, hash }: any = req.body;
        const isValid = bcrypt.compareSync(confirmationCode, hash);
        console.log("isVALID ======", isValid);


        if (!isValid) return res.status(400).json({ message: "Невірний код підтвердження" });

        return res.status(200).json({ message: "good", data: isValid });
    } catch (e: any) {
        throw e;
    }
};

const changePassword = async (req: NextApiRequest, res: NextApiResponse<IApiResponse<User>>) => {
    try {
        const { newPassword, email }: any = req.body;

        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: newPassword
            }
        });


        return res.status(200).json({ message: "good", data: updatedUser });
    } catch (e: any) {
        throw e;
    }
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                await getHash(req, res);
                break;
            case "POST":
                await confirmCode(req, res);
                break;
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
