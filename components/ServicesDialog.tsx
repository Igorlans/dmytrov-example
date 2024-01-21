//@ts-nocheck
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {FC} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {createServiceRequest} from "@/requests/serviceRequest";

import sendTelegram from "@/utils/sendTelegram"
import { User } from "@prisma/client";
import { useTranslation } from "next-i18next";

interface ServicesDialogProps {
    userId: string;
    servicesId: string;
    open: boolean;
    userData: User
    tarrifsName: string;
    handleClose: () => void;
}
const ServicesDialog: FC<ServicesDialogProps> = ({userId, tarrifsName, userData, servicesId, open, handleClose}) => {
    const router = useRouter()
    const {t} = useTranslation()
    const submitHandler = async () => {
const projectRequest = 
`
Заявки на доп. послуги

ПІБ: ${userData.name}
Телефон: ${userData.phone}
Email: ${userData.email}
Послуга: ${tarrifsName}
`;
        try {
            // handleClose()
            const body = {
                userId,
                servicesId,
            }

            
            await toast.promise(
                createServiceRequest(body),
                {
                    loading: 'Замовлення додаткової послуги...',
                    success: () => `Додаткова послуга замовлена`,
                    error: (err) => err.message
                }
            );
            await sendTelegram(projectRequest)
            router.push('/accountpage')
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('common:areYouSureAddition')}
                </DialogTitle>
                {/*<DialogContent>*/}
                {/*    <DialogContentText id="alert-dialog-description">*/}
                {/*        Let Google help apps determine location. This means sending anonymous*/}
                {/*        location data to Google, even when no apps are running.*/}
                {/*    </DialogContentText>*/}
                {/*</DialogContent>*/}
                <DialogActions>
                    <Button onClick={handleClose}>{t('common:no')}</Button>
                    <Button onClick={submitHandler} autoFocus>
                        {t('common:yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ServicesDialog;