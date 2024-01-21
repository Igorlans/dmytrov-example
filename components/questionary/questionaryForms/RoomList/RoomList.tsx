import { FC, useMemo } from "react";
import { ITourProps } from "@/types/questionary";
import { useForm } from "react-hook-form";
import QuestionaryNav from "@/components/questionary/questionaryForms/QuestionaryNav";
import { ScrollToTopOnMount } from "@/helpers/routerup";
import {
    IRoom,
    IRoomAnswer,
    IRoomAnswerItem,
    IRoomTour
} from "@/types/questionary/room";
import RoomListItem from "@/components/questionary/questionaryForms/RoomList/RoomListItem";
import FormTextarea from "@/components/UI/Textarea/FormTextarea";
import { toast } from "react-hot-toast";

const RoomList: FC<ITourProps<IRoomTour, IRoomAnswer>> = ({
                                                              answer,
                                                              tourSubmitHandler,
                                                              tour,
                                                              isLastTour,
                                                              isFirstTour,
                                                              step,
                                                              setStep
                                                          }) => {
    const rooms = tour?.rooms;

    const roomListDefaultValues: IRoomAnswer = {
        rooms: []
    };

    const persistedRoomListDefaultValues: IRoomAnswer = {
        rooms: answer?.rooms || []
    };

    const methods = useForm<IRoomAnswer>({
        mode: "onBlur",
        defaultValues: answer
            ? persistedRoomListDefaultValues
            : roomListDefaultValues
    });

    const selectedRooms = methods.watch("rooms");
    console.log(
        selectedRooms.map((item) => ({
            name: `${item.name} x ${getOrderNumber(item.id)}`,
            comment: item.comment
        }))
    );

    // const sortedSelectedRooms = useMemo(() => {
    //     // Sort items by baseId
    //     const sortedItems = selectedRooms.sort((a, b) => {
    //         const baseIdA = a.id.split("_")[0];
    //         const baseIdB = b.id.split("_")[0];
    //         return baseIdA.localeCompare(baseIdB);
    //     });
    //
    //     return sortedItems;
    // }, [selectedRooms]);

    function getOrderNumber(fullId: IRoomAnswerItem["id"]) {
        const baseId = fullId.split("_")[0];
        // Filter items by string before "_"
        const filteredItems = selectedRooms.filter(
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

    const handleAddRoom = (item: IRoom) => {
        methods.setValue("rooms", [
            ...(selectedRooms || []),
            { ...item, id: `${item.id}_${selectedRooms?.length}`, comment: "" }
        ]);
    };

    const handleDeleteRoomById = (itemId: string) => {
        methods.setValue(
            "rooms",
            selectedRooms?.filter((item) => item.id !== itemId)
        );
    };

    const handleDeleteRoomWithLargestIndex = (baseId: string) => {
        const matchingRooms = selectedRooms?.filter((item) => {
            const [currentBaseId, currentIndex] = item.id.split("_");
            return currentBaseId === baseId && currentIndex !== undefined;
        });

        if (matchingRooms && matchingRooms.length > 0) {
            const largestIndex = Math.max(
                ...matchingRooms.map((item) => parseInt(item.id.split("_")[1]))
            );

            const largestItemId = matchingRooms.find(
                (item) => parseInt(item.id.split("_")[1]) === largestIndex
            )?.id;

            if (largestItemId) {
                methods.setValue(
                    "rooms",
                    selectedRooms?.filter((item) => item.id !== largestItemId)
                );
            }
        }
    };

    return (
        <div>
            <div>
                <div className="title worksheet__item-title" style={{ marginTop: 35 }}>
                    Вибір бажаних приміщень:
                </div>
                <div className="worksheet__choise">
                    <div className="worksheet__choise-col">
                        <div className="worksheet__choise-title">Примiщеня</div>
                        <div className="worksheet__choise-text">
                            Оберiть або перетягнiть кiмнати (можно обрати
                            декiлька однакових)
                        </div>
                        <div className="worksheet__choise-items">
                            {rooms.map((item, idx) => (
                                <RoomListItem
                                    room={item}
                                    isForSelect={true}
                                    orderNum={selectedRooms.filter((item2) =>
                                        item2.id.includes(item.id)
                                    )?.length}
                                    isSelected={
                                        !!selectedRooms.find((item2) =>
                                            item2.id.includes(item.id)
                                        )
                                    }
                                    onClick={() => handleAddRoom(item)}
                                    handleDelete={() =>
                                        handleDeleteRoomWithLargestIndex(
                                            item.id
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className="worksheet__choise-col worksheet__choise-col-dec">
                        <div className="worksheet__choise-title">
                            Обранi примiщеня
                        </div>
                        <div className="worksheet__choise-text">
                            Перевiрте обранi кiмнати та залиште коменторi для
                            кожної, якщо потрiбно
                        </div>
                        {selectedRooms?.map((item, idx) => (
                            <RoomListItem
                                room={item}
                                isForSelect={false}
                                orderNum={getOrderNumber(item.id)}
                                isSelected={
                                    !!selectedRooms.find(
                                        (item2) => item2.id === item.id
                                    )
                                }
                                onClick={() => handleDeleteRoomById(item.id)}
                                handleDelete={() =>
                                    handleDeleteRoomById(item.id)
                                }
                            />
                        ))}
                    </div>
                    <div className="worksheet__choise-col">
                        <div className="worksheet__choise-title">Коментарi</div>
                        <div className="worksheet__choise-text">
                            Для кого/чого призначене приміщення, або ж інші
                            побажання?
                        </div>
                        {selectedRooms.map((item, idx) => (
                            <FormTextarea
                                name={`rooms.${idx}.comment`}
                                style={{ minHeight: 100 }}
                                control={methods.control}
                                label={`${item.name}${
                                    getOrderNumber(item.id) !== 1
                                        ? ` x${getOrderNumber(item.id)}`
                                        : ""
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <QuestionaryNav
                isFirstTour={isFirstTour}
                isLastTour={isLastTour}
                step={step}
                setStep={setStep}
                handleSubmit={methods.handleSubmit((data) => {
                    if (!selectedRooms.length)
                        return toast.error("Виберіть хоча б одне приміщення");
                    tourSubmitHandler({ ...tour, answers: data });
                })}
            />
        </div>
    );
};

export default RoomList;
