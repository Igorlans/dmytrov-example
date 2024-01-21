//@ts-nocheck
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/UI/Input/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiRequest } from "@/utils/apiRequest";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalDataValidationSchema } from "@/components/account/PersonalData/validation";
import ChangePassword from "@/components/account/PersonalData/ChangePassword";
import { useTranslation } from "react-i18next";

const PersonalData = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const router = useRouter();

    const { data: session, update } = useSession();
    const { t } = useTranslation();

    const user = session?.user;

    type FormValues = {
        name: string;
        surname: string;
        fatherName: string;
        phone: string;
        skype: string;
    }

    const defaultValues: FormValues = {
        name: user?.name || "",
        surname: user?.surname || "",
        fatherName: user?.fatherName || "",
        phone: user?.phone || "",
        skype: user?.skype || ""
    };

    const methods = useForm<FormValues>({
        defaultValues: defaultValues,
        resolver: zodResolver(personalDataValidationSchema)
    });

    console.log("Errors ====", methods.formState.errors);
    console.log("VALUES ====", methods.watch());

    useEffect(() => {
        methods.reset(defaultValues);
    }, [session]);

    const submitHandler = async (data: FormValues) => {
        try {
            console.log("hui");
            await toast.promise(apiRequest({
                url: "/api/auth/user", data:
                    {
                        ...data,
                        email: user?.email
                    }, method: "PUT"
            }), {
                loading: `${t("validation:userEditLoading")}...`,
                success: () => {
                    update({});
                    setIsEditing(false);
                    return `${t("validation:userEditSuccess")}`;
                }, error: `${t("validation:userEditError")}`
            });
        } catch (e) {
            console.error(e);
        }
    };

    const onCancel = () => {
        setIsEditing(false);
        methods.reset(defaultValues);
    };


    return (
        <form onSubmit={methods.handleSubmit(submitHandler)} className="account__box-data">
            <div className="account__data-top">
                <div className="account__data-title">{ t("account:formTitle") }</div>
                {isEditing
                    ? <div
                        className="account__data-edit"
                        onClick={methods.handleSubmit(submitHandler)}
                    >
                        { t("account:formSave")}
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.5642 1.70348L12.2956 0.434734C11.7159 -0.144925 10.7728 -0.144898 10.1932 0.434734C9.6474 0.980542 1.31151 9.31706 0.754438 9.87416C0.695102 9.9335 0.655344 10.0124 0.64118 10.0895L0.00686094 13.5151C-0.017721 13.6479 0.024607 13.7843 0.120119 13.8798C0.215739 13.9755 0.352185 14.0177 0.484829 13.9931L3.91015 13.3587C3.98931 13.344 4.06713 13.3038 4.12548 13.2454L13.5642 3.80602C14.1452 3.22502 14.1453 2.28456 13.5642 1.70348ZM0.922055 13.0778L1.30577 11.0056L2.99413 12.6941L0.922055 13.0778ZM3.83547 12.3753L1.62449 10.1642L9.69662 2.09146L11.9076 4.30261L3.83547 12.3753ZM12.9842 3.22598L12.4876 3.72257L10.2766 1.51142L10.7732 1.01483C11.033 0.755011 11.4557 0.754983 11.7155 1.01483L12.9842 2.28358C13.2446 2.54403 13.2446 2.9655 12.9842 3.22598Z"
                                fill="#E55733"
                            />
                        </svg>
                    </div>
                    : <div
                        className="account__data-edit"
                        onClick={() => setIsEditing(true)}
                    >
                        { t("account:formEdit") }
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.5642 1.70348L12.2956 0.434734C11.7159 -0.144925 10.7728 -0.144898 10.1932 0.434734C9.6474 0.980542 1.31151 9.31706 0.754438 9.87416C0.695102 9.9335 0.655344 10.0124 0.64118 10.0895L0.00686094 13.5151C-0.017721 13.6479 0.024607 13.7843 0.120119 13.8798C0.215739 13.9755 0.352185 14.0177 0.484829 13.9931L3.91015 13.3587C3.98931 13.344 4.06713 13.3038 4.12548 13.2454L13.5642 3.80602C14.1452 3.22502 14.1453 2.28456 13.5642 1.70348ZM0.922055 13.0778L1.30577 11.0056L2.99413 12.6941L0.922055 13.0778ZM3.83547 12.3753L1.62449 10.1642L9.69662 2.09146L11.9076 4.30261L3.83547 12.3753ZM12.9842 3.22598L12.4876 3.72257L10.2766 1.51142L10.7732 1.01483C11.033 0.755011 11.4557 0.754983 11.7155 1.01483L12.9842 2.28358C13.2446 2.54403 13.2446 2.9655 12.9842 3.22598Z"
                                fill="#E55733"
                            />
                        </svg>
                    </div>

                }

            </div>
            <FormInput disabled={!isEditing} name={"surname"} control={methods.control} label={t("account:surname")} />
            <FormInput disabled={!isEditing} name={"name"} control={methods.control} label={t("account:name")} />
            <FormInput disabled={!isEditing} name={"fatherName"} control={methods.control} label={t("account:byFuther")} />
            <FormInput
                disabled={!isEditing}
                name={"phone"} control={methods.control}
                label={t("account:phone")}
                mask={"+38 (099) 999-99-99"}
            />
            <FormInput disabled={!isEditing} name={"skype"} control={methods.control} label={"Skype"} />
            {isEditing ?
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                    <Button onClick={onCancel}>{ t("account:cancel") }</Button>
                </div>
                : null
            }

            <div
                className="account__data-btn"
                onClick={() => setIsChangePasswordOpen(true)}
            >
                <svg
                    width="17"
                    height="22"
                    viewBox="0 0 17 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.50046 0.17627C5.11811 0.17627 2.41222 2.88215 2.41222 6.2645V8.97039C1.26222 8.97039 0.382812 9.8498 0.382812 10.9998V19.7939C0.382812 20.9439 1.26222 21.8233 2.41222 21.8233H14.5887C15.7387 21.8233 16.6181 20.9439 16.6181 19.7939V10.9998C16.6181 9.8498 15.7387 8.97039 14.5887 8.97039V6.2645C14.5887 2.88215 11.8828 0.17627 8.50046 0.17627ZM15.2652 10.9998V19.7939C15.2652 20.1998 14.9946 20.4704 14.5887 20.4704H2.41222C2.00634 20.4704 1.73575 20.1998 1.73575 19.7939V10.9998C1.73575 10.5939 2.00634 10.3233 2.41222 10.3233H3.08869H13.9122H14.5887C14.9946 10.3233 15.2652 10.5939 15.2652 10.9998ZM3.76517 8.97039V6.2645C3.76517 3.62627 5.86222 1.52921 8.50046 1.52921C11.1387 1.52921 13.2358 3.62627 13.2358 6.2645V8.97039H3.76517Z"
                        fill="#353535"
                    />
                    <path
                        d="M8.50207 12.3525C7.35207 12.3525 6.47266 13.232 6.47266 14.382C6.47266 15.2614 7.01383 16.0055 7.8256 16.2761V17.7643C7.8256 18.1702 8.09619 18.4408 8.50207 18.4408C8.90795 18.4408 9.17854 18.1702 9.17854 17.7643V16.2761C9.9903 16.0055 10.5315 15.2614 10.5315 14.382C10.5315 13.232 9.65207 12.3525 8.50207 12.3525ZM8.50207 15.0584C8.09619 15.0584 7.8256 14.7878 7.8256 14.382C7.8256 13.9761 8.09619 13.7055 8.50207 13.7055C8.90795 13.7055 9.17854 13.9761 9.17854 14.382C9.17854 14.7878 8.90795 15.0584 8.50207 15.0584Z"
                        fill="#353535"
                    />
                </svg>
                { t("common:changePasswordButton")}
            </div>
            <ChangePassword open={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
            <div
                style={{ width: "100%", marginBottom: 100 }}
                onClick={async () => {
                    await signOut({
                        redirect: false
                    });
                    toast.success(`${ t("validation:userLogOutSuccess")}`);
                    router.push("/");
                }}
                className="button account__item-box-btn"
            >
                { t("common:logOutButton")}
            </div>
        </form>
    );
};

export default PersonalData;