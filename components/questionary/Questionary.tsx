import QuestionaryIntro from "@/components/questionary/QuestionaryIntro/QuestionaryIntro";
import { IQuestionaryPageProps, ITour, ITourAnswer } from "@/types/questionary";
import { FC, useEffect, useRef, useState } from "react";
import ResidentInfo from "@/components/questionary/questionaryForms/ResidentInfo/ResidentInfo";
import Question from "@/components/questionary/questionaryForms/Question/Question";
import RoomList from "@/components/questionary/questionaryForms/RoomList/RoomList";
import RoomTable from "@/components/questionary/questionaryForms/RoomTable/RoomTable";
import Furniture from "@/components/questionary/questionaryForms/Furniture/Furniture";
import Table from "@/components/questionary/questionaryForms/Table/Table";
import { usePathname, useRouter } from "next/navigation";
import { IFurnitureAnswer, IRoom, IRoomAnswer } from "@/types/questionary/room";
import { IQuestionAnswer } from "@/types/questionary/question";
import { IResidentInfoAnswer } from "@/types/questionary/residentInfo";
import { IRoomTableAnswer, ITableAnswer } from "@/types/questionary/table";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/utils/apiRequest";
import { padding } from "@mui/system";

interface IQuestionaryProps {
    rooms: IRoom[];
    tours: ITour[];
}

const Questionary: FC<IQuestionaryPageProps> = ({
                                                    rooms,
                                                    tours,
                                                    answers: persistedAnswers,
                                                    step: persistedStep
                                                }) => {
    console.log(tours);
    const router = useRouter();
    const [step, setStep] = useState<number>(persistedStep || 0);
    const [answers, setAnswers] = useState<ITourAnswer[]>(
        persistedAnswers || []
    );
    console.log("ANSWERS ====", answers);

    const currentTour = tours[step];
    const currentAnswer = answers[step]?.answers;
    const isLastTour = tours.length - 1 === step;
    const isFirstTour = step === 0;

    const percent = ((step / tours.length) * 100).toFixed(0);
    const params = usePathname();
    const requestId = params.split("/")[2];

    const roomAnswers = answers?.find(
        (answer) => answer.type === "ROOM"
    )?.answers;

    const submitHandler = async (data: ITourAnswer[]) => {
        try {
            await toast.promise(
                apiRequest({
                    url: "/api/questionary",
                    method: "POST",
                    data: { answers: { answers: data }, id: requestId }
                }),
                {
                    loading: "Створення анкети",
                    success: () => {
                        router.push("/accountpage");
                        return "Анкета створена";
                    },
                    error: "Помилка створення анкети"
                }
            );
        } catch (e) {
            console.error(e);
        }
    };

    function replaceArrayItems(
        array: ITourAnswer[],
        newItem: ITourAnswer
    ): ITourAnswer[] {
        const hasId = "id" in newItem;

        const findIndexCondition = (item: ITourAnswer) => {
            if (hasId && "id" in item) {
                return item.id === newItem.id && item.type === newItem.type;
            } else {
                return item.type === newItem.type;
            }
        };

        const existingIndex = array.findIndex(findIndexCondition);

        if (existingIndex !== -1) {
            array[existingIndex] = newItem;
        } else {
            array.push(newItem);
        }

        return array;
    }

    const tourSubmitHandler = async (answer: ITourAnswer) => {
        try {
            const newAnswers = replaceArrayItems([...answers], answer);

            await apiRequest({
                url: "/api/questionary",
                data: {
                    id: requestId,
                    persisted: { tours, rooms, answers: newAnswers, step: step + 1 }
                },
                method: "PUT"
            });

            setAnswers(newAnswers);
            if (isLastTour) return submitHandler([...answers, answer]);
            setStep(step + 1);
        } catch (e) {
        }
    };

    const renderTour = () => {
        switch (currentTour.type) {
            case "RESIDENT_INFO":
                return (
                    <ResidentInfo
                        answer={currentAnswer as IResidentInfoAnswer}
                        tourSubmitHandler={tourSubmitHandler}
                        setStep={setStep}
                        tour={currentTour}
                        step={step}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                    />
                );
            case "QUESTION":
                return (
                    <Question
                        answer={currentAnswer as IQuestionAnswer}
                        tourSubmitHandler={tourSubmitHandler}
                        isFirstTour={isFirstTour}
                        isLastTour={isLastTour}
                        step={step}
                        setStep={setStep}
                        tour={currentTour}
                    />
                );
            case "ROOM":
                return (
                    <RoomList
                        answer={currentAnswer as IRoomAnswer}
                        tourSubmitHandler={tourSubmitHandler}
                        tour={currentTour}
                        step={step}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                        setStep={setStep}
                    />
                );
            case "ROOM_TABLE":
                return (
                    <RoomTable
                        roomAnswers={roomAnswers as IRoomAnswer}
                        answer={currentAnswer as IRoomTableAnswer}
                        tourSubmitHandler={tourSubmitHandler}
                        tour={currentTour}
                        step={step}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                        setStep={setStep}
                    />
                );
            case "FURNITURE":
                return (
                    <Furniture
                        roomAnswers={roomAnswers as IRoomAnswer}
                        answer={currentAnswer as IFurnitureAnswer}
                        tourSubmitHandler={tourSubmitHandler}
                        tour={currentTour}
                        step={step}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                        setStep={setStep}
                    />
                );
            case "TABLE":
                return (
                    <Table
                        answer={currentAnswer as ITableAnswer}
                        tourSubmitHandler={tourSubmitHandler}
                        tour={currentTour}
                        step={step}
                        isLastTour={isLastTour}
                        isFirstTour={isFirstTour}
                        setStep={setStep}
                    />
                );
        }
    };

    const tourBlock = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tourBlock.current) {
            const yOffset = -50; // Adjust this value to control the scroll position
            const y = tourBlock.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }, [step]);

    return (
        <section className="worksheet">
            <div className="container">
                <QuestionaryIntro percent={percent} />
                <div style={{padding: '50px 0'}} ref={tourBlock} className="worksheet__item">{renderTour()}</div>
            </div>
        </section>
    );
};

export default Questionary;
