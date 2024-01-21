import { IDType, IImage } from "@/types/types";
import Prisma from "@prisma/client";

export interface IRoomFurniture {
    id: IDType;
    image: IImage | Prisma.Prisma.JsonValue | Prisma.Prisma.JsonObject | any;
    hint: string | null;
    articleUrl?: string | null;
    name: string;
}

export interface IFurnitureTour {
    type: "FURNITURE";
}

export interface IFurnitureAnswerItem extends Partial<IRoomFurniture> {
    comment: string;
    roomName: string;
    roomId: string;
}

export interface IFurnitureAnswer {
    furniture: IFurnitureAnswerItem[];
}

export interface IFurnitureTourAnswer extends IFurnitureTour {
    answers: IFurnitureAnswer;
}

export const furnitureTour: IFurnitureTour = {
    type: "FURNITURE"
};

// export interface IRoom {
//     id: IDType;
//     RoomFurniture: IRoomFurniture[] | null;
//     image: Prisma.Prisma.JsonValue;
//     name: string;
// }

export interface IRoomTour {
    type: "ROOM";
    rooms: IRoom[];
}

export interface IRoom {
    id: IDType;
    RoomFurniture: IRoomFurniture[]; // Allow null values
    image: IImage | Prisma.Prisma.JsonValue | Prisma.Prisma.JsonObject | any;
    name: string;
}

export interface IRoomAnswerItem extends IRoom {
    comment: string;
}

export interface IRoomAnswer {
    rooms: IRoomAnswerItem[];
}

export interface IRoomTourAnswer extends IRoomTour {
    answers: IRoomAnswer;
}
