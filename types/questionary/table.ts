import { IDType, IImage } from "@/types/types";
import Prisma from "@prisma/client";
import { IRoomAnswerItem } from "@/types/questionary/room";

export interface ITableOption {
    id: IDType;
    text: string;
    image: IImage | Prisma.Prisma.JsonValue | Prisma.Prisma.JsonObject | any;
    articleUrl: string | null;
    comment?: string;
}

export interface ITable {
    id: IDType;
    TableOption: ITableOption[];
    text: string;
    hint: string | null;
}

export interface ITableTour extends ITable {
    type: "TABLE";
}

export interface ITableAnswer {
    comment: string;
    options: ITableOption[];
}

export interface ITableTourAnswer extends ITableTour {
    answers: ITableAnswer;
}

export interface IRoomTable {
    id: IDType;
    TableOption: ITableOption[];
    text: string;
}

export interface IRoomTableTour extends IRoomTable {
    type: "ROOM_TABLE";
}

export interface IRoomTableAnswerItem {
    room: IRoomAnswerItem;
    option?: null | undefined | { id?: string; comment: "", options: ITableOption[] };
}

export interface IRoomTableAnswer {
    picks: IRoomTableAnswerItem[] | null | undefined;
}

export interface IRoomTableTourAnswer extends IRoomTableTour {
    answers: IRoomTableAnswer;
}
