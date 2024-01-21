import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/UI/Input/FormInput";
import { changePasswordSchema, ChangePasswordValues } from "@/components/account/PersonalData/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/utils/apiRequest";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Simulate } from "react-dom/test-utils";
import seeked = Simulate.seeked;
import { useTranslation } from "react-i18next";

interface IChangePasswordProps {
    open: boolean;
    onClose: () => void;
}

const ChangePassword: FC<IChangePasswordProps> = ({ open, onClose }) => {
    const { t } = useTranslation();
    const methods = useForm<ChangePasswordValues>({
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        },
        resolver: zodResolver(changePasswordSchema)
    });

    const { data: session } = useSession();
    const submitHandler = async (data: ChangePasswordValues) => {
        try {
            await toast.promise(apiRequest({
                url: "/api/auth/user/changePassword",
                data:
                    {
                        ...data,
                        email: session?.user?.email
                    }, method: "PUT"
            }), {
                loading: `${t("validation:passwordChanging")}...`,
                success: () => {
                    methods.reset();
                    onClose();
                    return `${t("validation:passwordChangingSuccess")}`;
                },
                error: (e) => {
                    return e?.message || `${t("validation:passwordChangingError")}`;
                }
            });
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
            
        >
            <DialogTitle>
                {t("account:changePassword")}
            </DialogTitle>
            <DialogContent
                // style={{ minHeight: "3000px" }}
            >
                <div style={{ minWidth: 300, paddingTop: 25 } }>
                    <FormInput name={"oldPassword"} control={methods.control} label={t("account:changePasswordOld")} />
                    <FormInput name={"newPassword"} control={methods.control} label={t("account:changePasswordNew")} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    methods.reset();
                    onClose();
                }}>{ t("account:cancel")}</Button>
                <Button variant={"contained"} onClick={methods.handleSubmit(submitHandler)} autoFocus>
                    {t("account:changeButton")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePassword;