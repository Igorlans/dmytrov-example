import { FC } from "react";
import Link from "next/link";

interface IQuestionaryNavProps {
    isFirstTour: boolean;
    isLastTour: boolean;
    step: number;
    setStep: (value: number) => void;
    handleSubmit: () => void;
}

const QuestionaryNav: FC<IQuestionaryNavProps> = ({
                                                      step,
                                                      setStep,
                                                      isFirstTour,
                                                      isLastTour,
                                                      handleSubmit
                                                  }) => {
    return (
        <div
            style={{
                justifyContent: isFirstTour ? "flex-end" : "space-between",
                marginTop: 20
            }}
            className="create__item-btns worksheet__btns"
        >
            {!isFirstTour && (
                <div
                    className="button create__item-btn create__item-btn-prev"
                    onClick={() => setStep(step - 1)}
                >
                    Назад
                </div>
            )}
            {!isFirstTour && (
                <Link
                    className="button create__item-btn create__item-btn-med"
                    href="/"
                >
                    Продовжити пізніше
                </Link>
            )}

            <div
                className="button create__item-btn create__item-btn-next"
                onClick={handleSubmit}
            >
                {isLastTour ? "Завершити" : "Далі"}
            </div>
        </div>
    );
};

export default QuestionaryNav;
