import { NextApiRequest, NextApiResponse } from "next";
import { foxyCodeMailService, IMailOptions } from "@/services/mailService";

const sendMail = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body: IMailOptions = req.body;
        const info = await foxyCodeMailService.sendEmail(body);
        console.log("BODY ========= ", body);
        return res.status(200).json({ message: "good", data: info });
    } catch (e: any) {
        throw e;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "POST":
                await sendMail(req, res);
                break;
            default:
                throw new Error("Unsupported request method");
        }
    } catch (e: any) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
}
