import {
    Control,
    Controller,
    FieldValues,
    FormState,
    Path, PathValue, UseFormRegister, UseFormReturn,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import FormNavigation from "@/components/RequestForm/FormNavigation";
import Slider from "@mui/material/Slider";


interface IPickSquareProps<T extends FieldValues> {
    methods: UseFormReturn<T>;
    handleBack: () => void;
    handleNext: () => void;
    isLastTour: boolean;
    isFirstTour: boolean;
}

const PickSquare = <T extends FieldValues>({ methods, isFirstTour, isLastTour, handleBack, handleNext }: IPickSquareProps<T>) => {

    const { t } = useTranslation();

    const handleSubmit = async () => {
        await methods.trigger("square" as Path<T>);
        if (methods.formState.errors?.square) return;
        handleNext();
    };

    return (
        <div className="create__item">
            <div className="create__item-content">
                <div className="create__item-content-inner">
                    <div className="create__item-content-title">
                        {t("create:chooseSquare")} (м2)
                    </div>
                    <div className="create__item-content-box">
                        <div className="services__range-slider">
                            <div className="services__range-slider-title">
                                5
                            </div>
                            <Controller
                                name={'square' as Path<T>}
                                control={
                                    methods.control
                                }
                                rules={{
                                    required:
                                        `${t("validation:requiredLine")}`,
                                    min: {
                                        value: 5,
                                        message:
                                            "Мінімальна квадратура - 5м2"
                                    }
                                }}
                                render={({
                                             field: {
                                                 onChange,
                                                 value
                                             }
                                         }) => {
                                    return (
                                        <Slider
                                            min={5}
                                            max={175}
                                            valueLabelDisplay="on"
                                            aria-label="Volume"
                                            // @ts-ignore
                                            value={
                                                value
                                            }
                                            onChange={
                                                onChange
                                            }
                                            sx={{
                                                color: "#E55733",
                                                "& .MuiSlider-thumb":
                                                    {
                                                        "&:hover, &.Mui-focusVisible":
                                                            {
                                                                boxShadow:
                                                                    "none"
                                                            },
                                                        "&.Mui-active":
                                                            {
                                                                boxShadow:
                                                                    "none"
                                                            }
                                                    },
                                                "& .MuiSlider-valueLabelOpen":
                                                    {
                                                        background:
                                                            "#E55733",
                                                        borderRadius:
                                                            "4px",
                                                        padding:
                                                            "1px 7px",
                                                        fontSize:
                                                            "16px",
                                                        lineHeight:
                                                            "150%"
                                                    }
                                            }}
                                        />
                                    );
                                }}
                            />

                            <div className="services__range-slider-title">
                                175+ м2
                            </div>
                        </div>
                        <div className="aside-popup__form-item">
                            <input
                                name=""
                                type="number"
                                className="input"
                                id="form-rage"
                                value={methods.watch(
                                    "square" as Path<T>
                                )}
                                onChange={(e) =>
                                    methods.setValue(
                                        "square" as Path<T>,
                                        e.target.value as PathValue<T, Path<T>>
                                    )
                                }
                            ></input>
                            <label
                                className="label"
                                htmlFor="form-rage"
                            >
                                {t("create:objSquare")}
                            </label>

                            {
                                methods.formState?.errors?.square?.message ?
                                <div className={'error-message'} dangerouslySetInnerHTML={{__html: `<div>${methods.formState.errors?.square?.message}</div>`}}>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <FormNavigation isFirstTour={isFirstTour} isLastTour={isLastTour} handleBack={handleBack} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default PickSquare;