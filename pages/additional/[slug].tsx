import prisma from "../../prisma/client";
import { Seo, Services } from "@prisma/client";
import { GetServerSideProps } from "next";
import { ScrollToTopOnMount } from "@/helpers/routerup";
import MainLayout from "@/components/MainLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import Button from "@/components/UI/Buttons/Button";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useLoginAside from "@/context/useLoginAside";
import ServicesDialog from "@/components/ServicesDialog";
import { getRandomValue } from "@/utils/getRandomValue";
import SchemaBlock from "@/components/SeoBlock/SchemaBlock";
import { Product, WithContext } from "schema-dts";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { slug } = ctx.query;

    if (!slug) return { notFound: true };

    const service = await prisma.services.findFirst({
        where: {
            //@ts-ignore
            slug,
        },
    });

    let footerServices = await prisma.services.findMany({
        orderBy: {
            order: "asc",
        },
    });
    footerServices = JSON.parse(JSON.stringify(footerServices));

    if (!service) return { notFound: true };

    const seo = await prisma.seo.findFirst({
        where: {
            page: `/additional/${slug}`,
        },
    });

    return {
        props: {
            footerServices,
            service: service,
            seo,
            ...(await serverSideTranslations(ctx.locale as string, ["common"])),
        },
    };
};



const AdditionalPage = ({
    service,
    seo,
    footerServices,
}: {
    service: Services;
    seo: Seo;
    footerServices: any;
}) => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { data: session } = useSession();
    const { setIsOpen } = useLoginAside();

    const clickHandler = () => {
        if (!session?.user) return setIsOpen(true);
        setModalVisible(true);
    };

    const dbTranslate = useDynamicTranslate();
    const { t } = useTranslation();
    console.log(service);


    const randomAvgRating = getRandomValue({min: 4.2, max: 5, decimalPlaces: 1})
    const randomReviewCount = getRandomValue({min: 50, max: 100})


    const schema: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": dbTranslate(service, 'title'),
        "description": dbTranslate(service, 'descr'),
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": 5,
                "bestRating": 5
            },
            "author": {
                "@type": "Person",
                "name": "Fred Benson"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": randomAvgRating,
            "reviewCount": randomReviewCount
        }
    }

    return (
        <MainLayout services={footerServices}>
            <SchemaBlock schema={schema} />
            <ScrollToTopOnMount />
            <ServicesDialog
                userId={session?.user?.id}
                tarrifsName={service.title}
                userData={session?.user}
                servicesId={service.id}
                open={modalVisible}
                handleClose={() => setModalVisible(false)}
            />
            <section className="blognew">
                <div className="container">
                    <Link href={"/createpage"} className="button top__mob-btn">
                        Замовити проєкт
                    </Link>
                    <div className="blognew__wrapper">
                        <div className="blognew__content">
                            <AiOutlineArrowLeft
                                size={30}
                                className={"arrow_mob"}
                                onClick={() => router.back()}
                                style={{
                                    cursor: "pointer",
                                    marginBottom: 20,
                                    alignSelf: "flex-start",
                                }}
                            />
                            <div
                                style={{
                                    position: "relative",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <AiOutlineArrowLeft
                                    size={50}
                                    onClick={() => router.back()}
                                    style={{
                                        position: "absolute",
                                        left: "-80px",
                                        top: "10%",
                                        cursor: "pointer",
                                    }}
                                />
                                <h1 className="blognew__title">
                                    {dbTranslate(service, "title")}
                                </h1>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div className="questions__item-text-box">
                                    <div className="allservices__question-inner">
                                        <div className="allservices__question-img">
                                            <img
                                                //@ts-ignore
                                                src={service.image?.url}
                                                alt={
                                                    dbTranslate(
                                                        service?.image,
                                                        "alt"
                                                    ) ||
                                                    `Картинка "${service?.title}"`
                                                }
                                                title={
                                                    dbTranslate(
                                                        service?.image,
                                                        "alt"
                                                    ) ||
                                                    `Картинка "${service?.title}"`
                                                }
                                            />
                                        </div>
                                        <div className="allservices__question-box">
                                            <div
                                                className="questions__item-text questions__item-text-noml"
                                                style={{
                                                    wordBreak: "break-word",
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: dbTranslate(
                                                        service,
                                                        "descr"
                                                    ),
                                                }}
                                            ></div>
                                            <div className="allservices__question-price">
                                                <span>
                                                    {t("common:price")}:
                                                </span>
                                                {`${service.price} ${service.label}`}
                                            </div>

                                            <div className="accordionButton">
                                                <Button onClick={clickHandler}>
                                                    {t("common:getService")}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                //@ts-ignore
                                service?.content?.items?.map((item, index) => (
                                    <div style={{ width: "100%" }}>
                                        {item?.image?.url && (
                                            <div className={"post__image"}>
                                                <img
                                                    src={item?.image?.url}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                    alt={
                                                        dbTranslate(
                                                            item?.image,
                                                            "alt"
                                                        ) ||
                                                        `Картинка ${index + 1}"`
                                                    }
                                                    title={
                                                        dbTranslate(
                                                            item?.image,
                                                            "alt"
                                                        ) ||
                                                        `Картинка ${index + 1}"`
                                                    }
                                                />
                                            </div>
                                        )}
                                        {item?.text && (
                                            <div
                                                className={"post__text"}
                                                style={{
                                                    wordWrap: "break-word",
                                                    maxWidth: 1326,
                                                    lineHeight: 1.6,
                                                    fontWeight: 400,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 20,
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    //@ts-ignore
                                                    __html: dbTranslate(item, 'text'),
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
            <SeoBlock
                seo={seo}
                img={[
                    //@ts-ignore
                    { url: service?.image?.url },
                ]}
            />
        </MainLayout>
    );
};

export default AdditionalPage;
