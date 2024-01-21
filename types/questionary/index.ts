import {
    IResidentInfoTour,
    IResidentInfoTourAnswer
} from "@/types/questionary/residentInfo";
import {
    IQuestionTour,
    IQuestionTourAnswer
} from "@/types/questionary/question";
import {
    IFurnitureTour,
    IFurnitureTourAnswer,
    IRoom,
    IRoomAnswer,
    IRoomTour,
    IRoomTourAnswer
} from "@/types/questionary/room";
import {
    IRoomTableTour,
    IRoomTableTourAnswer,
    ITableTour,
    ITableTourAnswer
} from "@/types/questionary/table";

export interface ITourProps<T, A> {
    isFirstTour: boolean;
    isLastTour: boolean;
    step: number;
    answer: A;
    setStep: (step: number) => void;
    tourSubmitHandler: (answer: any) => void;
    tour: T;
}

export interface ITourPropsWithRoomAnswers<T, A> extends ITourProps<T, A> {
    roomAnswers: IRoomAnswer;
}

export type ITourAnswer =
    | IQuestionTourAnswer
    | IResidentInfoTourAnswer
    | IRoomTourAnswer
    | IRoomTableTourAnswer
    | IFurnitureTourAnswer
    | ITableTourAnswer;

export type ITour =
    | ITableTour
    | IRoomTableTour
    | IQuestionTour
    | IResidentInfoTour
    | IFurnitureTour
    | IRoomTour;

export interface IQuestionaryPageProps {
    rooms: IRoom[];
    tours: ITour[];
    answers?: ITourAnswer[];
    step?: number;
}

export interface IPersistedQuestionary {
    tours: ITour[];
    answers: ITourAnswer[];
    rooms: IRoom[];
    step: number;

}
