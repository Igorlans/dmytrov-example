import React from "react";
import { Rates } from "@/components/RequestForm/Rates";
import { FieldValues, Path, UseFormReturn, UseFormTrigger } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { Tariffes } from "@prisma/client";
import FormNavigation from "@/components/RequestForm/FormNavigation";


interface IPickTariffProps<T extends FieldValues> {
    tariffes: Tariffes[],
    methods: UseFormReturn<T>,
    handleBack: () => void;
    handleNext: () => void;
    isLastTour: boolean;
    isFirstTour: boolean;
}
const PickTariff = <T extends FieldValues>({methods, isFirstTour, isLastTour, handleBack, handleNext, tariffes} : IPickTariffProps<T>) => {

    const {t} = useTranslation()

    const handleSubmit = async () => {
        await methods.trigger("tariffId" as Path<T>);
        if (methods.formState?.errors?.tariffId) return false;
        handleNext()
    };

    return (
        <div className="create__item">
            <div className="create__item-content">
                <div className="create__item-content-inner">
                    <div className="create__item-content-title">
                        {t("create:chooseType")}
                    </div>
                    <div className="create__item-content-box">
                        <Rates tariffes={tariffes} methods={methods} />
                    </div>
                </div>
                <FormNavigation isFirstTour={isFirstTour} isLastTour={isLastTour} handleBack={handleBack} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default PickTariff;