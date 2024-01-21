import { FC, useEffect } from "react";
import { ITourPropsWithRoomAnswers } from "@/types/questionary";
import { Path, useFieldArray, useForm } from "react-hook-form";
import QuestionaryNav from "@/components/questionary/questionaryForms/QuestionaryNav";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
    IRoomTableAnswer,
    IRoomTableAnswerItem,
    IRoomTableTour, ITableOption
} from "@/types/questionary/table";
import Image from "next/image";
import FormInput from "@/components/UI/Input/FormInput";
import { toast } from "react-hot-toast";
import { IRoomAnswerItem } from "@/types/questionary/room";

const RoomTable: FC<
    ITourPropsWithRoomAnswers<IRoomTableTour, IRoomTableAnswer>
> = ({
         roomAnswers,
         answer,
         tourSubmitHandler,
         tour,
         isLastTour,
         isFirstTour,
         setStep,
         step
     }) => {
    const defaultPicks: IRoomTableAnswerItem[] = roomAnswers.rooms.map(
        (room) => ({ room, option: { comment: "", options: [] } })
    );

    const newDefaultPicks = defaultPicks.filter((item) => {
        const newItem = answer?.picks?.find(
            (pick) => pick?.room?.id === item?.room.id
        );
        if (newItem) {
            return false;
        } else {
            return true;
        }
    });

    console.log("NEW ITEMS", newDefaultPicks);

    const roomTableDefaultValues = {
        picks: [...defaultPicks]
    };

    const persistedDefaultValues: IRoomTableAnswer = {
        picks: answer?.picks
            ? [...answer?.picks, ...newDefaultPicks]
            : defaultPicks
    };

    console.log("PERSISTED", persistedDefaultValues);

    const defaultValues = answer
        ? persistedDefaultValues
        : roomTableDefaultValues;

    const methods = useForm<IRoomTableAnswer>({
        mode: "onBlur",
        defaultValues: defaultValues
    });

    const { fields: picks, update } = useFieldArray({
        control: methods.control,
        name: "picks"
    });

    useEffect(() => {
        methods.reset(defaultValues);
    }, [step]);


    const removeCheckbox = (name: Path<IRoomTableAnswer>, id: string) => {
        const options: ITableOption[] = methods.watch(name);
        const filteredOptions = options?.filter(option => option.id !== id);
        methods.setValue(name, filteredOptions);
    };

    const addCheckbox = (name: Path<IRoomTableAnswer>, item: ITableOption) => {
        const options: ITableOption[] = methods.watch(name);
        const newOptions = [...options, item];
        methods.setValue(name, newOptions);
    };

    const handleCheckboxClick = (name: Path<IRoomTableAnswer>, item: ITableOption) => {
        const isSelected = methods.watch(name)?.some((option: ITableOption) => option.id === item.id);
        isSelected ? removeCheckbox(name, item.id) : addCheckbox(name, item);
    };

    function getOrderNumber(fullId: IRoomAnswerItem["id"]) {
        const baseId = fullId.split("_")[0];
        // Filter items by string before "_"
        const filteredItems = roomAnswers.rooms.filter(
            (item) => item.id.split("_")[0] === baseId
        );

        // Sort filtered items asc by string after "_"
        const sortedItems = filteredItems.sort((a, b) => {
            const [_, numberA] = a.id.split("_");
            const [__, numberB] = b.id.split("_");
            return parseInt(numberA, 10) - parseInt(numberB, 10);
        });

        // Find the index of the item with the given full ID within the filtered and sorted items
        const index = sortedItems.findIndex((item) => item.id === fullId);

        // Return the order number (index + 1) if found, otherwise return null
        const orderNumber = index !== -1 ? index + 1 : null;
        return orderNumber || undefined;
    }

    console.log("VALUES =====", methods.watch());
    console.log("ERRORS =====", methods.formState.errors);

    return (
        <div>
            <div className="worksheet__pick">
                <div className="worksheet__item-subtitle">
                    Таблиця вибору:
                </div>
                <div className="title worksheet__item-title">{tour?.text}</div>
                <div className="worksheet__pick-top">
                    <div className="worksheet__pick-top-items">
                        <div className="worksheet__pick-top-item"></div>
                        {tour?.TableOption?.map((item) => (
                            <div
                                className="worksheet__pick-top-item"
                                key={item.id}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        height: 160,
                                        maxWidth: 160
                                    }}
                                >
                                    <Image
                                        src={
                                            item?.image?.url ||
                                            "/assets/images/worksheet-img/pick7.svg"
                                        }
                                        alt={"other"}
                                        fill
                                    />
                                </div>
                                {item?.articleUrl
                                    ?
                                    <a href={item.articleUrl} target={"_blank"}
                                       style={{ position: "relative", color: "#000" }}
                                       className="worksheet__pick-top-item-title">
                                        {item.text}
                                        <div className={"link-icon"}>
                                            <HiOutlineExternalLink />
                                        </div>
                                    </a>
                                    :
                                    <div className="worksheet__pick-top-item-title">
                                        {item.text}
                                    </div>
                                }

                            </div>
                        ))}
                        <div className="worksheet__pick-top-item last">
                            <div
                                style={{
                                    position: "relative",
                                    height: 160,
                                    width: 160
                                }}
                            >
                                <Image
                                    src={
                                        "/assets/images/worksheet-img/pick7.svg"
                                    }
                                    alt={"other"}
                                    fill
                                />
                            </div>
                            <div className="worksheet__pick-top-item-title">
                                Iнший варіант
                            </div>
                        </div>
                    </div>
                </div>
                <div className="worksheet__pick-choise">
                    {picks?.map((pick, pickIndex) => (
                        <div
                            className="worksheet__pick-item"
                            key={pick.room.id}
                        >
                            <div className="worksheet__pick-item-box">
                                <div
                                    style={{
                                        position: "relative",
                                        height: 30,
                                        width: 30
                                    }}
                                >
                                    <Image
                                        src={
                                            pick.room?.image?.url ||
                                            "/assets/images/worksheet-img/pick7.svg"
                                        }
                                        alt={pick.room.name}
                                        fill
                                    />
                                </div>
                                <div className="worksheet__pick-item-title">
                                    {`${pick?.room?.name}${
                                        getOrderNumber(pick?.room?.id) !== 1
                                            ? ` x${getOrderNumber(pick?.room?.id)}`
                                            : ""
                                    }`}
                                </div>
                            </div>
                            <div className="worksheet__pick-item-box">
                                <div className="worksheet__pick-item-checks">
                                    {tour.TableOption?.map((item, index) => (
                                        <div
                                            className={
                                                methods.watch(
                                                    `picks.${pickIndex}.option.options`
                                                )?.some(option => option.id === item.id)
                                                    ? "worksheet__pick-item-check worksheet__pick-item-check--active"
                                                    : "worksheet__pick-item-check"
                                            }
                                            key={item.id}
                                            onClick={() => handleCheckboxClick(`picks.${pickIndex}.option.options`, item)}
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M1.27321 2.74809C7.94729e-08 4.50053 0 7.00036 0 12C0 16.9996 7.94729e-08 19.4995 1.27321 21.2519C1.68441 21.8179 2.18213 22.3156 2.74809 22.7268C4.50053 24 7.00036 24 12 24C16.9996 24 19.4995 24 21.2519 22.7268C21.8179 22.3156 22.3156 21.8179 22.7268 21.2519C24 19.4995 24 16.9996 24 12C24 7.00036 24 4.50053 22.7268 2.74809C22.3156 2.18213 21.8179 1.68441 21.2519 1.27321C19.4995 7.94729e-08 16.9996 0 12 0C7.00036 0 4.50053 7.94729e-08 2.74809 1.27321C2.18213 1.68441 1.68441 2.18213 1.27321 2.74809ZM19.4117 8.66703C19.7801 8.25556 19.7452 7.62336 19.3337 7.25497C18.9223 6.88657 18.29 6.92151 17.9216 7.33297L13.4295 12.3505C12.5192 13.3672 11.9061 14.0484 11.382 14.4889C10.8828 14.9085 10.5895 15 10.3333 15C10.0772 15 9.78387 14.9085 9.28464 14.4889C8.76053 14.0484 8.14752 13.3672 7.23725 12.3505L6.07836 11.0561C5.70997 10.6447 5.07777 10.6097 4.66631 10.9781C4.25484 11.3465 4.21991 11.9787 4.58831 12.3901L5.79671 13.7399C6.64449 14.6869 7.35165 15.4768 7.9978 16.0199C8.68132 16.5944 9.41853 17 10.3333 17C11.2481 17 11.9853 16.5944 12.6688 16.0199C13.3151 15.4768 14.0221 14.6869 14.87 13.7399L19.4117 8.66703Z"
                                                    fill="#E55733"
                                                />
                                            </svg>
                                            <span></span>
                                        </div>

                                    ))}

                                </div>
                            </div>
                            <div className="worksheet__pick-item-box worksheet__pick-item-box-input">
                                <FormInput
                                    name={`picks.${pickIndex}.option.comment`}
                                    control={methods.control}
                                    label={"Матеріал / Коментар"}
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="worksheet__pick-mob">
                    {picks.map((pick, pickIndex) => (
                        <div className="worksheet__cocon" key={pick.id}>
                            <div className="worksheet__cocon-title-box">
                                <div
                                    style={{
                                        position: "relative",
                                        height: 30,
                                        width: 30,
                                        marginRight: 20
                                    }}
                                >
                                    <Image
                                        src={
                                            pick.room?.image?.url ||
                                            "/assets/images/worksheet-img/pick7.svg"
                                        }
                                        alt={pick.room.name}
                                        fill
                                    />
                                </div>
                                <h3 className="worksheet__cocon-title">
                                    {`${pick?.room?.name}${
                                        getOrderNumber(pick?.room?.id) !== 1
                                            ? ` x${getOrderNumber(pick?.room?.id)}`
                                            : ""
                                    }`}
                                </h3>
                            </div>
                            <div className="worksheet__cocon-list">
                                {tour.TableOption?.map((item) => (
                                    <div
                                        className={
                                            methods.watch(
                                                `picks.${pickIndex}.option.options`
                                            )?.some(option => option.id === item.id)
                                                ? "worksheet__cocon-item worksheet__cocon-item--active"
                                                : "worksheet__cocon-item"
                                        }
                                        key={item.id}
                                        onClick={() => handleCheckboxClick(`picks.${pickIndex}.option.options`, item)}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                width: 50,
                                                height: 50
                                            }}
                                            className="worksheet__cocon-item-img"
                                        >
                                            <Image
                                                src={
                                                    item.image?.url ||
                                                    "/assets/images/worksheet-img/pick7.svg"
                                                }
                                                alt={item.text}
                                                fill
                                            />
                                        </div>

                                        {item?.articleUrl
                                            ?
                                            <a onClick={(e) => e.stopPropagation()} href={item.articleUrl}
                                               target={"_blank"}
                                               style={{ position: "relative", color: "#000" }}
                                               className="worksheet__cocon-item-title">
                                                {item.text}
                                                <span className={"link-icon"}>
                                                    <HiOutlineExternalLink style={{ marginLeft: 8 }} />
                                                </span>
                                            </a>
                                            :
                                            <div className="worksheet__cocon-item-title">
                                                {item.text}
                                            </div>
                                        }
                                        <div className="worksheet__cocon-item-check">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M1.27321 2.74809C7.94729e-08 4.50053 0 7.00036 0 12C0 16.9996 7.94729e-08 19.4995 1.27321 21.2519C1.68441 21.8179 2.18213 22.3156 2.74809 22.7268C4.50053 24 7.00036 24 12 24C16.9996 24 19.4995 24 21.2519 22.7268C21.8179 22.3156 22.3156 21.8179 22.7268 21.2519C24 19.4995 24 16.9996 24 12C24 7.00036 24 4.50053 22.7268 2.74809C22.3156 2.18213 21.8179 1.68441 21.2519 1.27321C19.4995 7.94729e-08 16.9996 0 12 0C7.00036 0 4.50053 7.94729e-08 2.74809 1.27321C2.18213 1.68441 1.68441 2.18213 1.27321 2.74809ZM19.4117 8.66703C19.7801 8.25556 19.7452 7.62336 19.3337 7.25497C18.9223 6.88657 18.29 6.92151 17.9216 7.33297L13.4295 12.3505C12.5192 13.3672 11.9061 14.0484 11.382 14.4889C10.8828 14.9085 10.5895 15 10.3333 15C10.0772 15 9.78387 14.9085 9.28464 14.4889C8.76053 14.0484 8.14752 13.3672 7.23725 12.3505L6.07836 11.0561C5.70997 10.6447 5.07777 10.6097 4.66631 10.9781C4.25484 11.3465 4.21991 11.9787 4.58831 12.3901L5.79671 13.7399C6.64449 14.6869 7.35165 15.4768 7.9978 16.0199C8.68132 16.5944 9.41853 17 10.3333 17C11.2481 17 11.9853 16.5944 12.6688 16.0199C13.3151 15.4768 14.0221 14.6869 14.87 13.7399L19.4117 8.66703Z"
                                                    fill="#E55733"
                                                />
                                            </svg>
                                            <span></span>
                                        </div>
                                    </div>
                                ))}
                                <div className="aside-popup__form-box">
                                    <div
                                        style={{
                                            position: "relative",
                                            width: 54,
                                            height: 46,
                                            borderRadius: "15px 0px 0px 15px",
                                            overflow: "hidden"

                                        }}
                                        className="aside-popup__form-img"
                                    >
                                        <Image
                                            src={
                                                "/assets/images/worksheet-img/pick7.svg"
                                            }
                                            alt={"інше"}
                                            objectFit="cover"
                                            fill
                                        />
                                    </div>
                                    <div className="aside-popup__form-item aside-popup__form-item-95">
                                        <FormInput
                                            defaultValue={""}
                                            name={`picks.${pickIndex}.option.comment`}
                                            control={methods.control}
                                            label={"Матеріал / Коментар"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <QuestionaryNav
                isFirstTour={isFirstTour}
                isLastTour={isLastTour}
                step={step}
                setStep={setStep}
                handleSubmit={methods.handleSubmit((data) => {
                    try {
                        data.picks?.forEach((pick) => {
                            if (
                                !pick.option?.comment && !pick.option?.options.length
                            )
                                throw new Error();
                        });
                        tourSubmitHandler({ ...tour, answers: data });
                    } catch (e) {
                        toast.error("Заповніть всі поля");
                    }
                })}
            />
        </div>
    );
};

export default RoomTable;
