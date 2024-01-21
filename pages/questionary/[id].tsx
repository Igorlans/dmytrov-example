//@ts-nocheck

import { GetServerSideProps, NextPage } from "next";
import Questionary from "@/components/questionary/Questionary";
import prisma from "@/prisma/client";
import MainLayout from "@/components/MainLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
    furnitureTour,
    IFurnitureTour,
    IRoom,
    IRoomTour
} from "@/types/questionary/room";
import {
    IResidentInfoTour,
    residentInfoTour
} from "@/types/questionary/residentInfo";
import { IRoomTableTour, ITableTour } from "@/types/questionary/table";
import { IQuestionTour } from "@/types/questionary/question";
import {
    IPersistedQuestionary,
    IQuestionaryPageProps,
    ITour,
    ITourAnswer
} from "@/types/questionary";
import { Prisma } from ".prisma/client";
import InputJsonValue = Prisma.InputJsonValue;
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const translations = await serverSideTranslations(ctx.locale || 'uk', ['common'])


    const request = await prisma.request.findUnique({
        where: {
            id: String(ctx?.query?.id)
        },
        select: {
            Tariff: {
                select: {
                    id: true,
                    title: true
                }
            },
            type: true,
            userId: true,
            questionary: true,
            persisted: true
        }
    });

    if (!request) return { notFound: true };
    if (session?.user?.id !== request?.userId) return { notFound: true };
    // @ts-ignore
    if (request?.questionary?.answers) return { notFound: true };

    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc"
        }
    });
    services = JSON.parse(JSON.stringify(services));

    const persisted: IPersistedQuestionary = {
        tours: (request?.persisted as { tours?: ITour[] })?.tours || [],
        answers:
            (request?.persisted as { answers?: ITourAnswer[] })?.answers || [],
        rooms: (request?.persisted as { rooms?: IRoom[] })?.rooms || [],
        step: (request?.persisted as { step?: number })?.step || 0
    };
    if (
        persisted?.tours?.length &&
        persisted?.rooms?.length &&
        persisted?.answers?.length
    ) {
        return {
            props: {
                rooms: persisted?.rooms,
                tours: persisted?.tours,
                answers: persisted?.answers,
                step: persisted?.step,
                ...translations
            }
        };
    }

    const requestType = request?.type;
    const requestTariff = request?.Tariff?.id;
    const requestTariffName = request?.Tariff?.title;

    const questions = await prisma.questionaryQuestion.findMany({
        where: {
            isActive: true,
            type: {
                has: requestType as any
            },
            Tariffes: {
                some: {
                    id: requestTariff
                }
            }
        },
        orderBy: {
            order: "asc"
        },
        select: {
            id: true,
            text: true,
            hint: true
        }
    });

    const tables = await prisma.questionaryOptionTable.findMany({
        where: {
            isActive: true,
            type: {
                has: requestType as any
            },
            Tariffes: {
                some: {
                    id: requestTariff
                }
            }
        },
        orderBy: {
            order: "asc"
        },
        select: {
            id: true,
            text: true,
            hint: true,
            TableOption: {
                where: {
                    isActive: true
                },
                orderBy: {
                    order: "asc"
                },
                select: {
                    id: true,
                    image: true,
                    text: true,
                    articleUrl: true
                }
            }
        }
    });
    const roomTables = await prisma.questionaryRoomOptionTable.findMany({
        where: {
            isActive: true,
            type: {
                has: requestType as any
            },
            Tariffes: {
                some: {
                    id: requestTariff
                }
            }
        },
        orderBy: {
            order: "asc"
        },
        select: {
            id: true,
            text: true,
            TableOption: {
                where: {
                    isActive: true
                },
                orderBy: {
                    order: "asc"
                },
                select: {
                    id: true,
                    image: true,
                    text: true,
                    articleUrl: true
                }
            }
        }
    });

    const rooms: IRoom[] = await prisma.room.findMany({
        orderBy: {
            order: "asc"
        },
        select: {
            RoomFurniture: {
                where: {
                  isActive: true
                },
                orderBy: {
                    order: "asc"
                },
                select: {
                    id: true,
                    hint: true,
                    image: true,
                    name: true,
                    articleUrl: true
                }
            },
            id: true,
            name: true,
            image: true
        }
    });

    const roomTour: IRoomTour = {
        type: "ROOM",
        rooms: rooms
    };

    const residentInfoTourArr: IResidentInfoTour[] =
        requestType !== "COMMERCE" ? [residentInfoTour] : [];
    const furnitureTourArr: IFurnitureTour[] =
        requestType !== "COMMERCE" ? [furnitureTour] : [];
    const roomTourArr: IRoomTour[] =
        requestType !== "COMMERCE" ? [roomTour] : [];
    const roomTablesTourArr: IRoomTableTour[] =
        requestType !== "COMMERCE"
            ? roomTables?.map((item) => ({
                ...item,
                type: "ROOM_TABLE"
            }))
            : [];

    const questionsTourArr: IQuestionTour[] = questions?.map((item) => ({
        ...item,
        type: "QUESTION"
    }));
    const tablesTourArr: ITableTour[] = tables?.map((item) => ({
        ...item,
        type: "TABLE"
    }));

    const tours: ITour[] = [
        ...residentInfoTourArr,
        ...questionsTourArr,
        ...roomTourArr,
        ...roomTablesTourArr,
        ...furnitureTourArr,
        ...tablesTourArr
    ];

    console.log("TYPE =====", requestType);
    console.log("TARIFF =====", requestTariffName);

    console.log("QUESTIONS =====", questions);
    console.log("TABLES =====", tables);
    console.log("ROOM TABLES =====", roomTables);
    console.log("ROOMS =====", rooms);

    await prisma.request.update({
        where: {
            id: String(ctx?.query?.id)
        },
        data: {
            persisted: {
                rooms: rooms,
                tours: tours
            } as unknown as InputJsonValue
        }
    });

    return {
        props: {
            services,
            rooms,
            tours,
            ...translations
        }
    };
};

const QuestionaryPage: NextPage<IQuestionaryPageProps> = ({
                                                              rooms,
                                                              tours,
                                                              answers,
                                                              step,
                                                              services
                                                          }) => {
    return (
        <MainLayout services={services}>
            <Questionary
                rooms={rooms}
                tours={tours}
                answers={answers}
                step={step}
            />
        </MainLayout>
    );
};

export default QuestionaryPage;
