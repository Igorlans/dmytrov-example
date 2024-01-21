import { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createTransport } from "nodemailer";
import validate from "deep-email-validator";

export type emailString = `${string}@${string}.${string}`
export type gmailString = `${string}@gmail.com`

export interface IMailOptions {
    to: emailString,
    subject: string,
    html: string
}

class MailService {
    private user: emailString;
    private password: string;
    private transporter;

    constructor(user: gmailString, password: string) {
        this.user = user;
        this.password = password;
        this.transporter = createTransport({
            service: "gmail",
            auth: {
                user: user,
                pass: password
            }
        });
    }

    async sendEmail({ to, subject, html }: IMailOptions) {
        try {
            const mailOptions = { from: this.user, to, subject, html: html };
            return await this.transporter.sendMail(mailOptions);
        } catch (e) {
            throw e;
        }
    }
}

export default MailService;

export const foxyCodeMailService = new MailService("dmytrov.sms@gmail.com", "tjtmrpxxtuyyxqhy");