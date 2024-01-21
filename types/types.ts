import { Request, Prisma } from "@prisma/client";
import { ChangeEvent } from "react";

export type IDType = string;

export interface IApiResponse<T> {
    message: string;
    data?: T;
}

export interface IImage extends Prisma.JsonObject {
    name: string | null | undefined | "";
    url: string | null | undefined | "";
}

export interface ISignUpBody {
    email: string;
    father_name?: string | null;
    fatherName?: string | null;
    name: string;
    password: string;
    phone: string;
    skype?: string | null;
    surname: string;
}

export type ISignUpForm = ISignUpBody & {
    reemail: string;
    confirmPassword: string;
};

export interface IUpdateUserBody {
    email: string;
    father_name?: string | null;
    name: string;
    phone: string;
    skype?: string | null;
    surname: string;
}

export type IClientSideLead = Request & {
    percent: number;
    slide: number;
};

interface ISelectedService {
    id: string;
    title: string;
    price: number;
}

export interface IClientSideService {
    Services: ISelectedService;
}

export interface IComparisonTable {
    rows: IComparisonRow[];
}

export interface IComparisonRow {
    id: string | number;
    isCheckedFirst: boolean;
    isCheckedSecond: boolean;
    isCheckedThird: boolean;
    text: string;
}

export interface IImage {
    name: string | null | undefined;
    url: string | null | undefined;
}

export interface ITariffPlanItem {
    id: string | number;
    image: IImage;
    title: string;
    description: string | null | undefined;
}

export interface ITariffPlan {
    items: ITariffPlanItem[];
}
