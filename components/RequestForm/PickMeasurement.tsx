import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { useTranslation } from "next-i18next";
import FormNavigation from "@/components/RequestForm/FormNavigation";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import { useState } from "react";
import { buildingTypeName } from "@/utils/buildingTypeName";
import { toast } from "react-hot-toast";
import { createLeadRequest } from "@/requests/leadRequests";
import sendTelegram from "@/utils/sendTelegram";
import { useSession } from "next-auth/react";
import { Tariffes } from "@prisma/client";
import { useRouter } from "next/navigation";
import classes from './pickMeasurment.module.scss'
import { Divider, useMediaQuery } from "@mui/material";
import useFileUploader from "@/hooks/useFileUploader";
import FileUploader from "@/components/RequestForm/FileUploader/FileUploader";
import createZipFromFiles from "@/utils/createZipFromFiles";
import SupabaseFileService from "@/services/SupabaseFileService";
import { STORAGE_URL } from "@/config";

interface IPickMeasurementProps<T extends FieldValues> {
    methods: UseFormReturn<T>,
    tariffes: Tariffes[];
    handleBack: () => void;
    isLastTour: boolean;
    isFirstTour: boolean;
}
const PickMeasurement = <T extends FieldValues>({
                                                methods,
                                                handleBack,
                                                isFirstTour,
                                                tariffes,
                                                isLastTour
                                            }: IPickMeasurementProps<T>) => {



    const {t} = useTranslation();
    const { data: session, update: sessionUpdate } = useSession();

    const pickedTariffName: string | undefined = tariffes?.find((tariff) => tariff?.id === methods.watch("tariffId" as Path<T>))?.title;

    const router = useRouter()
    const [date, setDate] = useState(dayjs(new Date()));
    const isMobile = useMediaQuery('(max-width:863px)');

    const uploaderProps = useFileUploader({maxFiles: 30})


    const submitHandler = async (data: any) => {

        const request = async () => {
            try {
                let file;
                if (uploaderProps.files.length) {
                    const zipFile = await createZipFromFiles(uploaderProps.files)
                    const fileName = `${session?.user?.id}_${Date.now()}_files.zip`
                    const { path } = await SupabaseFileService.uploadFile(
                        zipFile,
                        "images",
                        fileName,
                        "measureFiles"
                    )

                    file = {
                        name: fileName,
                        url: `${STORAGE_URL}/${path}`,
                    }
                }

                const formData = {
                    ...data,
                    userId: session?.user.id,
                    files: file || undefined
                }

                await createLeadRequest(formData)

                return file

            } catch (e) {
                throw e;
            }
        }
        // ПІБ: ${session.user}


        
        if (!data.agreement)
            return toast.error(
                `${ t("validation:orderCreatingError")}`
            );
        try {



            await toast.promise(request(),
                {
                    loading: `${ t("validation:orderCreating")}...`,
                    success: (reqData) => {
                        (async () => {
                            await sessionUpdate({});

                            const projectRequest = `
Заявки на проєкт

ПІБ: ${session?.user?.surname || ""} ${session?.user?.name || ""} ${session?.user?.fatherName || ""}
Телефон: ${session?.user?.phone || ""}
Email: ${session?.user?.email || ""}
Тариф: ${pickedTariffName}
Коментар: ${data.comment}
Площа: ${data.square}
Тип об'єкту: ${buildingTypeName[data.type as "COMMERCE" | "HOUSE" | "APARTMENT"]}
Адреса: ${data.address}
Вулиця: ${data.street}
Номер будинку: ${data.homeNumber}
Дата замірів: ${dayjs(data.date).format("DD-MM-YYYY")}
Файли замірів: ${reqData?.url || 'Немає'}
`;
                            await sendTelegram(projectRequest);
                        })();
                        router.push("/accountpage");
                        console.log("DATA", data);
                        return `${ t("validation:orderCreatingSuccess")}`;
                    },
                    error: (err) => err.message
                }
            );

        } catch (e) {
            console.error(e);
        }
    };






    return (
        <div className="create__item">
            <div className="create__item-content">
                <div className={classes.form}>
                    <div className={classes.calendar}>
                        <div className={classes.title}>
                            {t("create:cooseDate")}
                        </div>
                        <input
                            type="hidden"
                            {...methods.register(
                                "date" as Path<T>,
                                {
                                    required:
                                        "Вкажіть дату"
                                }
                            )}
                        />
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="uk"
                        >
                            <DateCalendar
                                value={date}
                                onChange={(
                                    value: dayjs.Dayjs | null
                                ) => {
                                    if (!value) return;
                                    setDate(value);
                                    methods.setValue(
                                        "date" as Path<T>,
                                        dayjs(
                                            value
                                        ).valueOf() as PathValue<T, Path<T>>
                                    );
                                }}
                                sx={calendarSx}
                                disablePast={true}
                            />
                        </LocalizationProvider>
                        {methods.formState.errors?.date && (
                            <span className="error-message">
                             {JSON.stringify(methods.formState.errors?.date?.message)?.slice(1, -1)}
                        </span>
                        )}
                    </div>
                    <div style={isMobile ? {width: '100%', marginBottom: 30} : {}}>
                        <Divider sx={!isMobile ? {height: '100%'} : {}} orientation={isMobile ? 'horizontal' : 'vertical'}>
                            {t("create:or").toUpperCase()}
                        </Divider>
                    </div>
                    <div className={classes.fileUploader}>
                        <div className={classes.title}>
                            {t("create:uploadFiles")}
                        </div>
                        <FileUploader {...uploaderProps} />
                    </div>

                </div>


                <div className={classes.additional}>
                    <div className={classes.body}>
                        <div className="aside-popup__form-item aside-popup__textarea">
                        <textarea
                            {...methods.register(
                                "comment" as Path<T>
                            )}
                            className="input"
                        ></textarea>
                            <label className="label">
                                {t("create:comment")}
                            </label>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#9a9a9a",
                                    fontWeight: "400",
                                    lineHeight: "16px"
                                }}
                            >
                                {t("create:example")}
                            </div>
                        </div>
                        <label className="aside-popup__check-box-label create__item-label" style={{marginTop: 20}}>
                            <input
                                {...methods.register(
                                    "agreement" as Path<T>
                                )}
                                className="aside-popup__check-box-input"
                                type="checkbox"
                            />
                            <span className="aside-popup__check-box-style"></span>
                            { t("create:fomIAgree") }{" "}
                            <a style={{color: "#e55733"}} href="/politic" target="_blank">{ t("create:fomIPrivacy")}</a>
                            {' '}
                            { t("create:fomIAllow") }
                        </label>
                    </div>
                    </div>



                <FormNavigation isFirstTour={isFirstTour} isLastTour={isLastTour} handleBack={handleBack} handleSubmit={methods.handleSubmit(submitHandler)} />
            </div>
        </div>
    );
};

export default PickMeasurement;


const calendarSx = {
    svg: {
        color: "#e55733"
    },
    ".MuiPickersDay-root.Mui-selected":
        {
            background:
                "#e55733"
        },
    ".MuiPickersDay-root.Mui-selected:focus":
        {
            background:
                "#e55733"
        },
    ".MuiPickersYear-yearButton.Mui-selected":
        {
            background:
                "#e55733"
        },
    // ".MuiPickersCalendarHeader-root":
    //     {
    //       paddingLeft: 0
    //     },
    mx: 0

}