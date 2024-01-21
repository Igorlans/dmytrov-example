import { z } from "zod";

export interface IResidentInfoTour {
    type: "RESIDENT_INFO";
}

export const residentAnswerSchema = z.object({
    isForRent: z.boolean(),
    residents: z
        .array(
            z.object({
                name: z.string().nonempty("Поле обов'язкове"),
                sex: z.enum(["MALE", "FEMALE"] as const).nullish(),
                age: z.string(),
                height: z.string(),
                weight: z.string(),
                dominantHand: z.enum(["LEFT", "RIGHT"] as const).nullish(),
                preferences: z.string(),
            })
        )
        .optional(),
});

export interface IResident {
    name: string;
    sex: "MALE" | "FEMALE" | null;
    age: string;
    height: string;
    weight: string;
    dominantHand: "LEFT" | "RIGHT" | null;
    preferences: string;
}

export interface IResidentInfoAnswer {
    residentQuantity?: number;
    isForRent: boolean;
    residents?: IResident[];
}

export interface IResidentInfoTourAnswer extends IResidentInfoTour {
    answers: IResidentInfoAnswer;
}

export const residentInfoTour: IResidentInfoTour = {
    type: "RESIDENT_INFO",
};
