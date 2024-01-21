import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/navigation";
import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import prisma from "@/prisma/client";
import { NextPage } from "next";
import { Seo, Tariffes } from "@prisma/client";
import { IComparisonTable, ITariffPlanItem } from "@/types/types";
import ComparisonTable from "@/components/ComparisonTable/ComparisonTable";
import { usePathname, useRouter } from "next/navigation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useDynamicTranslate } from "@/utils/useDynamicTranslate";
import SeoBlock from "@/components/SeoBlock/SeoBlock";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "@/components/UI/Buttons/Button";

import type { BlogPosting, WithContext } from "schema-dts";
import SchemaBlock from "@/components/SeoBlock/SchemaBlock";
import { Product } from "schema-dts";
import { getRandomValue } from "@/utils/getRandomValue";

const getTariffIdByName = (name: string | undefined) => {
    switch (name) {
        case "basic":
            return "clhkc85sj000207x8adrnwcn6";
        case "standard":
            return "clhkcagq1000407x8atcp0grv";
        case "premium":
            return "clhkcagq1000607x8jilh90vz";
        default:
            return "clhkc85sj000207x8adrnwcn6";
    }
};

export const getTariffNameById = (name: string | undefined) => {
    switch (name) {
        case "clhkc85sj000207x8adrnwcn6":
            return "basic";
        case "clhkcagq1000407x8atcp0grv":
            return "standard";
        case "clhkcagq1000607x8jilh90vz":
            return "premium";
        default:
            return "basic";
    }
};

export async function getServerSideProps({ locale, query }: any) {
    // @ts-ignore
    const tariffs = await prisma.tariffes.findMany({
        // @ts-ignore
        orderBy: {
            // @ts-ignore
            order: "asc",
        },
    });

    const comparison = await prisma.tariffComparison.findFirst();
    const table = comparison?.table;

    const seo = await prisma.seo.findFirst({
        where: {
            page: `/tariffs/${query.tariff}`,
        },
    });
    let services = await prisma.services.findMany({
        orderBy: {
            order: "asc",
        },
    });
    services = JSON.parse(JSON.stringify(services));

    return {
        props: {
            services,
            tariffs,
            table,
            seo,
            ...(await serverSideTranslations(locale, [
                "main",
                "contacts",
                "services",
                "common",
                "validation",
            ])),
        },
    };
}

interface ServicesPageProps {
    tariffs: Tariffes[];
    table: IComparisonTable;
    seo: Seo;
    services: any;
}

