import { FC } from "react";
import { ITourPropsWithRoomAnswers } from "@/types/questionary";
import { useForm } from "react-hook-form";
import QuestionaryNav from "@/components/questionary/questionaryForms/QuestionaryNav";
import {
    IFurnitureAnswer,
    IFurnitureAnswerItem,
    IFurnitureTour,
    IRoomAnswerItem,
    IRoomFurniture
} from "@/types/questionary/room";
import FormTextarea from "@/components/UI/Textarea/FormTextarea";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";
import { log } from "util";

interface IGroupedFurniture {
    [roomId: string]: IFurnitureAnswerItem[];
}

const titleStyles = {
    fontSize: 24,
    lineHeight: "150%",
    color: "#353535",
    marginBottom: 11,
    fontFamily: "Raleway, sans-serif",
    fontWeight: 700
};

const Furniture: FC<
    ITourPropsWithRoomAnswers<IFurnitureTour, IFurnitureAnswer>
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
    const defaultValues = answer ? answer : { furniture: [] };

    const methods = useForm<IFurnitureAnswer>({
        mode: "onBlur",
        defaultValues: defaultValues
    });

    const filteredRoomAnswers = roomAnswers?.rooms?.filter(
        (room) => room.RoomFurniture?.length
    );

    console.log(filteredRoomAnswers, "room");
    const groupedFurniture: IGroupedFurniture = methods
        .watch("furniture")
        .reduce((result, furniture) => {
            const { roomId } = furniture;
            if (!result[roomId]) {
                result[roomId] = [];
            }
            result[roomId].push(furniture);
            return result;
        }, {} as IGroupedFurniture);

    console.log("VALUES ======", methods.watch());

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

    const handleAddFurniture = (
        newFurniture: IRoomFurniture,
        room: IRoomAnswerItem
    ) => {
        const newItem: IFurnitureAnswerItem = {
            ...newFurniture,
            comment: "",
            roomName: room.name,
            roomId: room.id
        };
        const newFurnitureArr = [...methods.watch("furniture"), newItem];
        methods.setValue("furniture", newFurnitureArr);
    };

    function reverseGroupedFurniture(
        groupedFurniture: IGroupedFurniture
    ): IFurnitureAnswerItem[] {
        const reversedFurniture: IFurnitureAnswerItem[] = [];

        Object.values(groupedFurniture).forEach((furnitureList) => {
            reversedFurniture.push(...furnitureList);
        });

        return reversedFurniture;
    }

    const handleRemoveFurniture = (
        furnitureId: IRoomFurniture["id"],
        roomId: string
    ) => {
        const newGroupedItems = groupedFurniture[roomId]?.filter(
            (fur) => fur.id !== furnitureId
        );
        const newGroupedFurniture: IGroupedFurniture = {
            ...groupedFurniture,
            [roomId]: newGroupedItems
        };

        const newFurniture = reverseGroupedFurniture(newGroupedFurniture);

        methods.setValue("furniture", newFurniture);
    };

    const handleItemClick = (
        newFurniture: IRoomFurniture,
        room: IRoomAnswerItem
    ) => {
        const itemId = newFurniture.id;
        const isPresent = groupedFurniture[room.id]?.some(
            (fur) => fur.id === itemId
        );

        isPresent
            ? handleRemoveFurniture(itemId, room.id)
            : handleAddFurniture(newFurniture, room);
    };

    return (
        <div>
            <div className="worksheet__choise-title worksheet__choise-title-mob ">
                Вибір наповнення приміщення:
            </div>
            <div className="title worksheet__item-title">
                Вибір наповнення приміщення:
            </div>

            <div className="worksheet__choise worksheet__choise-2">
                <div className="worksheet__choise-col worksheet__choise-col-rdec">
                    <div className="worksheet__choise-title">Приміщення</div>

                    {filteredRoomAnswers?.map((room) => (
                        <div>
                            <div className="worksheet__choise-title">
                                {`${room?.name}${
                                    getOrderNumber(room?.id) !== 1
                                        ? ` x${getOrderNumber(room?.id)}`
                                        : ""
                                }`}
                            </div>

                            <div className="worksheet__choise-title worksheet__choise-title-dec">
                                <svg
                                    width="30"
                                    height="22"
                                    viewBox="0 0 30 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M29.0625 16.1562H28.5938V12.4062C28.5931 11.9092 28.3953 11.4326 28.0439 11.0811C27.6924 10.7297 27.2158 10.5319 26.7188 10.5312V2.5625C26.7181 2.06542 26.5203 1.58888 26.1689 1.23739C25.8174 0.885904 25.3408 0.688151 24.8438 0.6875H5.15625C4.65917 0.688151 4.18263 0.885904 3.83114 1.23739C3.47965 1.58888 3.2819 2.06542 3.28125 2.5625V10.5312C2.78417 10.5319 2.30763 10.7297 1.95614 11.0811C1.60465 11.4326 1.4069 11.9092 1.40625 12.4062V16.1562H0.9375C0.81318 16.1562 0.693951 16.2056 0.606044 16.2935C0.518136 16.3815 0.46875 16.5007 0.46875 16.625V18.5C0.46875 18.6243 0.518136 18.7435 0.606044 18.8315C0.693951 18.9194 0.81318 18.9688 0.9375 18.9688H1.40625V20.8438C1.40625 20.9681 1.45564 21.0873 1.54354 21.1752C1.63145 21.2631 1.75068 21.3125 1.875 21.3125H3.28125C3.38959 21.3126 3.49459 21.275 3.57836 21.2063C3.66213 21.1376 3.71947 21.042 3.74062 20.9357L4.13437 18.9688H25.8656L26.2594 20.9357C26.2805 21.042 26.3379 21.1376 26.4216 21.2063C26.5054 21.275 26.6104 21.3126 26.7188 21.3125H28.125C28.2493 21.3125 28.3685 21.2631 28.4565 21.1752C28.5444 21.0873 28.5938 20.9681 28.5938 20.8438V18.9688H29.0625C29.1868 18.9688 29.306 18.9194 29.394 18.8315C29.4819 18.7435 29.5312 18.6243 29.5312 18.5V16.625C29.5312 16.5007 29.4819 16.3815 29.394 16.2935C29.306 16.2056 29.1868 16.1562 29.0625 16.1562ZM4.21875 2.5625C4.21908 2.31396 4.31795 2.07569 4.4937 1.89995C4.66944 1.7242 4.90771 1.62533 5.15625 1.625H24.8438C25.0923 1.62533 25.3306 1.7242 25.5063 1.89995C25.682 2.07569 25.7809 2.31396 25.7812 2.5625V10.5312H24.8438V8.65625C24.8431 8.15917 24.6453 7.68263 24.2939 7.33114C23.9424 6.97965 23.4658 6.7819 22.9688 6.78125H17.3438C16.8467 6.7819 16.3701 6.97965 16.0186 7.33114C15.6672 7.68263 15.4694 8.15917 15.4688 8.65625V10.5312H14.5312V8.65625C14.5306 8.15917 14.3328 7.68263 13.9814 7.33114C13.6299 6.97965 13.1533 6.7819 12.6562 6.78125H7.03125C6.53417 6.7819 6.05763 6.97965 5.70614 7.33114C5.35465 7.68263 5.1569 8.15917 5.15625 8.65625V10.5312H4.21875V2.5625ZM23.9062 8.65625V10.5312H16.4062V8.65625C16.4066 8.40771 16.5055 8.16944 16.6812 7.9937C16.8569 7.81795 17.0952 7.71908 17.3438 7.71875H22.9688C23.2173 7.71908 23.4556 7.81795 23.6313 7.9937C23.807 8.16944 23.9059 8.40771 23.9062 8.65625ZM13.5938 8.65625V10.5312H6.09375V8.65625C6.09408 8.40771 6.19295 8.16944 6.3687 7.9937C6.54444 7.81795 6.78271 7.71908 7.03125 7.71875H12.6562C12.9048 7.71908 13.1431 7.81795 13.3188 7.9937C13.4945 8.16944 13.5934 8.40771 13.5938 8.65625ZM2.34375 12.4062C2.34408 12.1577 2.44295 11.9194 2.6187 11.7437C2.79444 11.568 3.03271 11.4691 3.28125 11.4688H26.7188C26.9673 11.4691 27.2056 11.568 27.3813 11.7437C27.557 11.9194 27.6559 12.1577 27.6562 12.4062V16.1562H2.34375V12.4062ZM2.89687 20.375H2.34375V18.9688H3.17813L2.89687 20.375ZM27.6562 20.375H27.1031L26.8219 18.9688H27.6562V20.375ZM28.5938 18.0312H1.40625V17.0938H28.5938V18.0312Z"
                                        fill="#353535"
                                    />
                                </svg>
                                {`${room?.name}${
                                    getOrderNumber(room?.id) !== 1
                                        ? ` x${getOrderNumber(room?.id)}`
                                        : ""
                                }`}
                            </div>
                            <div
                                style={{ margin: "15px 0" }}
                                className="worksheet__flor-items"
                            >
                                {room.RoomFurniture?.map((fur) => (
                                    <div
                                        className={
                                            methods
                                                .watch("furniture")
                                                .some(
                                                    (item) =>
                                                        item.id === fur.id &&
                                                        groupedFurniture[
                                                            room.id
                                                            ]?.some(
                                                            (furnit) =>
                                                                furnit.id ===
                                                                item.id
                                                        )
                                                )
                                                ? "worksheet__flor-item worksheet__flor-item--active"
                                                : "worksheet__flor-item"
                                        }
                                        key={fur.id}
                                        onClick={() =>
                                            handleItemClick(fur, room)
                                        }
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                width: 90,
                                                height: 90
                                            }}
                                            className="worksheet__flor-img"
                                        >
                                            <Image
                                                src={fur?.image?.url || ""}
                                                alt={fur.name}
                                                fill
                                            />
                                        </div>
                                        {fur?.articleUrl
                                            ?
                                            <a onClick={(e) => e.stopPropagation()} href={fur.articleUrl}
                                               target={"_blank"}
                                               style={{ position: "relative", color: "#000" }}
                                               className="worksheet__flor-title">
                                                {fur.name}
                                                <span className={"link-icon"}>
                                                    <HiOutlineExternalLink style={{ marginLeft: 8 }} />
                                                </span>
                                            </a>
                                            :
                                            <div className="worksheet__flor-title">
                                                {fur.name}
                                            </div>
                                        }
                                        <div className="worksheet__flor-check">
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
                                <div
                                    className={
                                        methods
                                            .watch("furniture")
                                            .some(
                                                (item) =>
                                                    item.id === "other" &&
                                                    groupedFurniture[
                                                        room.id
                                                        ]?.some(
                                                        (furnit) =>
                                                            furnit.id ===
                                                            item.id
                                                    )
                                            )
                                            ? "worksheet__flor-item worksheet__flor-item--active"
                                            : "worksheet__flor-item"
                                    }
                                    onClick={() =>
                                        handleItemClick(
                                            {
                                                id: "other",
                                                name: "Інше",
                                                hint: "Інше",
                                                image: null
                                            },
                                            room
                                        )
                                    }
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            width: 90,
                                            height: 90
                                        }}
                                        className="worksheet__flor-img"
                                    >
                                        <Image
                                            src={
                                                "/assets/images/worksheet-img/pick7.svg"
                                            }
                                            alt={"other"}
                                            fill
                                        />
                                    </div>
                                    <div className="worksheet__flor-title">
                                        Інше
                                    </div>
                                    <div className="worksheet__flor-check">
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
                            </div>
                        </div>
                    ))}
                </div>
                <div className="worksheet__choise-col">
                    <div className="worksheet__choise-title">Коментарi</div>
                    {Object.entries(groupedFurniture)?.map(
                        ([roomId, furniture]) => (
                            <div>
                                <div style={titleStyles}>
                                    {`${furniture[0].roomName}${
                                        getOrderNumber(furniture[0]?.roomId) !== 1
                                            ? ` x${getOrderNumber(furniture[0]?.roomId)}`
                                            : ""
                                    }`}
                                </div>
                                {furniture?.map((fur) => (
                                    <div
                                        className="aside-popup__form-item"
                                        key={fur.id}
                                    >
                                        <FormTextarea
                                            name={`furniture.${methods
                                                .watch("furniture")
                                                .findIndex(
                                                    (furnit) =>
                                                        furnit.id === fur.id &&
                                                        furnit.roomId ===
                                                        fur.roomId
                                                )}.comment`}
                                            control={methods.control}
                                            style={{ minHeight: 100 }}
                                            label={fur.name as any}
                                            placeholder={fur?.hint || ""}
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
            <QuestionaryNav
                isFirstTour={isFirstTour}
                isLastTour={isLastTour}
                step={step}
                setStep={setStep}
                handleSubmit={methods.handleSubmit((data) =>
                    tourSubmitHandler({ ...tour, answers: data })
                )}
            />
        </div>
    );
};

export default Furniture;
