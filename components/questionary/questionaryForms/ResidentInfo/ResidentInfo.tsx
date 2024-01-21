import { FC } from "react";
import { ITourProps } from "@/types/questionary";
import QuestionaryNav from "@/components/questionary/questionaryForms/QuestionaryNav";
import { useFieldArray, useForm } from "react-hook-form";
import { ScrollToTopOnMount } from "@/helpers/routerup";
import { RiDeleteBin7Line } from "react-icons/ri";
import {
    IResident,
    IResidentInfoAnswer,
    IResidentInfoTour,
    residentAnswerSchema
} from "@/types/questionary/residentInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import FormCheckbox from "@/components/UI/Checkbox/FormCheckbox";
import ResidentInfoItem from "@/components/questionary/questionaryForms/ResidentInfo/ResidentInfoItem";
import { CheckboxChangeEvent } from "@/components/UI/Checkbox/Checkbox";
import { IconButton } from "@mui/material";

const ResidentInfo: FC<ITourProps<IResidentInfoTour, IResidentInfoAnswer>> = ({
                                                                                  answer,
                                                                                  tourSubmitHandler,
                                                                                  isFirstTour,
                                                                                  isLastTour,
                                                                                  tour,
                                                                                  step,
                                                                                  setStep
                                                                              }) => {
    const residentInfoItemDefaultValues: IResident = {
        name: "",
        age: "",
        height: "",
        sex: null,
        dominantHand: null,
        weight: "",
        preferences: ""
    };

    const residentInfoDefaultValues: IResidentInfoAnswer = {
        isForRent: false,
        residents: [residentInfoItemDefaultValues]
    };

    const persistedResidentInfoDefaultValues: IResidentInfoAnswer = {
        isForRent: answer?.isForRent,
        residents: answer?.residents?.length ? answer.residents : undefined
    };

    const methods = useForm<IResidentInfoAnswer>({
        mode: "onChange",
        defaultValues: answer
            ? persistedResidentInfoDefaultValues
            : residentInfoDefaultValues,
        resolver: zodResolver(residentAnswerSchema)
    });

    const isForRent = methods.watch("isForRent");

    const {
        fields: residents,
        append,
        remove,
        replace
    } = useFieldArray({
        control: methods.control,
        name: "residents",
        shouldUnregister: false
    });

    const isForRentChangeHandler = (
        e: CheckboxChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.checked) {
            replace([residentInfoItemDefaultValues]);
        } else {
            methods.unregister("residents", {
                keepError: false
            });
        }
    };

    return (
        <div>
            <div>
                {/*<div style={{ maxWidth: 300 }}>*/}
                {/*    <code>Values : {JSON.stringify(methods.watch())}</code>*/}
                {/*</div>*/}
                {/*<div style={{ maxWidth: 300 }}>*/}
                {/*    <code>*/}
                {/*        ERRORS : {JSON.stringify(methods.formState.errors)}*/}
                {/*    </code>*/}
                {/*</div>*/}
                <div
                    style={{
                        fontWeight: 700,
                        fontSize: 28
                    }}
                >
                    <div
                        style={{
                            marginBottom: 15
                        }}
                    >
                        Проживаючі особи:
                    </div>
                    <FormCheckbox
                        onChange={isForRentChangeHandler}
                        name={"isForRent"}
                        label={"Для здачі в оренду"}
                        control={methods.control}
                    />
                </div>
                {!isForRent && (
                    <div className="worksheet__inputs-container">
                        {residents?.map((resident, index) => (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                    className="worksheet__item-subtitle worksheet__item-subtitle-mt"
                                >
                                    <div>Заповніть наступні поля:</div>
                                    {index !== 0 && (
                                        <IconButton
                                            color={"primary"}
                                            onClick={() => remove(index)}
                                        >
                                            <RiDeleteBin7Line size={24} />
                                        </IconButton>
                                    )}
                                </div>
                                <ResidentInfoItem
                                    formState={methods.formState}
                                    control={methods.control}
                                    register={methods.register}
                                    setValue={methods.setValue}
                                    watch={methods.watch}
                                    index={index}
                                />
                            </>
                        ))}
                        <div
                            onClick={() =>
                                append(residentInfoItemDefaultValues, {
                                    shouldFocus: true
                                })
                            }
                            className="button create__item-btn create__item-btn-next"
                        >
                            Додати проживаючу особу
                        </div>
                    </div>
                )}
            </div>
            <QuestionaryNav
                step={step}
                isFirstTour={isFirstTour}
                isLastTour={isLastTour}
                setStep={setStep}
                handleSubmit={methods.handleSubmit((data) =>
                    tourSubmitHandler({
                        ...tour,
                        answers: {
                            ...data,
                            residentQuantity: residents.length
                        }
                    })
                )}
            />
        </div>
    );
};

export default ResidentInfo;
