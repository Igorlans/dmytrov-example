import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/UI/Input/FormInput";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/utils/apiRequest";
import toast from "react-hot-toast";
import { emailString } from "@/services/mailService";
import { useRouter } from "next/navigation";
import useLoginAside from "@/context/useLoginAside";
import { useTranslation } from "next-i18next";


const changePasswordValidationSchema = z.object({
    newPassword: z.string().nonempty("Поле обов'язкове").min(8, "Код має містити мінімум 8 символів"),
    // @ts-ignore
    repeatPassword: z.string().nonempty("Поле обов'язкове")
}).refine((data) => data.repeatPassword === data.newPassword, {
    message: ``,
    path: ["repeatPassword"]
});

type ChangePasswordValues = z.infer<typeof changePasswordValidationSchema>

interface IChangePasswordProps {
    email: emailString;
}

const ChangePassword: FC<IChangePasswordProps> = ({ email }) => {
    const router = useRouter();
    const { setIsOpen } = useLoginAside();
    const { t } = useTranslation();

    const changePasswordValidationSchema = z.object({
        newPassword: z.string().nonempty(t("validation:requiredLine")).min(8, `${t("validation:wrongFormatLenght")}`),
        // @ts-ignore
        repeatPassword: z.string().nonempty(t("validation:requiredLine"))
    }).refine((data) => data.repeatPassword === data.newPassword, {
        message: `${t("validation:passwordMatch")}`,
        path: ["repeatPassword"]
    });

    const methods = useForm<ChangePasswordValues>({
        defaultValues: {
            newPassword: "",
            repeatPassword: ""
        },
        resolver: zodResolver(changePasswordValidationSchema)
    });

    const submitHandler = async (data: ChangePasswordValues) => {
        try {
            await toast.promise(apiRequest({
                url: `/api/auth/user/forgotPassword`,
                data: { newPassword: data.newPassword, email: email },
                method: "PUT"
            }), {
                loading: `${t("validation:passwordChanging")}...`,
                success: () => {
                    router.push("/");
                    setIsOpen(true);
                    return `${t("validation:passwordChangingSuccess")}`;
                },
                error: (e) => {
                    return `${t("validation:passwordChangingError")}` || `${t("validation:error")}`;
                }
            });
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div>
            <div className="forgotPassword__subtitle">{ t("passworRestore:newPassword")}</div>
            <div style={{ minWidth: 350 }}>
                <FormInput name={"newPassword"} control={methods.control} label={ t("passworRestore:enterNew")} />
                <FormInput name={"repeatPassword"} control={methods.control} label={ t("passworRestore:repeatNew")} />
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

export default ChangePassword;