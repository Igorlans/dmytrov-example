import QuestionaryProgressBar from "@/components/questionary/QuestionaryIntro/QuestionaryProgressBar";
import { FC } from "react";
import Image from "next/image";

interface IQuestionaryIntroProps {
    percent: string;
}

const QuestionaryIntro: FC<IQuestionaryIntroProps> = ({ percent }) => {
    return (
        <div className="worksheet__top">
            <div className="worksheet__top-box">
                <h1 className="worksheet__top-title">Заповнення анкети</h1>
                <p className="worksheet__top-text">
                    Власна розроблена система онлайн анкетування, завдяки якій
                    ми не пропускаємо жодного побажання клієнта.
                </p>
                <QuestionaryProgressBar percent={percent} />
            </div>
            <div className="worksheet__top-image">
                {/*<Image src={'/assets/bg.jpg'} alt={'intro image'} fill />*/}
            </div>
        </div>
    );
};

export default QuestionaryIntro;
