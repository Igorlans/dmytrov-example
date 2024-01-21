import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useTranslation } from "next-i18next";
import FormNavigation from "@/components/RequestForm/FormNavigation";

interface IPickAddressProps<T extends FieldValues> {
    methods: UseFormReturn<T>,
    handleBack: () => void;
    handleNext: () => void;
    isLastTour: boolean;
    isFirstTour: boolean;
}
const PickAddress = <T extends FieldValues>({
    methods,
    handleBack,
    handleNext,
    isFirstTour,
    isLastTour
                                            }: IPickAddressProps<T>) => {

    const {t} = useTranslation();

    const handleSubmit = async () => {
        await methods.trigger("address" as Path<T>);
        await methods.trigger("street" as Path<T>);
        await methods.trigger("homeNumber" as Path<T>);
        if (
            methods.formState.errors?.address ||
            methods.formState.errors?.street ||
            methods.formState.errors?.homeNumber
        ) return;
        handleNext()
    }


    return (
        <div className="create__item">
            <div className="create__item-content">
                <div className="create__item-content-inner">
                    <div className="create__item-content-title">
                        {t("create:addAddress")}
                    </div>
                    <div className="create__item-content-box">
                        <div className="aside-popup__form-item aside-popup__form-item-city">
                            <input
                                {...methods.register(
                                    "address" as Path<T>,
                                    {
                                        required:
                                            `${ t("validation:requiredLine") }`
                                    }
                                )}
                                className="input  input-city"
                                id="form-city"
                                // onClick={() => setOpenCityList(true)}
                            ></input>
                            <label
                                className="label"
                                htmlFor="form-city"
                            >
                                {t("create:city")}
                            </label>
                            
                            {methods.formState.errors?.address ? (
                                <span className="error-message">
                                    {JSON.stringify(methods.formState.errors?.address?.message)?.slice(1, -1)}
                                </span>
                            ) : null}

                        </div>
                        <div className="aside-popup__form-item">
                            <input
                                {...methods.register(
                                    "street" as Path<T>,
                                    {
                                        required:
                                            `${ t("validation:requiredLine") }`
                                    }
                                )}
                                className="input"
                                id="form-streer"
                            ></input>
                            <label
                                className="label"
                                htmlFor="form-streer"
                            >
                                {t("create:street")}
                            </label>
                            {methods.formState.errors?.street && (
                                <span className="error-message">
                                      {JSON.stringify(methods.formState.errors?.street?.message)?.slice(1, -1)}
                                </span>
                            )}
                        </div>
                        <div className="aside-popup__form-item">
                            <input
                                {...methods.register(
                                    "homeNumber" as Path<T>,
                                    {
                                        required:
                                            `${ t("validation:requiredLine") }`
                                    }
                                )}
                                className=" input"
                                id="form-numhome"
                            ></input>
                            <label
                                className="label"
                                htmlFor="form-numhome"
                            >
                                № {t("create:house")}
                            </label>
                            {methods.formState.errors?.homeNumber && (
                                <span className="error-message">
                                    {JSON.stringify(methods.formState.errors?.homeNumber?.message)?.slice(1, -1)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <FormNavigation
                    isFirstTour={isFirstTour}
                    isLastTour={isLastTour}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default PickAddress;