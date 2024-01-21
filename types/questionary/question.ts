import { IDType } from "@/types/types";

export interface IQuestion {
    id: IDType;
    text: string;
    hint?: string | null | undefined;
}

export interface IQuestionTour extends IQuestion {
    type: "QUESTION";
}

export interface IQuestionAnswer {
    answer: string;
}

export interface IQuestionTourAnswer extends IQuestionTour {
    answers: IQuestionAnswer;
}
