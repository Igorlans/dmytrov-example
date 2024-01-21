import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/UI/Input/FormInput";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordStep } from "@/pages/forgotPassword";
import { apiRequest } from "@/utils/apiRequest";
import toast from "react-hot-toast";
import { useTranslation } from "next-i18next";

const confirmCodeValidationSchema = z.object({
    confirmationCode: z.string().nonempty("Поле обов'язкове").length(6, "Код має містити 6 символів")
});
type ConfirmCodeValues = z.infer<typeof confirmCodeValidationSchema>

interface IEnterEmailProps {
    setStep: (step: ChangePasswordStep) => void;
    hash: string;
}

const ConfirmCode: FC<IEnterEmailProps> = ({ setStep, hash }) => {
    const { t } = useTranslation();
    const methods = useForm<ConfirmCodeValues>({
        defaultValues: {
            confirmationCode: ""
        },
        resolver: zodResolver(confirmCodeValidationSchema)
    });

    const submitHandler = async (data: ConfirmCodeValues) => {
        try {
            await toast.promise(apiRequest({
                url: `/api/auth/user/forgotPassword`,
                data: { confirmationCode: data.confirmationCode, hash: hash },
                method: "POST"
            }), {
                loading: `${ t("validation:checkingCode")}...`,
                success: () => {
                    setStep("CHANGE_PASSWORD");
                    return `${ t("validation:checkingSuccess") }`
                },
                error: (e) => {
                    return `${ t("validation:checkingCodeError")}` || `${ t("validation:error") }`;
                }
            });
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div>
            <div className="forgotPassword__subtitle">{ t("passworRestore:code")}</div>
            <div style={{ minWidth: 350 }}>
                <FormInput name={"confirmationCode"} control={methods.control} label={ t("passworRestore:enterCode")} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 40 }}>
                    <Button
                        size={"large"}
                        onClick={methods.handleSubmit(submitHandler)}
                        variant={"contained"}
                    >
                        { t("common:nextStepButton")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCode;