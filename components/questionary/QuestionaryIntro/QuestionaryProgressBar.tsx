import { FC } from "react";

interface IQuestionaryProgressBarProps {
    percent: string;
}

const QuestionaryProgressBar: FC<IQuestionaryProgressBarProps> = ({
    percent,
}) => {
    return (
        <>
            <div className="worksheet__top-progress">
                <span>Заповнено на</span>
                <div>{percent}%</div>
            </div>
            <div className="account__item-box-line">
                <span style={{ width: `${Number(percent)}%` }}></span>
            </div>
        </>
    );
};

export default QuestionaryProgressBar;
