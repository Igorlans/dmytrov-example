import { FC, useState } from "react";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";

type PropsType = {
    item: {
        title: string;
        descr: string,
    };
    line: boolean;
};

export const QuestionItem: FC<PropsType> = ({ item, line }) => {
    const [open, setOpen] = useState<boolean>(false);
    const dbTranslate = useDynamicTranslate()

    const handleOpen = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    return (
        <div
            className={
                open ? "questions__item questions__item--active" : "questions__item"
            }
            onClick={() => handleOpen()}
        >
            <div
                className={
                    open
                        ? "questions__item-line questions__item-line--active"
                        : "questions__item-line"
                }
            >
                <h3 className="questions__item-title">{dbTranslate(item, 'title')}</h3>
            </div>
            {!line ? (
                <div className="questions__item-list">
                    <div className="questions__grid">
                        <div className="question_item" style={{ wordBreak: "break-word" }}
                             dangerouslySetInnerHTML={{ __html: dbTranslate(item, 'descr') }}>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="questions__item-text-box">
                    <p className="questions__item-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aperiam quisquam laboriosam
                        harum, expedita unde saepe? Earum amet magnam non ducimus, sunt quos laudantium harum, deserunt,
                        error neque cum corrupti!
                    </p>
                </div>
            )}
        </div>
    );
};