export const ServicesPage: NextPage<ServicesPageProps> = ({
    tariffs,
    table,
    seo,
    services,
}) => {
    const { data: session } = useSession();
    const router = useRouter();
    const params = usePathname();
    console.log("params", params);
    const swiperNavPrevRef = useRef(null);
    const swiperNavNextRef = useRef(null);
    const tariffName = params.split("/").pop();
    const activeServiceId = getTariffIdByName(tariffName);

    const [currentSlide, setCurrentSlide] = useState(0);



    const serviceQueryId = undefined;

    const [sstorage, setSstorage] = useState<Tariffes[]>(tariffs as Tariffes[]);
    console.log(sstorage);
    const initIndex = sstorage?.findIndex(
        (tarif) => getTariffNameById(tarif?.id) === tariffName
    );
    const [activeIndex, setActiveIndex] = useState<number>(
        initIndex !== -1 ? initIndex : 0
    );
    const activeTariff: Tariffes = sstorage[activeIndex];
    const TariffPlan = activeTariff?.TariffPlan as any as {items: ITariffPlanItem[]};
    const activeSlides: ITariffPlanItem[] = TariffPlan?.items;
    const { t } = useTranslation();
    function addLeadingZero(num: number) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num.toString();
        }
    }

    const dbTranslate = useDynamicTranslate();

    const randomAvgRating = getRandomValue({min: 4.4, max: 5, decimalPlaces: 1})
    const randomReviewCount = getRandomValue({min: 50, max: 100})

    const schema: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        // headline: dbTranslate(tariffs?.[currentSlide], 'title'),
        headline: dbTranslate(activeTariff, 'title'),
        //@ts-ignore
        image: activeTariff?.image?.url,
        publisher: {
            "@type": "Organization",
            name: "dmytrov.com.ua/",
            logo: {
                "@type": "ImageObject",
                url: "https://www.dmytrov.com.ua/assets/images/header-img/logo-mob.svg",
            },
        },
        review: {
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
        aggregateRating: {
            "@type": "AggregateRating",
            "ratingValue": randomAvgRating,
            "reviewCount": randomReviewCount
        }
    };
    //@ts-ignore
    // console.log(tariffs.filter(tarif => tarif.id === activeServiceId)[0].image);
    return (
        <>
            <SchemaBlock schema={schema} />

            <MainLayout services={services}>
                {/* <ScrollToTopOnMount /> */}
                <section className="servicespage">
                    <div className="container">
                        <Link
                            href={"/createpage"}
                            className="button top__mob-btn"
                        >
                            Замовити проєкт
                        </Link>
                        <div className="servicespage__wrapper">
                            <div className="servicespage__nav">
                                {sstorage?.map((item: any, idx: number) => (
                                    <h3
                                        style={{ cursor: "pointer" }}
                                        className={`servicespage__nav-link ${
                                            activeServiceId === item.id
                                                ? "servicespage__nav-link--active"
                                                : ""
                                        }`}
                                        key={idx}
                                        onClick={() => {
                                            setActiveIndex(idx);
                                            router.push(
                                                `/tariffs/${getTariffNameById(
                                                    item.id
                                                )}`
                                            );
                                        }}
                                    >
                                        {`ТАРИФ "${dbTranslate(
                                            item,
                                            "title"
                                        )}"`}
                                    </h3>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="servicespage__content">
                            <div className="servicespage__top">
                                <h1 className="servicespage__top-title">
                                    {dbTranslate(activeTariff, "title")}
                                </h1>
                                <div className="servicespage__top-box">
                                    <div className="servicespage__top-subtitle">
                                        {dbTranslate(activeTariff, "subTitle")}
                                    </div>
                                    <div
                                        className="servicespage__top-price"
                                        style={{ marginBottom: "20px" }}
                                    >
                                        {activeTariff?.price}
                                        <span>грн/м2</span>
                                    </div>

                                    <Button>
                                        {t("common:orderProjectButton")}
                                    </Button>
                                </div>
                                <p className="servicespage__top-text">
                                    {dbTranslate(activeTariff, "text")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container tariffPageMainImage">
                        <img
                            style={{
                                objectFit: "cover",
                            }}
                            width={1296}
                            height={530}
                            src={
                                //@ts-ignore
                                activeTariff?.image?.url  ||
                                "/assets/images/tariffs-img/top-bg.jpg"
                            }
                            alt={
                                dbTranslate(activeTariff?.image, "alt") ||
                                `Картинка "${activeTariff?.title}"`
                            }
                            title={
                                dbTranslate(activeTariff?.image, "alt") ||
                                `Картинка "${activeTariff?.title}"`
                            }
                        />
                    </div>
                    {activeSlides?.length ? (
                        <>
                            <div
                                className="servicespage__slider"
                                style={{ background: "#f6f4f1" }}
                            >
                                <div className="container">
                                    <div className="servicespage__slider-inner">
                                        <Swiper
                                            modules={[Autoplay, Navigation]}
                                            navigation={{
                                                prevEl: swiperNavPrevRef.current,
                                                nextEl: swiperNavNextRef.current,
                                            }}
                                            spaceBetween={40}
                                            speed={500}
                                            autoplay={{
                                                delay: 15000,
                                                disableOnInteraction: false,
                                            }}
                                            autoHeight={true}
                                            slidesPerView={1}
                                            onSwiper={(swiper) => {
                                                // Delay execution for the refs to be defined
                                                setTimeout(() => {
                                                    // Override prevEl & nextEl now that refs are defined

                                                    // @ts-ignore
                                                    swiper.params.navigation.prevEl =
                                                        swiperNavPrevRef.current;
                                                    // @ts-ignore
                                                    swiper.params.navigation.nextEl =
                                                        swiperNavNextRef.current;

                                                    // Re-init navigation
                                                    swiper.navigation.destroy();
                                                    swiper.navigation.init();
                                                    swiper.navigation.update();
                                                });
                                            }}
                                            onSlideChange={(swiper) =>
                                                setCurrentSlide(
                                                    swiper.activeIndex
                                                )
                                            }
                                        >
                                            {activeSlides?.map(
                                                (item, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div
                                                            className="servicespage__slide"
                                                            style={{
                                                                background:
                                                                    "#f6f4f1",
                                                            }}
                                                        >
                                                            <div className="servicespage__slide-content">
                                                                <h2 className="servicespage__slide-title">
                                                                    {dbTranslate(
                                                                        item,
                                                                        "title"
                                                                    ) || item?.title}
                                                                </h2>
                                                                <p className="servicespage__slide-text" dangerouslySetInnerHTML={{ __html: dbTranslate(item, 'description') }}>
                                                                </p>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                                className="servicespage__slide-img"
                                                            >
                                                                <img
                                                                    style={{
                                                                        objectFit:
                                                                            "contain",
                                                                        height: "100%",
                                                                        width: "100%",
                                                                    }}
                                                                    src={
                                                                        item
                                                                            ?.image
                                                                            ?.url as any
                                                                    }
                                                                    title={
                                                                        dbTranslate(
                                                                            item?.image,
                                                                            "alt"
                                                                        ) ||
                                                                        `Картинка "${item?.title}"`
                                                                    }
                                                                    alt={
                                                                        dbTranslate(
                                                                            item?.image,
                                                                            "alt"
                                                                        ) ||
                                                                        `Картинка "${item?.title}"`
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            )}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                            <div className="container servicespage__slider-container servicespage__slider-bar">
                                <div className="servicespage__slider-nav">
                                    <div className="servicespage__coun">
                                        <div className="servicespage__coun-target">
                                            {addLeadingZero(currentSlide + 1)}
                                        </div>
                                        <div className="servicespage__coun-all">
                                            /
                                            {addLeadingZero(
                                                activeSlides?.length
                                            )}
                                        </div>
                                    </div>
                                    <div className="servicespage__arrows">
                                        <div
                                            className="servicespage__arrow servicespage__arrow-prev"
                                            ref={swiperNavPrevRef}
                                        >
                                            <svg
                                                width="38"
                                                height="30"
                                                viewBox="0 0 38 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15.466 29.2471L16.9407 27.5789L3.96966 16.1129L38 16.1129L38 13.8863L3.96966 13.8863L16.9407 2.42033L15.466 0.752113L2.51879e-06 14.4236L2.6195e-06 15.5756L15.466 29.2471Z"
                                                    fill="#353535"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className="servicespage__arrow servicespage__arrow-next"
                                            ref={swiperNavNextRef}
                                        >
                                            <svg
                                                width="38"
                                                height="30"
                                                viewBox="0 0 38 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M22.534 0.75293L21.0593 2.42115L34.0303 13.8871H0V16.1137H34.0303L21.0593 27.5797L22.534 29.2479L38 15.5764V14.4244L22.534 0.75293Z"
                                                    fill="#353535"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </section>

                <ComparisonTable rows={table?.rows} tariffs={tariffs} />

                <SeoBlock seo={seo} img={[
                    //@ts-ignore
                    {url: tariffs?.find(tarif => tarif.id === activeServiceId)?.image?.url}
                ]}/>
                
            </MainLayout>
        </>
    );
};

export default ServicesPage;
