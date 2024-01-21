import { FC } from "react";
import { useTranslation } from "next-i18next";

interface IFormNavProps {
    isFirstTour: boolean;
    isLastTour: boolean;
    handleBack: () => void;
    handleSubmit: () => void;
}

const FormNavigation: FC<IFormNavProps> = ({
                                                      isFirstTour,
                                                      isLastTour,
                                                      handleSubmit,
    handleBack
                                                  }) => {

    const {t} = useTranslation()

    return (
        <div
            style={{
                justifyContent: isFirstTour ? "flex-end" : "space-between"
            }}
            className="create__item-btns worksheet__btns"
        >
            {!isFirstTour && (
                <div
                    className="button create__item-btn create__item-btn-prev"
                    onClick={handleBack}
                >
                    {t('common:prevStepButton')}
                </div>
            )}


            <div
                className="button create__item-btn create__item-btn-next"
                onClick={handleSubmit}
            >
                {isLastTour ? t('common:createOrder') : t('common:nextStepButton')}
            </div>
        </div>
    );
};

export default FormNavigation;
