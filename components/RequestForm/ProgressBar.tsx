import { useTranslation } from "next-i18next";

const ProgressBar = ({tour}: {tour: number}) => {
    const {t} = useTranslation()

    const percent = 100 / 5 * tour

    return (
        <>
            <h1 className="create__title">{ t("create:createTitle")}</h1>

            <div className="create__item-count">
                <span>Етап</span>
                <div className="create__item-count-num">
                    <div className="create__item-count-num create__item-count-num-target">
                        {tour >= 10 ? tour : `0${tour}`}
                    </div>
                    <div className="create__item-count-num create__item-count-num-all">
                        /05
                    </div>
                </div>
            </div>
            <div className="create__item-content-line">
                <span style={{ width: `${percent}%` }}></span>
            </div>
        </>
    );
};

export default ProgressBar;