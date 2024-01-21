import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/UI/Input/FormInput";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordStep } from "@/pages/forgotPassword";
import { apiRequest } from "@/utils/apiRequest";
import toast from "react-hot-toast";
import { emailString } from "@/services/mailService";
import { useTranslation } from "next-i18next";



interface IEnterEmailProps {
    setStep: (step: ChangePasswordStep) => void;
    setHash: (hash: string) => void;
    setEmail: (email: emailString) => void;
}

const EnterEmail: FC<IEnterEmailProps> = ({ setStep, setHash, setEmail }) => {
    const { t } = useTranslation();
    type EmailValues = z.infer<typeof emailValidationSchema>
    const emailValidationSchema = z.object({
        email: z.string().nonempty(t("validation:requiredLine")).email(t("validation:wrongFormat"))
    });

    const methods = useForm<EmailValues>({
        defaultValues: {
            email: ""
        },
        resolver: zodResolver(emailValidationSchema)
    });

    const submitHandler = async (data: EmailValues) => {
        try {
            await toast.promise(apiRequest({
                url: `/api/auth/user/forgotPassword?email=${data.email}`,
                method: "GET"
            }), {
                loading: "",
                success: (hash) => {
                    setHash(hash);
                    setEmail(data.email as emailString);
                    setStep("CONFIRM_CODE");
                    return `${t("validation:sendCode")}`;
                },
                error: (e) => {
                    return `${t("validation:userNotFound")}` || `${t("validation:error")}`;
                }
            });
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div>
            <div className="forgotPassword__subtitle">{ t("passworRestore:email") }</div>
            <div style={{ minWidth: 350 }}>
                <FormInput name={"email"} control={methods.control} label={t("passworRestore:emailInput")} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 40 }}>
                    <Button
                        size={"large"}
                        onClick={methods.handleSubmit(submitHandler)}
                        variant={"contained"}
                    >
                        { t("common:nextStepButton") }
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EnterEmail;