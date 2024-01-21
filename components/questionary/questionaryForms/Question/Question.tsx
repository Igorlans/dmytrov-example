import { ITourProps } from "@/types/questionary";
import { FC, useEffect } from "react";
import QuestionaryNav from "@/components/questionary/questionaryForms/QuestionaryNav";
import { useForm } from "react-hook-form";
import { ScrollToTopOnMount } from "@/helpers/routerup";
import { IQuestionAnswer, IQuestionTour } from "@/types/questionary/question";
import { IResidentInfoAnswer } from "@/types/questionary/residentInfo";
import FormTextarea from "@/components/UI/Textarea/FormTextarea";
import { toast } from "react-hot-toast";

const Question: FC<ITourProps<IQuestionTour, IQuestionAnswer>> = ({
                                                                      answer,
                                                                      tourSubmitHandler,
                                                                      tour,
                                                                      isLastTour,
                                                                      isFirstTour,
                                                                      setStep,
                                                                      step
                                                                  }) => {
    const questionDefaultValues: IQuestionAnswer = {
        answer: ""
    };

    const persistedQuestionDefaultValues: IQuestionAnswer = {
        answer: answer?.answer
    };

    const defaultValues = answer
        ? persistedQuestionDefaultValues
        : questionDefaultValues;

    const methods = useForm<IQuestionAnswer>({
        mode: "onBlur",
        defaultValues: defaultValues
    });

    useEffect(() => {
        methods.reset(defaultValues);
    }, [step]);

    return (
        <div>
            {/*<div>*/}
            {/*    <div style={{ maxWidth: 300 }}>*/}
            {/*        <code>Values : {JSON.stringify(methods.watch())}</code>*/}
            {/*    </div>*/}
            {/*    <div style={{ maxWidth: 300 }}>*/}
            {/*        <code>*/}
            {/*            ERRORS : {JSON.stringify(methods.formState.errors)}*/}
            {/*        </code>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div>
                <div className="worksheet__item-subtitle">
                    Дайте відповідь на запитання:
                </div>
                <div className="title worksheet__item-title">{tour?.text}</div>
                <FormTextarea
                    name={"answer"}
                    style={{ minHeight: 145 }}
                    control={methods.control}
                    label={"Відповідь"}
                    placeholder={tour?.hint || ""}
                />
                <QuestionaryNav
                    isFirstTour={isFirstTour}
                    isLastTour={isLastTour}
                    step={step}
                    setStep={setStep}
                    handleSubmit={methods.handleSubmit((data) => {
                        try {
                            if (!data.answer.length) throw new Error();
                            tourSubmitHandler({
                                ...tour,
                                answers: data
                            });
                        } catch (e) {
                            toast.error("Дайте відповідь на запитання");
                        }
                    })}
                />
            </div>
        </div>
    );
};

export default Question;
