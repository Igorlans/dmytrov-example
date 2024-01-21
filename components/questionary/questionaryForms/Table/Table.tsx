import { FC, useEffect } from "react";
import { ITourProps } from "@/types/questionary";
import { useForm } from "react-hook-form";
import QuestionaryNav from "@/components/questionary/questionaryForms/QuestionaryNav";
import { ScrollToTopOnMount } from "@/helpers/routerup";
import {
    ITableAnswer,
    ITableOption,
    ITableTour
} from "@/types/questionary/table";
import FormTextarea from "@/components/UI/Textarea/FormTextarea";
import { toast } from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";

const Table: FC<ITourProps<ITableTour, ITableAnswer>> = ({
                                                             answer,
                                                             tourSubmitHandler,
                                                             tour,
                                                             isLastTour,
                                                             isFirstTour,
                                                             step,
                                                             setStep
                                                         }) => {
    const defaultTableValues = {
        comment: "",
        options: []
    };

    const defaultValues = answer || defaultTableValues;

    const methods = useForm<ITableAnswer>({
        mode: "onBlur",
        defaultValues: defaultValues
    });

    useEffect(() => {
        methods.reset(defaultValues);
    }, [step]);
    const handleAddOption = (option: ITableOption) => {
        const newOptions = [...methods.watch("options"), option];
        methods.setValue("options", newOptions);
    };

    const handleRemoveOption = (optionId: ITableOption["id"]) => {
        const newOptions = methods
            .watch("options")
            .filter((item) => item.id !== optionId);
        methods.setValue("options", newOptions);
    };

    const handleOptionClick = (option: ITableOption) => {
        const isPresent = methods
            .watch("options")
            ?.some((item) => item.id === option.id);

        isPresent ? handleRemoveOption(option.id) : handleAddOption(option);
    };

    console.log("OPTIONS", tour.TableOption);

    return (
        <div>
            <ScrollToTopOnMount />
            <div>
                <div>
                    <div className="title worksheet__item-title">
                        {tour.text}
                    </div>
                    <div className="worksheet__item-subtitle">
                        Виберіть одну чи кілька опцій
                    </div>
                    <div className="worksheet__option-items">
                        {tour.TableOption?.map((item) => (
                            <div
                                className={
                                    methods
                                        .watch("options")
                                        ?.some(
                                            (option) => option.id === item?.id
                                        )
                                        ? "worksheet__option-item worksheet__option-item--active"
                                        : "worksheet__option-item"
                                }
                                key={item.id}
                                onClick={() => handleOptionClick(item)}
                            >
                                <img
                                    className="worksheet__option-img"
                                    src={item.image.url}
                                    alt=""
                                />

                                {item?.articleUrl
                                    ?
                                    <a onClick={(e) => e.stopPropagation()} href={item.articleUrl}
                                       target={"_blank"}
                                       style={{ position: "relative", color: "#000", display: "block" }}
                                       className="worksheet__option-title">
                                        {item.text}
                                        <span className={"link-icon"}>
                                            <HiOutlineExternalLink style={{ marginLeft: 8 }} />
                                        </span>
                                    </a>
                                    :
                                    <div className="worksheet__option-title">
                                        {item.text}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="aside-popup__form-item">
                        <FormTextarea
                            name={"comment"}
                            style={{ minHeight: 170 }}
                            control={methods.control}
                            placeholder={tour?.hint || "Побажання або рекомендації"}
                            label={"Коментар"}
                        />
                    </div>
                </div>
                <QuestionaryNav
                    isFirstTour={isFirstTour}
                    isLastTour={isLastTour}
                    step={step}
                    setStep={setStep}
                    handleSubmit={methods.handleSubmit((data) => {
                        try {
                            if (!data.options.length) throw new Error();
                            tourSubmitHandler({ ...tour, answers: data });
                        } catch (e) {
                            toast.error("Виберіть хоча б одну опцію");
                        }
                    })}
                />
            </div>
        </div>
    );
};

export default Table;
